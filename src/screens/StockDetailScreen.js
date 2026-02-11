import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { TIME_RANGES } from '../constants/stocks';
import {
  getStockDetail, getChartData, formatPrice, formatLargeNumber, formatVolume,
} from '../services/stockData';
import { useWatchlist } from '../context/WatchlistContext';
import PriceChart from '../components/PriceChart';
import StatRow from '../components/StatRow';

const screenWidth = Dimensions.get('window').width;

export default function StockDetailScreen({ route, navigation }) {
  const { symbol } = route.params;
  const [timeRange, setTimeRange] = useState('1M');
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(symbol);

  const stock = useMemo(() => getStockDetail(symbol), [symbol]);
  const chartData = useMemo(() => getChartData(symbol, timeRange), [symbol, timeRange]);
  const positive = stock.change >= 0;

  const toggleWatchlist = () => {
    if (inWatchlist) removeFromWatchlist(symbol);
    else addToWatchlist(symbol);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>{symbol}</Text>
        <TouchableOpacity onPress={toggleWatchlist} style={styles.watchBtn}>
          <Ionicons
            name={inWatchlist ? 'star' : 'star-outline'}
            size={24}
            color={inWatchlist ? COLORS.yellow : COLORS.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.stockName}>{stock.name}</Text>
        <Text style={styles.sector}>{stock.sector}</Text>

        <Text style={styles.price}>{formatPrice(stock.price)}</Text>
        <View style={styles.changeRow}>
          <Ionicons
            name={positive ? 'caret-up' : 'caret-down'}
            size={16}
            color={positive ? COLORS.green : COLORS.red}
          />
          <Text style={[styles.changeText, { color: positive ? COLORS.green : COLORS.red }]}>
            {positive ? '+' : ''}{stock.change.toFixed(2)} ({positive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
          </Text>
          <Text style={styles.changeLabel}>Today</Text>
        </View>

        <View style={styles.chartContainer}>
          <PriceChart data={chartData} width={screenWidth - 32} positive={positive} />
        </View>

        <View style={styles.timeRangeRow}>
          {TIME_RANGES.map(range => (
            <TouchableOpacity
              key={range}
              style={[styles.timeBtn, timeRange === range && styles.timeBtnActive]}
              onPress={() => setTimeRange(range)}
            >
              <Text style={[styles.timeBtnText, timeRange === range && styles.timeBtnTextActive]}>
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statsCol}>
              <StatRow label="Open" value={formatPrice(stock.open)} />
              <StatRow label="High" value={formatPrice(stock.high)} />
              <StatRow label="Low" value={formatPrice(stock.low)} />
              <StatRow label="52W High" value={formatPrice(stock.week52High)} />
              <StatRow label="52W Low" value={formatPrice(stock.week52Low)} />
            </View>
            <View style={styles.statsCol}>
              <StatRow label="Volume" value={formatVolume(stock.volume)} />
              <StatRow label="Avg Volume" value={formatVolume(stock.avgVolume)} />
              <StatRow label="Mkt Cap" value={formatLargeNumber(stock.marketCap)} />
              <StatRow label="P/E Ratio" value={stock.peRatio.toFixed(2)} />
              <StatRow label="Dividend" value={stock.dividend.toFixed(2) + '%'} />
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backBtn: {
    padding: 4,
  },
  topTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  watchBtn: {
    padding: 4,
  },
  content: {
    padding: 16,
  },
  stockName: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700',
  },
  sector: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  price: {
    color: COLORS.text,
    fontSize: 38,
    fontWeight: '800',
    marginTop: 16,
    fontVariant: ['tabular-nums'],
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  changeText: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 4,
    fontVariant: ['tabular-nums'],
  },
  changeLabel: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginLeft: 8,
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  timeRangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 4,
  },
  timeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  timeBtnActive: {
    backgroundColor: COLORS.surfaceLight,
  },
  timeBtnText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  timeBtnTextActive: {
    color: COLORS.text,
  },
  statsSection: {
    marginTop: 24,
  },
  statsTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statsCol: {
    flex: 1,
  },
});
