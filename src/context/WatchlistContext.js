import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchlistContext = createContext();
const STORAGE_KEY = '@stocks_watchlist';

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA']);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      if (data) setWatchlist(JSON.parse(data));
    });
  }, []);

  const saveWatchlist = useCallback((list) => {
    setWatchlist(list);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }, []);

  const addToWatchlist = useCallback((symbol) => {
    saveWatchlist(prev => {
      const updated = [...prev, symbol];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    setWatchlist(prev => {
      if (prev.includes(symbol)) return prev;
      const updated = [...prev, symbol];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromWatchlist = useCallback((symbol) => {
    setWatchlist(prev => {
      const updated = prev.filter(s => s !== symbol);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isInWatchlist = useCallback((symbol) => {
    return watchlist.includes(symbol);
  }, [watchlist]);

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) throw new Error('useWatchlist must be used within WatchlistProvider');
  return context;
}
