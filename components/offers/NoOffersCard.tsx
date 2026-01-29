import { useColorScheme } from "../../hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface NoOffersCardProps {
  onRefresh?: () => void;
}

export function NoOffersCard({ onRefresh }: NoOffersCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.redLine} />
        <Text style={[styles.title, isDark && styles.titleDark]}>
          NO OFFERS YET
        </Text>
      </View>
      <Text style={[styles.message, isDark && styles.messageDark]}>
        Dealers are reviewing your listing. You'll receive offers soon.
      </Text>
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={onRefresh}
        activeOpacity={0.8}
      >
        <Text style={styles.refreshText}>REFRESH OFFERS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  redLine: {
    width: 2,
    height: 16,
    backgroundColor: "#DC3729",
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
  },
  titleDark: {
    color: "#FFFFFF",
  },
  message: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    marginBottom: 16,
    lineHeight: 20,
  },
  messageDark: {
    color: "#FFFFFF",
  },
  refreshButton: {
    backgroundColor: "#DC3729",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  refreshText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});
