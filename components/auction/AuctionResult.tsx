import InfoIcon from "@/components/ui/svgs/InfoIcon";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function AuctionResult() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>
        Auction Result
      </Text>
      <View style={styles.resultItem}>
        <Text style={[styles.resultLabel, isDark && styles.resultLabelDark]}>
          Winning bid:
        </Text>
        <Text style={[styles.resultValue, isDark && styles.resultValueDark]}>
          RS 34,000
        </Text>
      </View>
      <View style={styles.resultItem}>
        <Text style={[styles.resultLabel, isDark && styles.resultLabelDark]}>
          Number of bidders:
        </Text>
        <Text style={[styles.resultValue, isDark && styles.resultValueDark]}>
          12
        </Text>
      </View>
      <View style={styles.dashedLine} />
      <View style={styles.resultItem}>
        <Text style={[styles.resultLabel, isDark && styles.resultLabelDark]}>
          Time closed:
        </Text>
        <Text style={[styles.resultValue, isDark && styles.resultValueDark]}>
          2:00 PM (GMT)
        </Text>
      </View>
      <View style={styles.warningRow}>
        <InfoIcon />
        <Text style={styles.warningText}>
          You can return this car within 7 days.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4",
    marginHorizontal: 24,
    marginBottom: 24,

    borderRadius: 8,
  },
  containerDark: {
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    marginBottom: 16,
  },
  titleDark: {
    color: "#FFFFFF",
  },
  resultItem: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 12,
  },
  resultLabel: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "black",
  },
  resultLabelDark: {
    color: "#FFFFFF",
  },
  resultValue: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  resultValueDark: {
    color: "#FFFFFF",
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    borderStyle: "dashed",
    marginVertical: 12,
  },
  warningRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    backgroundColor: "#DC37294D",
    padding: 12,
  },
  warningText: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#DC3729",
    flex: 1,
  },
});
