import { Image } from "expo-image";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";


import { useColorScheme } from "@/hooks/use-color-scheme";

const ACCENT_COLOR = "#DC3729";
const CORNER_SIZE = 8;

const getBlurSize = () => {
  const { width, height } = Dimensions.get("window");
  return Math.max(width, height) * 1.2;
};

export function SplashScreenComponent() {
  const colorScheme = useColorScheme();
  const blurSize = getBlurSize();
  const { width, height } = Dimensions.get("window");

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
      <View style={styles.blurContainer}>
        <Svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        >
          <Defs>
            <RadialGradient
              id="topLeftGradient"
              cx={-blurSize * 0.2}
              cy={-blurSize * 0.2}
              r={blurSize}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor={ACCENT_COLOR} stopOpacity="0.45" />
              <Stop offset="20%" stopColor={ACCENT_COLOR} stopOpacity="0.32" />
              <Stop offset="40%" stopColor={ACCENT_COLOR} stopOpacity="0.18" />
              <Stop offset="65%" stopColor={ACCENT_COLOR} stopOpacity="0.08" />
              <Stop offset="85%" stopColor={ACCENT_COLOR} stopOpacity="0.03" />
              <Stop offset="100%" stopColor={ACCENT_COLOR} stopOpacity="0" />
            </RadialGradient>
            <RadialGradient
              id="bottomRightGradient"
              cx={width + blurSize * 0.2}
              cy={height + blurSize * 0.2}
              r={blurSize}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor={ACCENT_COLOR} stopOpacity="0.45" />
              <Stop offset="20%" stopColor={ACCENT_COLOR} stopOpacity="0.32" />
              <Stop offset="40%" stopColor={ACCENT_COLOR} stopOpacity="0.18" />
              <Stop offset="65%" stopColor={ACCENT_COLOR} stopOpacity="0.08" />
              <Stop offset="85%" stopColor={ACCENT_COLOR} stopOpacity="0.03" />
              <Stop offset="100%" stopColor={ACCENT_COLOR} stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Circle
            cx={-blurSize * 0.2}
            cy={-blurSize * 0.2}
            r={blurSize}
            fill="url(#topLeftGradient)"
          />
          <Circle
            cx={-blurSize * 0.2}
            cy={-blurSize * 0.2}
            r={blurSize * 0.6}
            fill="url(#topLeftGradient)"
            opacity={0.6}
          />
          <Circle
            cx={width + blurSize * 0.2}
            cy={height + blurSize * 0.2}
            r={blurSize}
            fill="url(#bottomRightGradient)"
          />
          <Circle
            cx={width + blurSize * 0.2}
            cy={height + blurSize * 0.2}
            r={blurSize * 0.6}
            fill="url(#bottomRightGradient)"
            opacity={0.6}
          />
        </Svg>
      </View>

      <View style={styles.logoContainer}>
        <View style={styles.topLeftCorner} />
        <View style={styles.topRightCorner} />
        <View style={styles.bottomLeftCorner} />
        <View style={styles.bottomRightCorner} />
        <Image source={logoSource} style={styles.logo} contentFit="contain" />
      </View>
    </View>
  );
}

const LOGO_SIZE = 200;
const CORNER_OFFSET = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  logoContainer: {
    width: LOGO_SIZE + CORNER_OFFSET * 2,
    height: LOGO_SIZE + CORNER_OFFSET * 2,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 10,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
  topLeftCorner: {
    position: "absolute",
    top: 0,
    left: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    backgroundColor: ACCENT_COLOR,
    zIndex: 100,
    elevation: 100,
  },
  topRightCorner: {
    position: "absolute",
    top: 0,
    right: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    backgroundColor: ACCENT_COLOR,
    zIndex: 100,
    elevation: 100,
  },
  bottomLeftCorner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    backgroundColor: ACCENT_COLOR,
    zIndex: 100,
    elevation: 100,
  },
  bottomRightCorner: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    backgroundColor: ACCENT_COLOR,
    zIndex: 100,
    elevation: 100,
  },
});
