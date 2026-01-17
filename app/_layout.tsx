import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { SplashScreenComponent } from '@/components/splash-screen';
import { Colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));
        await SplashScreen.hideAsync();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!isReady) {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SplashScreenComponent />
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }

  const backgroundColor = Colors[colorScheme ?? 'light'].background;

  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: backgroundColor,
      card: backgroundColor,
    },
  };

  const customLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: backgroundColor,
      card: backgroundColor,
    },
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? customDarkTheme : customLightTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
          contentStyle: {
            backgroundColor: backgroundColor,
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="secure-account" />
        <Stack.Screen name="login" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="create-password" />
        <Stack.Screen name="verify" />
        <Stack.Screen name="deposit" />
        <Stack.Screen name="success" />
        <Stack.Screen name="instant-offer" />
        <Stack.Screen name="contact-info" />
        <Stack.Screen name="add-car-to-auction" />
        <Stack.Screen name="upload-media" />
        <Stack.Screen name="auction-contact" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="profile-settings" />
        <Stack.Screen name="search" />
        <Stack.Screen name="filters" />
        <Stack.Screen name="results" />
        <Stack.Screen name="detail" />
        <Stack.Screen name="bid" />
        <Stack.Screen name="winner" />
        <Stack.Screen name="more" />
        <Stack.Screen name="my-auction-cars" />
        <Stack.Screen name="instant-offers" />
        <Stack.Screen name="payments-receipts" />
        <Stack.Screen name="payment-details" />
        <Stack.Screen name="schedule-bid" />
        <Stack.Screen name="car-inspection-report" />
        <Stack.Screen name="ac-heater" />
        <Stack.Screen name="breaks" />
        <Stack.Screen name="electrical-electronics" />
        <Stack.Screen name="vehicle-pictures" />
        <Stack.Screen name="comments" />
        <Stack.Screen name="exterior-condition" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
