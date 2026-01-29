import { useColorScheme } from "../../hooks/use-color-scheme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemedCalendarIcon from "../../components/ui/svgs/ThemedCalendarIcon";
import ThemedMeterIcon from "../../components/ui/svgs/ThemedMeterIcon";

export type AuctionStatus = "ending_soon" | "won" | "scheduled" | "active";

interface MyAuctionCarCardProps {
  image: any;
  title: string;
  status: AuctionStatus;
  timeRemaining?: string;
  bidders: number;
  year: string;
  mileage: string;
  currentBid: string;
  startingPrice: string;
  onPress?: () => void;
}

export function MyAuctionCarCard({
  image,
  title,
  status,
  timeRemaining = "0D 5H 0S",
  bidders,
  year,
  mileage,
  currentBid,
  startingPrice,
  onPress,
}: MyAuctionCarCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const showJoinLive = status !== "won" && status !== "scheduled";
  const showStatusBadge = status === "ending_soon";
  const statusDisplay = status === "won" ? "Winner" : timeRemaining;

  return (
    <TouchableOpacity
      style={[styles.container, isDark && styles.containerDark]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} contentFit="cover" />
        {showStatusBadge && (
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>Ending Soon</Text>
          </View>
        )}
      </View>

      <View style={styles.statusTimeContainer}>
        {status === "won" ? (
          <LinearGradient
            colors={["#27C840", "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)", "#27C840", "#27C840"]}
            locations={[0.03, 0.27, 0.74, 0.9059, 1.0]}
            start={{ x: 0, y: 0}}
            end={{ x: 0.75, y: 1 }}
            style={styles.statusTimeGradient}
          >
            <Text style={styles.statusTimeTextWinner}>{statusDisplay}</Text>
          </LinearGradient>
        ) : (
          <LinearGradient
            colors={["rgba(220, 55, 41, 0.75)", "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)", "rgba(203, 61, 29, 0.55)", "rgba(220, 55, 41, 0.5)"]}
            locations={[0.03, 0.27, 0.74, 0.9059, 1.0]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.75, y: 1 }}
            style={styles.statusTimeGradient}
          >
            <Text style={styles.statusTimeText}>{statusDisplay}</Text>
          </LinearGradient>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <View style={styles.titleContainer}>
            <View style={styles.redLine} />
            <Text style={[styles.title, isDark && styles.titleDark]} numberOfLines={1}>
              {title}
            </Text>
          </View>
          <Text style={[styles.bidders, isDark && styles.biddersDark]}>
            {bidders} Bidders
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <ThemedCalendarIcon />
            <Text style={[styles.detailText, isDark && styles.detailTextDark]}>{year}</Text>
          </View>
          <View style={styles.detailItem}>
            <ThemedMeterIcon />
            <Text style={[styles.detailText, isDark && styles.detailTextDark]}>{mileage}</Text>
          </View>
        </View>

        <View style={styles.bidRow}>
          <Text style={[styles.bidLabel, isDark && styles.bidLabelDark]}>
            CURRENT BID RS: {currentBid}
          </Text>
          <Text style={[styles.bidLabel, isDark && styles.bidLabelDark]}>
            STARTING PRICE RS: {startingPrice}
          </Text>
        </View>

        <View style={[styles.divider, isDark && styles.dividerDark]} />

        {showJoinLive && (
          <TouchableOpacity style={styles.joinLiveButton} activeOpacity={0.8}>
            <Text style={styles.joinLiveText}>JOIN LIVE</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    marginBottom: 16,
    overflow: "hidden",
  },
  containerDark: {
    backgroundColor: "#111111",
    borderColor: "#494949",
  },
  imageContainer: {
    position: "relative",
    padding: 12,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  statusBadge: {
    position: "absolute",
    top: 24,
    left: 24,
    backgroundColor: "#DC3729",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusBadgeText: {
    fontSize: 12,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  statusTimeContainer: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  statusTimeGradient: {
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  statusTimeText: {
    fontSize: 24,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
  },
  statusTimeTextWinner: {
    fontSize: 24,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#27C840",
  },
  content: {
    padding: 16,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
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
    flex: 1,
  },
  titleDark: {
    color: "#FFFFFF",
  },
  bidders: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  biddersDark: {
    color: "#FFFFFF",
  },
  detailsRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  detailTextDark: {
    color: "#FFFFFF",
  },
  bidRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  bidLabel: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  bidLabelDark: {
    color: "#FFFFFF",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginBottom: 12,
  },
  dividerDark: {
    backgroundColor: "#494949",
  },
  joinLiveButton: {
    backgroundColor: "#DC3729",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  joinLiveText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});
