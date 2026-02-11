import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import MiniChart from './MiniChart';
import { getChartData, formatPrice } from '../services/stockData';

export default function IndexCard({ index }) {
  const positive = index.change >= 0;
  const chartData = getChartData(index.symbol, '1D');

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{index.name}</Text>
      <Text style={styles.price}>{formatPrice(index.price)}</Text>
      <MiniChart data={chartData} width={100} height={28} positive={positive} />
      <Text style={[styles.change, { color: positive ? COLORS.green : COLORS.red }]}>
        {positive ? '+' : ''}{index.changePercent.toFixed(2)}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 150,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  name: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  price: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
    fontVariant: ['tabular-nums'],
  },
  change: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
    fontVariant: ['tabular-nums'],
  },
});
