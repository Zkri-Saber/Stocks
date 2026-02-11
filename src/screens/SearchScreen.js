import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { searchStocks, getStockQuote, formatPrice } from '../services/stockData';
import { POPULAR_STOCKS } from '../constants/stocks';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (query.trim().length === 0) return POPULAR_STOCKS;
    return searchStocks(query);
  }, [query]);

  const navigateToStock = (symbol) => {
    navigation.navigate('StockDetail', { symbol });
  };

  const renderItem = ({ item }) => {
    const quote = getStockQuote(item.symbol);
    const positive = quote.change >= 0;
    return (
      <TouchableOpacity style={styles.row} onPress={() => navigateToStock(item.symbol)} activeOpacity={0.7}>
        <View style={styles.symbolContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>{item.symbol[0]}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(quote.price)}</Text>
          <Text style={[styles.change, { color: positive ? COLORS.green : COLORS.red }]}>
            {positive ? '+' : ''}{quote.changePercent.toFixed(2)}%
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.header}>Search</Text>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={COLORS.textSecondary} />
        <TextInput
          style={styles.input}
          placeholder="Search stocks by name or symbol"
          placeholderTextColor={COLORS.textMuted}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          autoCapitalize="characters"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {query.length === 0 && (
        <Text style={styles.sectionTitle}>Popular Stocks</Text>
      )}
      {query.length > 0 && results.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={48} color={COLORS.textMuted} />
          <Text style={styles.emptyText}>No stocks found for "{query}"</Text>
        </View>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.symbol}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  header: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15,
    marginLeft: 10,
  },
  sectionTitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  symbolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    color: COLORS.blue,
    fontSize: 16,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  symbol: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
  },
  name: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  change: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
    fontVariant: ['tabular-nums'],
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    marginTop: 12,
  },
});
