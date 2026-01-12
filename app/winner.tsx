import { AuctionClosedBanner } from "@/components/auction/AuctionClosedBanner";
import { AuctionDetails } from "@/components/auction/AuctionDetails";
import { AuctionImageCarousel } from "@/components/auction/AuctionImageCarousel";
import { AuctionResult } from "@/components/auction/AuctionResult";
import { CongratulationsBox } from "@/components/auction/CongratulationsBox";
import { FinalRankingTable } from "@/components/auction/FinalRankingTable";
import { OutbidBanner } from "@/components/auction/OutbidBanner";
import { WinnerBanner } from "@/components/auction/WinnerBanner";
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

export default function WinnerScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isWinner = false;

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
          <BackArrow />
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backText, isDark && styles.backTextDark]}>
            BACK
          </Text>
        </TouchableOpacity>
        <View style={styles.placeholder} />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {isWinner ? <WinnerBanner /> : <OutbidBanner />}
        <AuctionImageCarousel images={carImages} />
        {isWinner && (
          <TouchableOpacity
            onPress={() => router.push("/detail")}
            style={styles.viewDetailsLink}
          >
            <Text style={styles.viewDetailsText}>VIEW CAR DETAILS</Text>
          </TouchableOpacity>
        )}
        <AuctionDetails
          title="2023 FORD MUSTANG GT"
          startPrice="12,0000"
          finalPrice="12,0000"
          location="Lohare"
        />
        <FinalRankingTable isWinner={isWinner} />
        {isWinner ? <CongratulationsBox /> : <AuctionClosedBanner bidAmount="16,000" rank={2} />}
        <AuctionResult />
      </ScrollView>
      <View style={styles.bottomButtons}>
        {isWinner ? (
          <>
            <TouchableOpacity style={styles.payNowButton}>
              <Text style={styles.payNowText}>PAY NOW</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.viewDetailsButton}
              onPress={() => router.push("/detail")}
            >
              <Text style={styles.viewDetailsButtonText}>VIEW CAR DETAILS</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.viewUpcomingButton}>
              <Text style={styles.viewUpcomingText}>VIEW UPCOMING CARS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.setAlertsButton, isDark && styles.setAlertsButtonDark]}
            >
              <Text style={styles.setAlertsText}>SET ALERTS</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8D8D8",
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
  backText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
  },
  backTextDark: {
    color: "#FFFFFF",
  },
  placeholder: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  viewDetailsLink: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  viewDetailsText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
    textTransform: "uppercase",
    marginVertical: 16,
  },
  bottomButtons: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#494949",
  },
  payNowButton: {
    flex: 1,
    backgroundColor: "#DC3729",
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  payNowText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  viewDetailsButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DC3729",
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  viewDetailsButtonText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
    textTransform: "uppercase",
  },
  viewUpcomingButton: {
    flex: 1,
    backgroundColor: "#DC3729",
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  viewUpcomingText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  setAlertsButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DC3729",
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  setAlertsButtonDark: {
    backgroundColor: "#000000",
  },
  setAlertsText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
    textTransform: "uppercase",
  },
});
