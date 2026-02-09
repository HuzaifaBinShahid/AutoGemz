import { useColorScheme } from "../../hooks/use-color-scheme";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface BidRankTableProps {
  bids?: any[];
  currentUserId?: string;
  participants?: any[];
}

// Dummy data removed

export function BidRankTable({
  bids = [],
  currentUserId,
  participants = [],
}: BidRankTableProps) {
  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    return date.toLocaleDateString();
  };

  const tableBids = bids.map((b, index) => ({
    id: b._id || b.id,
    rank: index + 1,
    name: b.bidderId?.fullName || "Anonymous",
    bidAmount: b.bidAmount.toLocaleString(),
    timeAgo: formatTimeAgo(b.createdAt),
    avatar: require("../../assets/images/AuthBg.png"), // Fallback for now
    isSelected: index === 0,
    isCurrentUser:
      b.bidderId?._id === currentUserId || b.bidderId?.id === currentUserId,
  }));

  // If no bids, show participants with a placeholder status
  const displayData =
    tableBids.length > 0
      ? tableBids
      : participants.map((p, index) => ({
          id: p._id || p.id,
          rank: index + 1,
          name: p.fullName || "Anonymous",
          bidAmount: "—",
          timeAgo: "Joined",
          avatar: require("../../assets/images/AuthBg.png"),
          isSelected: false,
          isCurrentUser: p._id === currentUserId || p.id === currentUserId,
        }));
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const formatTime = (hours: number, minutes: number, seconds: number) => {
    return `${hours}H ${minutes}M ${seconds}S`;
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.tableContainer}>
        <View style={[styles.tableHeader, isDark && styles.tableHeaderDark]}>
          <View style={styles.redDividerContainer}>
            <View style={styles.redDivider} />
          </View>
          <View style={[styles.headerCell, styles.rankColumn]}>
            <Text
              style={[styles.headerLabel, isDark && styles.headerLabelDark]}
            >
              RANK
            </Text>
          </View>
          <View style={styles.redDividerContainer}>
            <View style={styles.redDivider} />
          </View>
          <View style={[styles.headerCell, styles.bidColumn]}>
            <Text
              style={[styles.headerLabel, isDark && styles.headerLabelDark]}
            >
              BID
            </Text>
          </View>
          <View style={[styles.headerCell, styles.timeColumn]}>
            <Text style={[styles.timerText, isDark && styles.timerTextDark]}>
              AUCTION HISTORY
            </Text>
          </View>
        </View>
        {displayData.map((bid) => (
          <View
            key={bid.id}
            style={[
              styles.tableRow,
              bid.isSelected && styles.bidRowSelected,
              !bid.isSelected && isDark && styles.tableRowDark,
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
                      bid.isSelected && styles.rankTextSelected,
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
                      bid.isSelected && styles.nameTextSelected,
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
                  bid.isSelected && styles.bidAmountSelected,
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
            <View style={[styles.tableCell, styles.timeColumn]}>
              <Text
                style={[
                  styles.timeText,
                  isDark && styles.timeTextDark,
                  bid.isSelected && styles.timeTextSelected,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {bid.timeAgo}
              </Text>
            </View>
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
    backgroundColor: "#F4F4F4",
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 8,
  },
  containerDark: {
    backgroundColor: "#111111",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
    paddingHorizontal: 0,
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
    backgroundColor: "#EDEDED",
    padding: 6,
    borderWidth: 1,
    borderColor: "#ABABAB",
  },
  timerTextDark: {
    backgroundColor: "#737779",
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
    backgroundColor: "#F4F4F4",
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
  rankColumn: {
    flex: 1.5,
    minWidth: 0,
  },
  bidColumn: {
    flex: 1.2,
    minWidth: 0,
  },
  timeColumn: {
    flex: 1.2,
    minWidth: 0,
    borderRightWidth: 0,
  },
  bidRowSelected: {
    backgroundColor: "#EFCECB",
  },
  tableCell: {
    paddingVertical: 12,
    paddingLeft: 12,
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
  rankTextSelected: {
    color: "#000000",
  },
  nameText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  nameTextDark: {
    color: "#FFFFFF",
  },
  nameTextSelected: {
    color: "#000000",
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
  bidAmountSelected: {
    color: "#000000",
  },
  timeText: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  timeTextDark: {
    color: "#FFFFFF",
  },
  timeTextSelected: {
    color: "#000000",
  },
  footerText: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    lineHeight: 18,
    marginTop: 16,
  },
  footerTextDark: {
    color: "#FFFFFF",
  },
});
