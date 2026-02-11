import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import MiniChart from './MiniChart';
import { getChartData, formatPrice } from '../services/stockData';

export default function StockCard({ stock, onPress }) {
  const positive = stock.change >= 0;
  const chartData = getChartData(stock.symbol, '1D');

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.left}>
        <Text style={styles.symbol}>{stock.symbol}</Text>
        <Text style={styles.name} numberOfLines={1}>{stock.name}</Text>
      </View>
      <View style={styles.chart}>
        <MiniChart data={chartData} positive={positive} />
      </View>
      <View style={styles.right}>
        <Text style={styles.price}>{formatPrice(stock.price)}</Text>
        <View style={[styles.changeBadge, { backgroundColor: positive ? COLORS.greenLight : COLORS.redLight }]}>
          <Text style={[styles.changeText, { color: positive ? COLORS.green : COLORS.red }]}>
            {positive ? '+' : ''}{stock.changePercent.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  left: {
    flex: 1,
    marginRight: 8,
  },
  symbol: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  name: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  chart: {
    marginHorizontal: 12,
  },
  right: {
    alignItems: 'flex-end',
  },
  price: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  changeBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
});
