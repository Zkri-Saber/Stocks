# CLAUDE.md — AI Assistant Guide for Stocks

## Project Overview

**Stocks** is a mobile stock tracking app for Android built with **React Native** and **Expo**. It provides market overviews, stock search, interactive price charts, and a persistent watchlist.

## Repository Structure

```
Stocks/
├── App.js                          # App entry point — providers + navigation
├── app.json                        # Expo configuration
├── babel.config.js                 # Babel config for Expo
├── package.json                    # Dependencies and scripts
├── CLAUDE.md                       # AI assistant guide (this file)
├── README.md                       # Project documentation
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── IndexCard.js            # Market index card (S&P, Dow, etc.)
│   │   ├── MiniChart.js            # Small SVG sparkline chart
│   │   ├── PriceChart.js           # Full interactive price chart with gradient fill
│   │   ├── SectionHeader.js        # Section title with optional action link
│   │   ├── StatRow.js              # Label-value row for statistics
│   │   └── StockCard.js            # Stock list item with mini chart + price badge
│   ├── constants/
│   │   ├── stocks.js               # Stock tickers, names, sectors, market indices, time ranges
│   │   └── theme.js                # Color palette (COLORS) and typography (FONTS)
│   ├── context/
│   │   └── WatchlistContext.js     # React Context + AsyncStorage for watchlist persistence
│   ├── navigation/
│   │   └── AppNavigator.js         # Bottom tab nav (Home/Search/Watchlist) + stack navigators
│   ├── screens/
│   │   ├── HomeScreen.js           # Market indices, watchlist preview, top gainers/losers
│   │   ├── SearchScreen.js         # Search stocks by symbol or name
│   │   ├── StockDetailScreen.js    # Full stock view: chart, time range selector, stats
│   │   └── WatchlistScreen.js      # Manage saved stocks with remove confirmation
│   └── services/
│       └── stockData.js            # Deterministic mock data generation + formatting utilities
└── assets/                         # App icons and splash screen assets
```

## Tech Stack

- **React Native 0.76** with **Expo SDK 52**
- **React Navigation 7** — bottom tabs + native stack
- **React Native SVG** — chart rendering (MiniChart, PriceChart)
- **AsyncStorage** — persistent watchlist storage
- **Expo Vector Icons (Ionicons)** — UI icons

## Key Commands

```bash
# Install dependencies
npm install

# Start Expo development server
npm start

# Run on Android emulator or device
npm run android

# Run on iOS simulator
npm run ios

# Run in web browser
npm run web

# Lint
npm run lint
```

## Development Workflow

### Getting Started

1. Clone the repo and check out your branch
2. Run `npm install`
3. Run `npm start` and open in Expo Go or an emulator

### Branch Naming

- Feature branches: `claude/<description>-<session-id>`
- Always push with `git push -u origin <branch-name>`

### Commit Messages

- Imperative mood (e.g., "Add", "Fix", "Update", "Remove")
- Subject line under 72 characters
- Body explains "why" when the change is non-trivial

## Code Conventions

### General

- **JavaScript** with React functional components and hooks
- Keep code simple and readable; avoid over-engineering
- Prefer small, focused functions over large monolithic ones
- No dead code, commented-out blocks, or unused imports
- Only add comments where the logic is non-obvious

### Component Patterns

- All components are **functional** using hooks (`useState`, `useEffect`, `useMemo`, `useCallback`)
- Styles use `StyleSheet.create()` at the bottom of each file
- Colors always reference `COLORS` from `src/constants/theme.js` — never hardcode hex values
- Navigation uses `navigation.navigate('ScreenName', { params })` pattern
- Each screen is wrapped in `SafeAreaView` with `edges={['top']}`

### File Naming

- **PascalCase** for components and screens: `StockCard.js`, `HomeScreen.js`
- **camelCase** for services and utilities: `stockData.js`
- Screens end with `Screen` suffix
- Components are self-contained with styles co-located in the same file

### State Management

- App-wide state uses **React Context** (`WatchlistContext`)
- Local screen state uses `useState` / `useMemo`
- Persistent data goes through `AsyncStorage`

### Data Layer

- `src/services/stockData.js` generates deterministic mock data using seeded random functions
- All formatting helpers (`formatPrice`, `formatLargeNumber`, `formatVolume`) live in the service layer
- To integrate a real API later, replace functions in `stockData.js` while keeping the same return types

## Architecture Notes

- **Navigation structure**: 3 bottom tabs (Home, Search, Watchlist), each with its own stack navigator that can push `StockDetailScreen`
- **Theme**: Dark mode only, colors defined in `COLORS` constant
- **Charts**: Pure SVG rendering via `react-native-svg` — no heavy chart library dependency
- **Data**: Currently uses deterministic mock generation. To add a real API (e.g., Alpha Vantage, Finnhub), update `src/services/stockData.js` exports

## Notes for AI Assistants

- Always read existing files before modifying them
- Do not introduce security vulnerabilities
- Prefer editing existing files over creating new ones
- Do not add features, refactors, or "improvements" beyond what is requested
- Follow existing patterns: `StyleSheet.create`, `COLORS` references, functional components
- When adding a new screen, add it to `AppNavigator.js` and create the corresponding stack
- When adding a new stock data field, update both `stockData.js` and the relevant screen
- Update this CLAUDE.md when new tooling, structure, or conventions are established
