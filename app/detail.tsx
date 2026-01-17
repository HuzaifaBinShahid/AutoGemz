import { AuctionDetails } from "@/components/auction/AuctionDetails";
import { AuctionImageCarousel } from "@/components/auction/AuctionImageCarousel";
import { BidCountdownBanner } from "@/components/auction/BidCountdownBanner";
import { CarDetailsTable } from "@/components/auction/CarDetailsTable";
import { CarInspection } from "@/components/auction/CarInspection";
import { InfoSection } from "@/components/auction/InfoSection";
import { SpecifiedFeatures } from "@/components/auction/SpecifiedFeatures";
import { BidNowButton } from "@/components/auction/BidNowButton";
import BackArrow from "@/components/ui/svgs/BackArrow";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const carImages = [
  require("@/assets/images/AuthBg.png"),
  require("@/assets/images/AuthBg.png"),
  require("@/assets/images/AuthBg.png"),
  require("@/assets/images/AuthBg.png"),
  require("@/assets/images/AuthBg.png"),
  require("@/assets/images/AuthBg.png"),
  require("@/assets/images/AuthBg.png"),
  require("@/assets/images/AuthBg.png"),
  require("@/assets/images/AuthBg.png"),
  require("@/assets/images/AuthBg.png"),
  require("@/assets/images/AuthBg.png"),
];

export default function DetailScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  if (!fontsLoaded) {
    return null;
  }

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
          title="2023 FORD MUSTANG GT"
          startPrice="12,0000"
          finalPrice="Open for Bidding"
          location="Lohare"
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
            { label: "Registered In", value: "Un-Registered" },
            { label: "Assembly", value: "Imported" },
            { label: "Engine Capacity", value: "660 cc" },
            { label: "Last Updated", value: "Oct 13, 2025" },
            { label: "Color", value: "Gold" },
            { label: "Transmission Type", value: "Yes In Agency" },
            { label: "Ad Ref #", value: "10571601" },
            { label: "Body Type", value: "Hatchback", highlight: true },
          ]}
        />
        <InfoSection
          title="OWNERSHIP INFORMATION"
          items={[
            { label: "Currently financed?", value: "Yes" },
            { label: "No Of Keys", value: "02" },
            { label: "Car Registration City", value: "Texas" },
          ]}
        />
        <SpecifiedFeatures />
        <BidNowButton />
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
