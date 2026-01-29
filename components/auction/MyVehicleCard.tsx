import { useColorScheme } from "../../hooks/use-color-scheme";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemedCalendarIcon from "../ui/svgs/ThemedCalendarIcon";
import ThemedMeterIcon from "../ui/svgs/ThemedMeterIcon";
import { SellingVehicle } from "../../services/vehicles";

interface MyVehicleCardProps {
  vehicle: SellingVehicle;
  onPress?: () => void;
}

export function MyVehicleCard({ vehicle, onPress }: MyVehicleCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const imageUri = vehicle.images?.[0] ?? null;
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`.toUpperCase();
  const typeLabel = vehicle.type === "3step" ? "3 Step" : "Instant";

  return (
    <TouchableOpacity
      style={[styles.container, isDark && styles.containerDark]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : require("../../assets/images/icon.png")
          }
          style={styles.image}
          contentFit="cover"
        />
        <View style={styles.typeBadge}>
          <Text style={styles.typeBadgeText}>{typeLabel}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <View style={styles.titleContainer}>
            <View style={styles.redLine} />
            <Text style={[styles.title, isDark && styles.titleDark]} numberOfLines={1}>
              {title}
            </Text>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <ThemedCalendarIcon />
            <Text style={[styles.detailText, isDark && styles.detailTextDark]}>
              {vehicle.year}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <ThemedMeterIcon />
            <Text style={[styles.detailText, isDark && styles.detailTextDark]}>
              {vehicle.mileage} KM
            </Text>
          </View>
        </View>

        <Text style={[styles.cityText, isDark && styles.cityTextDark]}>
          {vehicle.city}
          {vehicle.state ? `, ${vehicle.state}` : ""}
        </Text>

        {vehicle.type === "3step" && vehicle.price != null && (
          <Text style={[styles.priceText, isDark && styles.priceTextDark]}>
            RS: {vehicle.price.toLocaleString()}
          </Text>
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
  typeBadge: {
    position: "absolute",
    top: 24,
    left: 24,
    backgroundColor: "#DC3729",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  typeBadgeText: {
    fontSize: 12,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  content: {
    padding: 16,
  },
  titleRow: {
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  detailsRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 8,
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
  cityText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    marginBottom: 4,
  },
  cityTextDark: {
    color: "#FFFFFF",
  },
  priceText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
  },
  priceTextDark: {
    color: "#DC3729",
  },
});
