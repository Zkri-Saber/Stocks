import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Polyline, Line, Text as SvgText, Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { COLORS } from '../constants/theme';

export default function PriceChart({ data, width, height = 220, positive }) {
  const chartWidth = width || Dimensions.get('window').width - 32;
  const chartHeight = height;
  const padding = { top: 10, bottom: 30, left: 10, right: 10 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;

  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const color = positive ? COLORS.green : COLORS.red;

  const getX = (i) => padding.left + (i / (data.length - 1)) * plotWidth;
  const getY = (val) => padding.top + plotHeight - ((val - min) / range) * plotHeight;

  const linePoints = data.map((val, i) => `${getX(i)},${getY(val)}`).join(' ');

  const areaPath = [
    `M ${getX(0)},${getY(data[0])}`,
    ...data.slice(1).map((val, i) => `L ${getX(i + 1)},${getY(val)}`),
    `L ${getX(data.length - 1)},${padding.top + plotHeight}`,
    `L ${getX(0)},${padding.top + plotHeight}`,
    'Z',
  ].join(' ');

  const gridLines = 4;
  const gridValues = Array.from({ length: gridLines }, (_, i) =>
    min + (range / (gridLines - 1)) * i
  );

  return (
    <View style={{ width: chartWidth, height: chartHeight }}>
      <Svg width={chartWidth} height={chartHeight}>
        <Defs>
          <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <Stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </LinearGradient>
        </Defs>

        {gridValues.map((val, i) => (
          <React.Fragment key={i}>
            <Line
              x1={padding.left}
              y1={getY(val)}
              x2={chartWidth - padding.right}
              y2={getY(val)}
              stroke={COLORS.border}
              strokeWidth="0.5"
              strokeDasharray="4,4"
            />
            <SvgText
              x={chartWidth - padding.right}
              y={getY(val) - 4}
              fill={COLORS.textMuted}
              fontSize="10"
              textAnchor="end"
            >
              ${val.toFixed(2)}
            </SvgText>
          </React.Fragment>
        ))}

        <Path d={areaPath} fill="url(#areaGradient)" />

        <Polyline
          points={linePoints}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}
