import { POPULAR_STOCKS, MARKET_INDICES } from '../constants/stocks';

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function generatePrice(symbol) {
  const basePrices = {
    AAPL: 189.50, MSFT: 420.15, GOOGL: 175.80, AMZN: 195.30, NVDA: 890.40,
    META: 510.25, TSLA: 245.60, JPM: 198.75, V: 282.40, JNJ: 155.20,
    WMT: 172.85, PG: 168.30, MA: 462.10, HD: 385.70, DIS: 112.45,
    NFLX: 625.80, ADBE: 580.20, CRM: 310.50, INTC: 45.80, AMD: 178.90,
    SPY: 512.30, DIA: 395.40, QQQ: 445.60, IWM: 205.30,
  };
  const base = basePrices[symbol] || 100 + hashString(symbol) % 400;
  const rand = seededRandom(hashString(symbol) + Date.now() % 86400000);
  const variation = (rand() - 0.5) * base * 0.04;
  return Math.round((base + variation) * 100) / 100;
}

function generateChange(price, symbol) {
  const rand = seededRandom(hashString(symbol) + Date.now() % 86400000);
  const changePct = (rand() - 0.48) * 6;
  const change = Math.round(price * changePct) / 100;
  return {
    change: Math.round(change * 100) / 100,
    changePercent: Math.round(changePct * 100) / 100,
  };
}

function generateChartData(symbol, range) {
  const points = { '1D': 78, '1W': 35, '1M': 30, '3M': 90, '1Y': 252, '5Y': 260 };
  const count = points[range] || 30;
  const rand = seededRandom(hashString(symbol + range));
  const basePrice = generatePrice(symbol);
  const data = [];
  let price = basePrice * (0.85 + rand() * 0.15);

  for (let i = 0; i < count; i++) {
    const drift = 0.001;
    const volatility = range === '1D' ? 0.005 : 0.02;
    price = price * (1 + drift + (rand() - 0.5) * volatility);
    data.push(Math.round(price * 100) / 100);
  }
  return data;
}

function generateStockDetails(symbol) {
  const rand = seededRandom(hashString(symbol));
  const price = generatePrice(symbol);
  return {
    open: Math.round(price * (0.98 + rand() * 0.04) * 100) / 100,
    high: Math.round(price * (1.01 + rand() * 0.03) * 100) / 100,
    low: Math.round(price * (0.96 + rand() * 0.02) * 100) / 100,
    volume: Math.round((5 + rand() * 95) * 1000000),
    avgVolume: Math.round((10 + rand() * 80) * 1000000),
    marketCap: Math.round(price * (1 + rand() * 20) * 1000000000),
    peRatio: Math.round((10 + rand() * 50) * 100) / 100,
    dividend: Math.round(rand() * 3 * 100) / 100,
    week52High: Math.round(price * (1.1 + rand() * 0.3) * 100) / 100,
    week52Low: Math.round(price * (0.6 + rand() * 0.2) * 100) / 100,
  };
}

export function getStockQuote(symbol) {
  const stock = [...POPULAR_STOCKS, ...MARKET_INDICES].find(s => s.symbol === symbol);
  const price = generatePrice(symbol);
  const { change, changePercent } = generateChange(price, symbol);
  return {
    symbol,
    name: stock?.name || symbol,
    sector: stock?.sector || 'Unknown',
    price,
    change,
    changePercent,
  };
}

export function getMarketOverview() {
  return MARKET_INDICES.map(index => {
    const price = generatePrice(index.symbol);
    const { change, changePercent } = generateChange(price, index.symbol);
    return { ...index, price, change, changePercent };
  });
}

export function getTopMovers() {
  const all = POPULAR_STOCKS.map(stock => {
    const price = generatePrice(stock.symbol);
    const { change, changePercent } = generateChange(price, stock.symbol);
    return { ...stock, price, change, changePercent };
  });
  const sorted = [...all].sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
  return {
    gainers: sorted.filter(s => s.change > 0).slice(0, 5),
    losers: sorted.filter(s => s.change < 0).slice(0, 5),
  };
}

export function getStockDetail(symbol) {
  const quote = getStockQuote(symbol);
  const details = generateStockDetails(symbol);
  return { ...quote, ...details };
}

export function getChartData(symbol, range = '1M') {
  return generateChartData(symbol, range);
}

export function searchStocks(query) {
  const q = query.toLowerCase();
  return POPULAR_STOCKS.filter(
    s => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
  );
}

export function formatPrice(price) {
  return '$' + price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatLargeNumber(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
  return num.toString();
}

export function formatVolume(vol) {
  return formatLargeNumber(vol);
}
