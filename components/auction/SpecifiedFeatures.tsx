import BluetoothIcon from "@/components/ui/svgs/BluetoothIcon";
import CruiseControl from "@/components/ui/svgs/CruiseControl";
import DigitalDisplay from "@/components/ui/svgs/DigitalDisplay";
import NavigationIcon from "@/components/ui/svgs/NavigationIcon";
import ParkingSensors from "@/components/ui/svgs/ParkingSensors";
import Petrolcon from "@/components/ui/svgs/Petrolcon";
import ReversingCameraIcon from "@/components/ui/svgs/ReversingCameraIcon";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Feature {
  icon: React.ReactNode;
  label: string;
}

const defaultFeatures: Feature[] = [
  { icon: <ParkingSensors />, label: "Parking Sensors" },
  { icon: <Petrolcon />, label: "Petrol" },
  { icon: <CruiseControl />, label: "Cruise Control" },
  { icon: <NavigationIcon />, label: "Navigation" },
  { icon: <NavigationIcon />, label: "Navigation" },
  { icon: <ReversingCameraIcon />, label: "Reversing Camera" },
  { icon: <BluetoothIcon />, label: "Bluetooth" },
  { icon: <DigitalDisplay />, label: "Digital Display" },
];

export function SpecifiedFeatures() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.titleContainer}>
        <View style={styles.redLine} />
        <Text style={[styles.title, isDark && styles.titleDark]}>
          SPECIFIED FEATURES
        </Text>
      </View>
      <View style={styles.featuresGrid}>
        {defaultFeatures.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <View style={styles.iconContainer}>{feature.icon}</View>
            <Text style={[styles.featureLabel, isDark && styles.featureLabelDark]}>
              {feature.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 4,
    paddingVertical: 20,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  containerDark: {
    backgroundColor: "#111111",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  redLine: {
    width: 2,
    height: 24,
    backgroundColor: "#DC3729",
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
  },
  titleDark: {
    color: "#FFFFFF",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureItem: {
    width: "23%",
    alignItems: "center",
    marginBottom: 24,
  },
  iconContainer: {
    marginBottom: 8,
  },
  featureLabel: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    textAlign: "center",
  },
  featureLabelDark: {
    color: "#FFFFFF",
  },
});
