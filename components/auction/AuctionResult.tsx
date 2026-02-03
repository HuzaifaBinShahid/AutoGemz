import InfoIcon from "../../components/ui/svgs/InfoIcon";
import { useColorScheme } from "../../hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AuctionResultProps {
  auction: any;
  bids: any[];
}

export function AuctionResult({ auction, bids }: AuctionResultProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const winningBid = bids[0]?.bidAmount || auction?.currentBid || 0;
  const biddersCount = auction?.biddersCount || new Set(bids.map(b => b.bidderId?._id || b.bidderId?.id || b.bidderId)).size;
  const timeClosed = auction?.endDate || auction?.endTime ? new Date(auction.endDate || auction.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—";

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
          RS {winningBid.toLocaleString()}
        </Text>
      </View>
      <View style={styles.resultItem}>
        <Text style={[styles.resultLabel, isDark && styles.resultLabelDark]}>
          Number of bidders:
        </Text>
        <Text style={[styles.resultValue, isDark && styles.resultValueDark]}>
          {biddersCount}
        </Text>
      </View>
      <View style={styles.dashedLine} />
      <View style={styles.resultItem}>
        <Text style={[styles.resultLabel, isDark && styles.resultLabelDark]}>
          Time closed:
        </Text>
        <Text style={[styles.resultValue, isDark && styles.resultValueDark]}>
          {timeClosed}
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
