import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

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

export function FinalRankingTable({ isWinner = false }: FinalRankingTableProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const finalBids = isWinner ? winnerBids : outbidBids;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>
        FINAL RANKING
      </Text>
      <View style={styles.tableContainer}>
        <View style={[styles.tableHeader, isDark && styles.tableHeaderDark]}>
          <View style={styles.redDividerContainer}>
            <View style={styles.redDivider} />
          </View>
          <View style={[styles.headerCell, styles.rankColumn]}>
            <Text style={[styles.headerLabel, isDark && styles.headerLabelDark]}>
              RANK
            </Text>
          </View>
          <View style={styles.redDividerContainer}>
            <View style={styles.redDivider} />
          </View>
          <View style={[styles.headerCell, styles.bidColumn]}>
            <Text style={[styles.headerLabel, isDark && styles.headerLabelDark]}>
              BID
            </Text>
          </View>
          <View style={styles.redDividerContainer}>
            <View style={styles.redDivider} />
          </View>
          <View style={[styles.headerCell, styles.statusColumn]}>
            <Text style={[styles.headerLabel, isDark && styles.headerLabelDark]}>
              STATUS
            </Text>
          </View>
        </View>
        {finalBids.map((bid, index) => (
          <View
            key={bid.id}
            style={[
              styles.tableRow,
              bid.isWinner && bid.isCurrentUser && styles.bidRowWinner,
              !bid.isWinner && bid.isCurrentUser && !isWinner && styles.bidRowOutbid,
              !bid.isWinner && !bid.isCurrentUser && isDark && styles.tableRowDark,
            ]}
          >
            <View style={[styles.tableCell, styles.rankColumn]}>
              <View style={styles.rankCellContent}>
                <Image source={bid.avatar} style={styles.avatar} />
                <View style={styles.rankTextContainer}>
                  <Text
                    style={[
                      styles.rankText,
                      isDark && styles.rankTextDark,
                      bid.isWinner && bid.isCurrentUser && styles.rankTextWinner,
                      !bid.isWinner && bid.isCurrentUser && !isWinner && styles.rankTextOutbid,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {bid.rank}
                    {bid.rank === 1
                      ? "st"
                      : bid.rank === 2
                        ? "nd"
                        : bid.rank === 3
                          ? "rd"
                          : "th"}{" "}
                    Place
                  </Text>
                  <Text
                    style={[
                      styles.nameText,
                      isDark && styles.nameTextDark,
                      bid.isWinner && bid.isCurrentUser && styles.nameTextWinner,
                      !bid.isWinner && bid.isCurrentUser && !isWinner && styles.nameTextOutbid,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {bid.name}
                    {bid.isCurrentUser && (
                      <Text style={styles.youText}> (You)</Text>
                    )}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.grayDividerContainer}>
              <View style={styles.grayDivider} />
            </View>
            <View style={[styles.tableCell, styles.bidColumn]}>
              <Text
                style={[
                  styles.bidAmount,
                  isDark && styles.bidAmountDark,
                  bid.isWinner && bid.isCurrentUser && styles.bidAmountWinner,
                  !bid.isWinner && bid.isCurrentUser && !isWinner && styles.bidAmountOutbid,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                RS: {bid.bidAmount}
              </Text>
            </View>
            <View style={styles.grayDividerContainer}>
              <View style={styles.grayDivider} />
            </View>
            <View style={[styles.tableCell, styles.statusColumn]}>
              <View style={styles.statusContainer}>
                {!bid.isWinner && bid.status === "Outbid"}
                <Text
                  style={[
                    styles.statusText,
                    bid.isWinner && bid.isCurrentUser && styles.statusTextWinner,
                    bid.isWinner && !bid.isCurrentUser && styles.statusTextWinnerGreen,
                    !bid.isWinner && bid.isCurrentUser && !isWinner && styles.statusTextOutbidWhite,
                    !bid.isWinner && !bid.isCurrentUser && bid.status === "Outbid" && styles.statusTextOutbid,
                    !bid.isWinner && !bid.isCurrentUser && bid.status === "You were outbid" && styles.statusTextOutbid,
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {bid.status}
                </Text>
              </View>
            </View>
          </View>
        ))}
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
    backgroundColor: "#111111",
  },
  title: {
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  titleDark: {
    color: "#FFFFFF",
  },
  tableContainer: {
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "#F4F4F4",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F4F4F4",
    alignItems: "center",
  },
  tableHeaderDark: {
    backgroundColor: "#111111",
  },
  tableRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ABABAB",
    backgroundColor: "black",
  },
  tableRowDark: {
    backgroundColor: "#111111",
  },
  headerCell: {
    paddingVertical: 12,
    paddingLeft: 12,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  redDividerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
  },
  redDivider: {
    width: 2,
    height: 16,
    backgroundColor: "#DC3729",
  },
  grayDividerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  grayDivider: {
    width: 1,
    backgroundColor: "#ABABAB",
    alignSelf: "stretch",
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
  rankColumn: {
    flex: 1.5,
    minWidth: 0,
  },
  bidColumn: {
    flex: 1.2,
    minWidth: 0,
  },
  statusColumn: {
    flex: 1.2,
    minWidth: 0,
    borderRightWidth: 0,
  },
  bidRowWinner: {
    backgroundColor: "#3EB549",
  },
  bidRowOutbid: {
    backgroundColor: "#DC3729",
  },
  tableCell: {
    paddingVertical: 12,
    paddingLeft: 12,
    paddingRight: 12,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: "hidden",
    borderRightWidth: 1,
    borderRightColor: "#ABABAB",
  },
  rankCellContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minWidth: 0,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  rankTextContainer: {
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
  rankTextWinner: {
    color: "#FFFFFF",
  },
  rankTextOutbid: {
    color: "#FFFFFF",
  },
  nameText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  nameTextDark: {
    color: "#FFFFFF",
  },
  nameTextWinner: {
    color: "#FFFFFF",
  },
  nameTextOutbid: {
    color: "#FFFFFF",
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
  bidAmountWinner: {
    color: "#FFFFFF",
  },
  bidAmountOutbid: {
    color: "#FFFFFF",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexShrink: 1,
  },
  statusText: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    flexShrink: 1,
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
  statusTextOutbidWhite: {
    color: "#FFFFFF",
  },
});
