import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InfoIcon from "@/components/ui/svgs/InfoIcon";
import LightbulbIcon from "@/components/ui/svgs/LightbulbIcon";
import { BidInputControl } from "./BidInputControl";

interface AutoBidSettingsProps {
  minBid: string;
  maxBid: string;
  onMinBidDecrease: () => void;
  onMinBidIncrease: () => void;
  onMaxBidDecrease: () => void;
  onMaxBidIncrease: () => void;
  onMinBidSet: () => void;
  onMaxBidSet: () => void;
  onMinBidChange?: (text: string) => void;
  onMaxBidChange?: (text: string) => void;
}

export function AutoBidSettings({
  minBid,
  maxBid,
  onMinBidDecrease,
  onMinBidIncrease,
  onMaxBidDecrease,
  onMaxBidIncrease,
  onMinBidSet,
  onMaxBidSet,
  onMinBidChange,
  onMaxBidChange,
}: AutoBidSettingsProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.titleDark]}>
          Auto-Bid Settings
        </Text>
        <InfoIcon />
      </View>
      <Text style={[styles.description, isDark && styles.descriptionDark]}>
        Set your bid range and let the app bid for you automatically.
      </Text>
      <BidInputControl
        label="Minimum Bid"
        value={minBid}
        onDecrease={onMinBidDecrease}
        onIncrease={onMinBidIncrease}
        onSetBid={onMinBidSet}
        onChangeText={onMinBidChange}
      />
      <BidInputControl
        label="Maximum Bid"
        value={maxBid}
        onDecrease={onMaxBidDecrease}
        onIncrease={onMaxBidIncrease}
        onSetBid={onMaxBidSet}
        onChangeText={onMaxBidChange}
      />
      <View style={styles.tipRow}>
        <LightbulbIcon />
        <Text style={[styles.tipText, isDark && styles.tipTextDark]}>
          The system will place bids within your set range until the maximum limit is reached.
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "black",
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
  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  tipTextDark: {
    color: "#FFFFFF",
  },
});
