# Stocks

A mobile stock tracking app for Android built with React Native and Expo.

## Features

- **Market Overview** — View major indices (S&P 500, Dow Jones, NASDAQ, Russell 2000)
- **Stock Search** — Search stocks by name or ticker symbol
- **Stock Details** — View price charts, statistics, and key metrics
- **Watchlist** — Save and manage your favorite stocks
- **Pull-to-Refresh** — Refresh data with a swipe down
- **Dark Theme** — Modern dark UI optimized for readability

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for emulator) or Expo Go app on your phone

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android
```

### Running on Your Phone

1. Install **Expo Go** from the Google Play Store
2. Run `npm start` in the project directory
3. Scan the QR code with Expo Go

## Project Structure

```
Stocks/
├── App.js                          # App entry point
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── IndexCard.js            # Market index display card
│   │   ├── MiniChart.js            # Small sparkline chart
│   │   ├── PriceChart.js           # Full price chart with gradient
│   │   ├── SectionHeader.js        # Section title component
│   │   ├── StatRow.js              # Key-value stat display
│   │   └── StockCard.js            # Stock list item card
│   ├── constants/
│   │   ├── stocks.js               # Stock data and market indices
│   │   └── theme.js                # Colors and typography
│   ├── context/
│   │   └── WatchlistContext.js     # Watchlist state management
│   ├── navigation/
│   │   └── AppNavigator.js         # Tab and stack navigation
│   ├── screens/
│   │   ├── HomeScreen.js           # Market overview and top movers
│   │   ├── SearchScreen.js         # Stock search
│   │   ├── StockDetailScreen.js    # Individual stock details
│   │   └── WatchlistScreen.js      # Saved stocks
│   └── services/
│       └── stockData.js            # Stock data generation and formatting
└── assets/                         # Icons, splash images
```

## Tech Stack

- **React Native** with **Expo**
- **React Navigation** (bottom tabs + native stack)
- **React Native SVG** for charts
- **AsyncStorage** for watchlist persistence
- **Expo Vector Icons** for UI icons
