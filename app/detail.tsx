import { AuctionDetails } from "../components/auction/AuctionDetails";
import { AuctionImageCarousel } from "../components/auction/AuctionImageCarousel";
import { BidCountdownBanner } from "../components/auction/BidCountdownBanner";
import { CarDetailsTable } from "../components/auction/CarDetailsTable";
import { CarInspection } from "../components/auction/CarInspection";
import { InfoSection } from "../components/auction/InfoSection";
import { SpecifiedFeatures } from "../components/auction/SpecifiedFeatures";
import { BidNowButton } from "../components/auction/BidNowButton";
import BackArrow from "../components/ui/svgs/BackArrow";
import { useColorScheme } from "../hooks/use-color-scheme";
import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSellingVehicle } from "../services/vehicles/hooks";

export default function DetailScreen() {
  const { id, auctionId } = useLocalSearchParams<{ id: string; auctionId: string }>();
  const { data, isLoading, isError } = useSellingVehicle(id as string);
  const vehicle = data?.data;

  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  if (!fontsLoaded || isLoading) {
    return (
      <View style={[styles.loadingContainer, isDark && styles.containerDark]}>
        <ActivityIndicator size="large" color="#DC3729" />
      </View>
    );
  }

  if (isError || !vehicle) {
    return (
      <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <BackArrow />
          </TouchableOpacity>
          <Text style={[styles.headerText, isDark && styles.headerTextDark]}>
            Error
          </Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
            Failed to load vehicle details.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const carImages = vehicle.images?.length > 0 
    ? vehicle.images 
    : [require("../assets/images/AuthBg.png")];

  return (
    <SafeAreaView
      style={[styles.container, isDark && styles.containerDark]}
      edges={["top"]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={[styles.headerText, isDark && styles.headerTextDark]}>
          DETAIL
        </Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <BidCountdownBanner hours={1} minutes={59} seconds={39} />
        <AuctionImageCarousel images={carImages} />
        <AuctionDetails
          title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`.toUpperCase()}
          startPrice={vehicle.price ? vehicle.price.toString() : "N/A"}
          finalPrice="Open for Bidding"
          location={vehicle.city || "Dubai"}
        />
        <CarInspection />
        <CarDetailsTable />
        <TouchableOpacity
          style={[styles.loadMoreButton, isDark && styles.loadMoreButtonDark]}
          onPress={() => router.push("/car-inspection-report")}
          activeOpacity={0.8}
        >
          <Text style={[styles.loadMoreText, isDark && styles.loadMoreTextDark]}>
            Load More
          </Text>
        </TouchableOpacity>
        <InfoSection
          title="CAR SPECIFICATION"
          items={[
            { label: "Make", value: vehicle.make },
            { label: "Model", value: vehicle.model },
            { label: "Year", value: vehicle.year.toString() },
            { label: "Transmission", value: vehicle.transmission },
            { label: "Mileage", value: `${vehicle.mileage?.toLocaleString()} km` },
            { label: "VIN", value: vehicle.vin },
            { label: "City", value: vehicle.city },
            { label: "Category", value: vehicle.type, highlight: true },
          ]}
        />
        <InfoSection
          title="OWNERSHIP INFORMATION"
          items={[
            { label: "Mobile", value: vehicle.mobileNumber },
            { label: "Whatsapp Contact", value: vehicle.allowWhatpsAppContact ? "Yes" : "No" },
            { label: "Free Inspection", value: vehicle.freeinspectionRequest ? "Yes" : "No" },
          ]}
        />
        <SpecifiedFeatures />
        <BidNowButton 
          onPress={() => router.push({
            pathname: "/bid",
            params: { vId: id, auctionId }
          })}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  containerDark: {
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
  },
  headerTextDark: {
    color: "#FFFFFF",
  },
  placeholder: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    textAlign: "center",
  },
  emptyTextDark: {
    color: "#FFFFFF",
  },
  loadMoreButton: {
    alignSelf: "center",
    marginVertical: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#DC3729",
    backgroundColor: "#FFFFFF",
  },
  loadMoreButtonDark: {
    backgroundColor: "#111111",
  },
  loadMoreText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
    textTransform: "uppercase",
  },
  loadMoreTextDark: {
    color: "#DC3729",
  },
});
