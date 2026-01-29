import { useColorScheme } from "../../hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ScheduleSummaryProps {
  minBid: string;
  maxBid: string;
}

export function ScheduleSummary({ minBid, maxBid }: ScheduleSummaryProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>
        Schedule Summary
      </Text>
      <Text style={[styles.description, isDark && styles.descriptionDark]}>
        You can pause or adjust your scheduled bid anytime before it starts.
      </Text>
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, isDark && styles.summaryLabelDark]}>
          Min Bid:
        </Text>
        <Text style={[styles.summaryValue, isDark && styles.summaryValueDark]}>
          PKR{minBid}
        </Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, isDark && styles.summaryLabelDark]}>
          Max Bid:
        </Text>
        <Text style={[styles.summaryValue, isDark && styles.summaryValueDark]}>
          PKR{maxBid}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 12,
    marginBottom: 16,
    padding: 12,
  },
  containerDark: {
    backgroundColor: "#111111",
  },
  title: {
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "black",
    marginBottom: 8,
  },
  titleDark: {
    color: "#FFFFFF",
  },
  description: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    marginBottom: 16,
  },
  descriptionDark: {
    color: "#FFFFFF",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  summaryLabelDark: {
    color: "#FFFFFF",
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
  },
  summaryValueDark: {
    color: "#FFFFFF",
  },
});
