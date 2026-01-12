import DetailLocationIcon from "@/components/ui/svgs/DetailLocationIcon";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AuctionDetailsProps {
  title: string;
  startPrice: string;
  finalPrice: string;
  location: string;
}

export function AuctionDetails({
  title,
  startPrice,
  finalPrice,
  location,
}: AuctionDetailsProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.redLine} />
        <Text style={[styles.title, isDark && styles.titleDark]}>{title}</Text>
      </View>
      <View style={styles.priceContainer}>
        <View style={styles.priceInfo}>
          <Text style={[styles.startPrice, isDark && styles.startPriceDark]}>
            START PRICE RS. {startPrice}
          </Text>
          <Text style={[styles.finalPrice, isDark && styles.finalPriceDark]}>
            FINAL PRICE: {finalPrice}
          </Text>
        </View>
        <View style={styles.locationContainer}>
          <DetailLocationIcon />
          <Text style={[styles.location, isDark && styles.locationDark]}>
            {location}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  redLine: {
    width: 2,
    height: 24,
    backgroundColor: "#DC3729",
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
    flex: 1,
  },
  titleDark: {
    color: "#FFFFFF",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  priceInfo: {
    flex: 1,
  },
  startPrice: {
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    marginBottom: 8,
  },
  startPriceDark: {
    color: "#FFFFFF",
  },
  finalPrice: {
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  finalPriceDark: {
    color: "#FFFFFF",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  location: {
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  locationDark: {
    color: "#FFFFFF",
  },
});
