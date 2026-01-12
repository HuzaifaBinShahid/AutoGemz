import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import OutbidIcon from "@/components/ui/svgs/OutbidIcon";

interface FinalBidEntry {
  id: string;
  rank: number;
  name: string;
  bidAmount: string;
  status: string;
  avatar: any;
  isWinner?: boolean;
  isCurrentUser?: boolean;
}

interface FinalRankingTableProps {
  isWinner?: boolean;
}

const winnerBids: FinalBidEntry[] = [
  {
    id: "1",
    rank: 1,
    name: "Ahmed Sabana",
    bidAmount: "12,00,00",
    status: "Winner",
    avatar: require("@/assets/images/AuthBg.png"),
    isWinner: true,
    isCurrentUser: true,
  },
  {
    id: "2",
    rank: 2,
    name: "Sara Chole",
    bidAmount: "11,00,00",
    status: "Outbid",
    avatar: require("@/assets/images/AuthBg.png"),
  },
  {
    id: "3",
    rank: 3,
    name: "Harry Lincons",
    bidAmount: "10,00,00",
    status: "Outbid",
    avatar: require("@/assets/images/AuthBg.png"),
  },
  {
    id: "4",
    rank: 4,
    name: "Mathew Jone",
    bidAmount: "9,00,00",
    status: "Outbid",
    avatar: require("@/assets/images/AuthBg.png"),
  },
];

const outbidBids: FinalBidEntry[] = [
  {
    id: "1",
    rank: 1,
    name: "Ahmed Sabana",
    bidAmount: "12,00,00",
    status: "Winner",
    avatar: require("@/assets/images/AuthBg.png"),
    isWinner: true,
  },
  {
    id: "2",
    rank: 2,
    name: "Sara Chole",
    bidAmount: "11,00,00",
    status: "You were outbid",
    avatar: require("@/assets/images/AuthBg.png"),
    isCurrentUser: true,
  },
  {
    id: "3",
    rank: 3,
    name: "Harry Lincons",
    bidAmount: "10,00,00",
    status: "Outbid",
    avatar: require("@/assets/images/AuthBg.png"),
  },
  {
    id: "4",
    rank: 4,
    name: "Mathew Jone",
    bidAmount: "9,00,00",
    status: "Outbid",
    avatar: require("@/assets/images/AuthBg.png"),
  },
];

export function FinalRankingTable({ isWinner = true }: FinalRankingTableProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const finalBids = isWinner ? winnerBids : outbidBids;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>
        FINAL RANKING
      </Text>
      <View style={styles.header}>
        <Text style={[styles.headerLabel, isDark && styles.headerLabelDark]}>
          RANK
        </Text>
        <View style={styles.redLine} />
        <Text style={[styles.headerLabel, isDark && styles.headerLabelDark]}>
          BID
        </Text>
        <View style={styles.redLine} />
        <Text style={[styles.headerLabel, isDark && styles.headerLabelDark]}>
          STATUS
        </Text>
      </View>
      <View style={styles.bidsList}>
        {finalBids.map((bid, index) => (
          <View
            key={bid.id}
            style={[
              styles.bidRow,
              bid.isWinner && styles.bidRowWinner,
              index < finalBids.length - 1 && styles.bidRowBorder,
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
            <View style={styles.statusContainer}>
              {!bid.isWinner && bid.status === "Outbid" && <OutbidIcon />}
              <Text
                style={[
                  styles.statusText,
                  bid.isWinner && styles.statusTextWinner,
                  !bid.isWinner && bid.status === "Outbid" && styles.statusTextOutbid,
                  !bid.isWinner && bid.status === "Winner" && styles.statusTextWinnerGreen,
                  !bid.isWinner && bid.status === "You were outbid" && styles.statusTextOutbid,
                ]}
              >
                {bid.status}
              </Text>
            </View>
          </View>
        ))}
      </View>
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
  title: {
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
    marginBottom: 16,
  },
  titleDark: {
    color: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
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
  bidsList: {
    gap: 0,
  },
  bidRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  bidRowWinner: {
    backgroundColor: "#3EB549",
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
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  statusTextWinner: {
    color: "#FFFFFF",
  },
  statusTextWinnerGreen: {
    color: "#3EB549",
  },
  statusTextOutbid: {
    color: "#DC3729",
  },
});
