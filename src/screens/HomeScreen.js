import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, FlatList, RefreshControl, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import { getMarketOverview, getTopMovers, getStockQuote } from '../services/stockData';
import { useWatchlist } from '../context/WatchlistContext';
import IndexCard from '../components/IndexCard';
import StockCard from '../components/StockCard';
import SectionHeader from '../components/SectionHeader';

export default function HomeScreen({ navigation }) {
  const [indices, setIndices] = useState([]);
  const [movers, setMovers] = useState({ gainers: [], losers: [] });
  const [watchlistQuotes, setWatchlistQuotes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { watchlist } = useWatchlist();

  const loadData = useCallback(() => {
    setIndices(getMarketOverview());
    setMovers(getTopMovers());
    setWatchlistQuotes(watchlist.map(s => getStockQuote(s)));
  }, [watchlist]);

  useEffect(() => { loadData(); }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
    setTimeout(() => setRefreshing(false), 500);
  };

  const navigateToStock = (symbol) => {
    navigation.navigate('StockDetail', { symbol });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.blue} />}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Markets</Text>
        <Text style={styles.subtitle}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.indicesRow}>
          {indices.map(index => (
            <IndexCard key={index.symbol} index={index} />
          ))}
        </ScrollView>

        {watchlistQuotes.length > 0 && (
          <>
            <SectionHeader
              title="Watchlist"
              actionText="See All"
              onAction={() => navigation.navigate('WatchlistTab')}
            />
            {watchlistQuotes.slice(0, 3).map(stock => (
              <StockCard key={stock.symbol} stock={stock} onPress={() => navigateToStock(stock.symbol)} />
            ))}
          </>
        )}

        <SectionHeader title="Top Gainers" />
        {movers.gainers.map(stock => (
          <StockCard key={stock.symbol} stock={stock} onPress={() => navigateToStock(stock.symbol)} />
        ))}

        <SectionHeader title="Top Losers" />
        {movers.losers.map(stock => (
          <StockCard key={stock.symbol} stock={stock} onPress={() => navigateToStock(stock.symbol)} />
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 4,
    marginBottom: 16,
  },
  indicesRow: {
    marginHorizontal: -4,
    marginBottom: 8,
  },
});
