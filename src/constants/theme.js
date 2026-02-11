export const COLORS = {
  background: '#0D1117',
  surface: '#161B22',
  surfaceLight: '#21262D',
  border: '#30363D',
  text: '#F0F6FC',
  textSecondary: '#8B949E',
  textMuted: '#484F58',
  green: '#3FB950',
  greenLight: '#1A3D2A',
  red: '#F85149',
  redLight: '#3D1A1A',
  blue: '#58A6FF',
  blueLight: '#1A2D3D',
  yellow: '#D29922',
  white: '#FFFFFF',
  tabActive: '#58A6FF',
  tabInactive: '#484F58',
};

export const FONTS = {
  regular: { fontSize: 14, color: COLORS.text },
  small: { fontSize: 12, color: COLORS.textSecondary },
  medium: { fontSize: 16, color: COLORS.text, fontWeight: '600' },
  large: { fontSize: 20, color: COLORS.text, fontWeight: '700' },
  xlarge: { fontSize: 28, color: COLORS.text, fontWeight: '700' },
  price: { fontSize: 32, color: COLORS.text, fontWeight: '700', fontVariant: ['tabular-nums'] },
};
