import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";

export function SplashScreenComponent() {
  const colorScheme = useColorScheme();

  const logoSource =
    colorScheme === "dark"
      ? require("@/assets/images/SplashLogoDark.png")
      : require("@/assets/images/SplashLogoLight.png");

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff" },
      ]}
    >
      <Image source={logoSource} style={styles.logo} contentFit="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});
