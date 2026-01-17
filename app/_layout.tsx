import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { SplashScreenComponent } from '@/components/splash-screen';

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

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="secure-account" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="login" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="create-password" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="verify" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="deposit" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="success" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="instant-offer" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="contact-info" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="add-car-to-auction" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="upload-media" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="auction-contact" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="notifications" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="profile-settings" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="search" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="filters" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="results" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="detail" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="bid" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="winner" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="more" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="my-auction-cars" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="instant-offers" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="payments-receipts" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="payment-details" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="schedule-bid" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="car-inspection-report" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="ac-heater" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="breaks" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="electrical-electronics" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="vehicle-pictures" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="comments" options={{ headerShown: false, animation: "fade" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
