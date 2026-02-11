import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WatchlistProvider } from './src/context/WatchlistContext';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/constants/theme';

const navTheme = {
  dark: true,
  colors: {
    primary: COLORS.blue,
    background: COLORS.background,
    card: COLORS.surface,
    text: COLORS.text,
    border: COLORS.border,
    notification: COLORS.red,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <WatchlistProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="light" />
          <AppNavigator />
        </NavigationContainer>
      </WatchlistProvider>
    </SafeAreaProvider>
  );
}
