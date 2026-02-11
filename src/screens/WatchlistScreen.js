import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, RefreshControl, TouchableOpacity, Alert, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { getStockQuote } from '../services/stockData';
import { useWatchlist } from '../context/WatchlistContext';
import StockCard from '../components/StockCard';

export default function WatchlistScreen({ navigation }) {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const [quotes, setQuotes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadQuotes = useCallback(() => {
    setQuotes(watchlist.map(s => getStockQuote(s)));
  }, [watchlist]);

  useEffect(() => { loadQuotes(); }, [loadQuotes]);

  const onRefresh = () => {
    setRefreshing(true);
    loadQuotes();
    setTimeout(() => setRefreshing(false), 500);
  };

  const confirmRemove = (symbol) => {
    Alert.alert(
      'Remove from Watchlist',
      `Remove ${symbol} from your watchlist?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeFromWatchlist(symbol) },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <View style={styles.cardWrapper}>
        <StockCard
          stock={item}
          onPress={() => navigation.navigate('StockDetail', { symbol: item.symbol })}
        />
      </View>
      <TouchableOpacity style={styles.removeBtn} onPress={() => confirmRemove(item.symbol)}>
        <Ionicons name="close-circle" size={20} color={COLORS.red} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Watchlist</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SearchTab')}>
          <Ionicons name="add-circle-outline" size={28} color={COLORS.blue} />
        </TouchableOpacity>
      </View>

      {quotes.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="star-outline" size={56} color={COLORS.textMuted} />
          <Text style={styles.emptyTitle}>No stocks in watchlist</Text>
          <Text style={styles.emptySubtitle}>
            Search and add stocks to keep track of your favorites
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('SearchTab')}
          >
            <Ionicons name="search" size={18} color={COLORS.white} />
            <Text style={styles.addButtonText}>Search Stocks</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={quotes}
          keyExtractor={(item) => item.symbol}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.blue} />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  header: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: '800',
  },
  listContent: {
    paddingBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardWrapper: {
    flex: 1,
  },
  removeBtn: {
    padding: 8,
    marginLeft: 4,
    marginBottom: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 24,
    gap: 8,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
