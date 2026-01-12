import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface BidEntry {
  id: string;
  rank: number;
  name: string;
  bidAmount: string;
  timeAgo: string;
  avatar: any;
  isSelected?: boolean;
  isCurrentUser?: boolean;
}

const dummyBids: BidEntry[] = [
  {
    id: "1",
    rank: 61,
    name: "Ahmed Saleem",
    bidAmount: "12,00,00",
    timeAgo: "39 minutes ago",
    avatar: require("@/assets/images/AuthBg.png"),
    isSelected: true,
  },
  {
    id: "2",
    rank: 62,
    name: "Sara Charle",
    bidAmount: "11,00,00",
    timeAgo: "02 minutes ago",
    avatar: require("@/assets/images/AuthBg.png"),
  },
  {
    id: "3",
    rank: 63,
    name: "Harry Lincons",
    bidAmount: "10,00,00",
    timeAgo: "09 minutes ago",
    avatar: require("@/assets/images/AuthBg.png"),
  },
  {
    id: "4",
    rank: 64,
    name: "Mehew Jame",
    bidAmount: "9,00,00",
    timeAgo: "30 minutes ago",
    avatar: require("@/assets/images/AuthBg.png"),
    isCurrentUser: true,
  },
];

export function BidRankTable() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const formatTime = (hours: number, minutes: number, seconds: number) => {
    return `${hours}H ${minutes}M ${seconds}S`;
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.headerLabel, isDark && styles.headerLabelDark]}>
            RANK
          </Text>
          <View style={styles.redLine} />
          <Text style={[styles.headerLabel, isDark && styles.headerLabelDark]}>
            BID
          </Text>
        </View>
        <View style={styles.timerBox}>
          <Text style={[styles.timerText, isDark && styles.timerTextDark]}>
            {formatTime(1, 45, 3)}
          </Text>
        </View>
      </View>
      <View style={styles.bidsList}>
        {dummyBids.map((bid, index) => (
          <View
            key={bid.id}
            style={[
              styles.bidRow,
              bid.isSelected && styles.bidRowSelected,
              index < dummyBids.length - 1 && styles.bidRowBorder,
            ]}
          >
            <View style={styles.bidLeft}>
              <Image source={bid.avatar} style={styles.avatar} />
              <View style={styles.bidInfo}>
                <Text style={[styles.rankText, isDark && styles.rankTextDark]}>
                  {bid.rank}
                  {bid.rank === 1
                    ? "st"
                    : bid.rank === 2
                    ? "nd"
                    : bid.rank === 3
                    ? "rd"
                    : "th"}{" "}
                  Place{" "}
                  <Text style={styles.nameText}>{bid.name}</Text>
                  {bid.isCurrentUser && (
                    <Text style={styles.youText}> (You)</Text>
                  )}
                </Text>
                <Text style={[styles.bidAmount, isDark && styles.bidAmountDark]}>
                  RS: {bid.bidAmount}
                </Text>
              </View>
            </View>
            <Text style={[styles.timeText, isDark && styles.timeTextDark]}>
              {bid.timeAgo}
            </Text>
          </View>
        ))}
      </View>
      <Text style={[styles.footerText, isDark && styles.footerTextDark]}>
        Place a higher bid to move your offer up in the auction list. You'll
        only pay if your bid remains in the top spots when the auction closes.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 8,
    padding: 16,
  },
  containerDark: {
    backgroundColor: "#111111",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerLabel: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
  },
  headerLabelDark: {
    color: "#FFFFFF",
  },
  redLine: {
    width: 1,
    height: 16,
    backgroundColor: "#DC3729",
  },
  timerBox: {
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  timerText: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  timerTextDark: {
    color: "#FFFFFF",
  },
  bidsList: {
    marginBottom: 16,
  },
  bidRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  bidRowSelected: {
    backgroundColor: "#EFCECB",
  },
  bidRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  bidLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  bidInfo: {
    flex: 1,
  },
  rankText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    marginBottom: 4,
  },
  rankTextDark: {
    color: "#FFFFFF",
  },
  nameText: {
    fontFamily: "Mulish_400Regular",
  },
  youText: {
    color: "#DC3729",
  },
  bidAmount: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  bidAmountDark: {
    color: "#FFFFFF",
  },
  timeText: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  timeTextDark: {
    color: "#FFFFFF",
  },
  footerText: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    lineHeight: 18,
  },
  footerTextDark: {
    color: "#FFFFFF",
  },
});
