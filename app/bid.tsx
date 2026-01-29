import { AuctionDetails } from "../components/auction/AuctionDetails";
import { AuctionImageCarousel } from "../components/auction/AuctionImageCarousel";
import { BidCountdownBanner } from "../components/auction/BidCountdownBanner";
import { BidRankTable } from "../components/auction/BidRankTable";
import { YourBidSection } from "../components/auction/YourBidSection";
import BackArrow from "../components/ui/svgs/BackArrow";
import { useColorScheme } from "../hooks/use-color-scheme";
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
  require("../assets/images/AuthBg.png"),
  require("../assets/images/AuthBg.png"),
  require("../assets/images/AuthBg.png"),
  require("../assets/images/AuthBg.png"),
  require("../assets/images/AuthBg.png"),
  require("../assets/images/AuthBg.png"),
  require("../assets/images/AuthBg.png"),
  require("../assets/images/AuthBg.png"),
  require("../assets/images/AuthBg.png"),
  require("../assets/images/AuthBg.png"),
  require("../assets/images/AuthBg.png"),
];

export default function BidScreen() {
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
          BID
        </Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <BidCountdownBanner hours={1} minutes={59} seconds={59} />
        <AuctionImageCarousel images={carImages} />
        <AuctionDetails
          title="2023 FORD MUSTANG GT"
          startPrice="12,0000"
          finalPrice="Open for Bidding"
          location="Lohare"
        />
        <BidRankTable />
        <YourBidSection />
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
    flex: 1,
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
});
