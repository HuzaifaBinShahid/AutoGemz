import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import FireIcon from "@/components/ui/svgs/FireIcon";
import ThemedCalendarIcon from "@/components/ui/svgs/ThemedCalendarIcon";
import ThemedMeterIcon from "@/components/ui/svgs/ThemedMeterIcon";

interface AuctionCardProps {
  image: any;
  title: string;
  currentBid: string;
  timeRemaining: string;
  year: string;
  mileage: string;
  isActive?: boolean;
  width?: number;
  darkBorderColor?: string;
}

export function AuctionCard({
  image,
  title,
  currentBid,
  timeRemaining,
  year,
  mileage,
  isActive = false,
  width = 290,
  darkBorderColor = "#737779",
}: AuctionCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      style={[
        styles.container,
        { width },
        isDark && { ...styles.containerDark, borderColor: darkBorderColor },
      ]}
    >
      <View style={styles.mainContent}>
        <View style={styles.leftSection}>
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.image} contentFit="cover" />
            {isActive && (
              <View style={styles.activeBadge}>
                <Text style={styles.activeText}>ACTIVE</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <View style={styles.redLine} />
            <Text style={[styles.title, isDark && styles.titleDark]}>
              {title}
            </Text>
          </View>
          <Text style={[styles.bid, isDark && styles.bidDark]}>
            {currentBid}
          </Text>
          <View style={styles.tagsContainer}>
            <View style={[styles.hotTag, isDark && styles.hotTagDark]}>
              <FireIcon />
              <Text style={[styles.hotText, isDark && styles.hotTextDark]}>HOT</Text>
            </View>
            <View style={[styles.timer, isDark && styles.timerDark]}>
              <Text style={[styles.timerText, isDark && styles.timerTextDark]}>
                {timeRemaining}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <ThemedCalendarIcon />
          <Text style={[styles.detailText, isDark && styles.detailTextDark]}>
            {year}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <ThemedMeterIcon />
          <Text style={[styles.detailText, isDark && styles.detailTextDark]}>
            {mileage}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    padding: 6,
    marginRight: 12,
  },
  containerDark: {
    backgroundColor: "#111111",
    borderWidth: 1,
  },
  mainContent: {
    flexDirection: "row",
  },
  leftSection: {
    width: 100,
  },
  imageContainer: {
    position: "relative",
    width: 90,
    height: 90,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  activeBadge: {
    position: "absolute",
    right: 0,
    backgroundColor: "#2DD4BF",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  activeText: {
    fontSize: 10,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  content: {
    flex: 1,
    paddingLeft: 4,
    gap: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  redLine: {
    width: 2,
    height: 16,
    backgroundColor: "#DC3729",
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
    flex: 1,
  },
  titleDark: {
    color: "#F4F4F4",
  },
  bid: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    marginBottom: 2,
  },
  bidDark: {
    color: "#F4F4F4",
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  hotTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  hotTagDark: {
    backgroundColor: "#737779",
  },
  hotText: {
    fontSize: 10,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#111111",
    textTransform: "uppercase",
  },
  hotTextDark: {
    fontSize: 10,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  timer: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  timerDark: {
    backgroundColor: "#737779",
  },
  timerText: {
    fontSize: 10,
    fontFamily: "Mulish_400Regular",
    color: "#111111",
  },
  timerTextDark: {
    color: "#F4F4F4",
  },
  divider: {
    height: 1,
    backgroundColor: "#737779",
    marginTop: 8,
    marginBottom: 8,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  detailTextDark: {
    color: "#F4F4F4",
  },
});
