import { AuctionClosedBanner } from "../components/auction/AuctionClosedBanner";
import { AuctionDetails } from "../components/auction/AuctionDetails";
import { AuctionImageCarousel } from "../components/auction/AuctionImageCarousel";
import { AuctionResult } from "../components/auction/AuctionResult";
import { CongratulationsBox } from "../components/auction/CongratulationsBox";
import { FinalRankingTable } from "../components/auction/FinalRankingTable";
import { OutbidBanner } from "../components/auction/OutbidBanner";
import { WinnerBanner } from "../components/auction/WinnerBanner";
import BackArrow from "../components/ui/svgs/BackArrow";
import { useColorScheme } from "../hooks/use-color-scheme";
import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuctions } from "../services/auctions/hooks";
import { useBids } from "../services/bids/hooks";
import { useProfile } from "../services/auth/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React from "react";

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

export default function WinnerScreen() {
  const { vId, auctionId } = useLocalSearchParams<{ vId: string; auctionId: string }>();
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const { data: auctionData, isLoading: isAuctionLoading } = useAuctions({
    limit: 100,
  });
  const { data: bidsData, isLoading: isBidsLoading } = useBids(auctionId);
  const { data: profileData, isLoading: isProfileLoading } = useProfile();

  const auction = auctionData?.data?.results?.find((a: any) => a.id === auctionId || a._id === auctionId);
  const bids = bidsData?.data?.results || [];
  
  const currentUserId = profileData?.data?.id || "";

  const userRank = bids.findIndex((b: any) => b.bidderId?._id === currentUserId || b.bidderId?.id === currentUserId || b.bidderId === currentUserId) + 1;
  const isAuctionClosed = auction?.status === "closed" || new Date(auction?.endDate || auction?.endTime) < new Date();
  
  const isWinner = (auction?.winnerId?._id === currentUserId || auction?.winnerId === currentUserId);

  if (!fontsLoaded || isAuctionLoading || isBidsLoading || isProfileLoading) {
    return (
      <View style={[styles.container, isDark && styles.containerDark, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color="#DC3729" size="large" />
      </View>
    );
  }

  const vehicle = auction?.vehicles?.find((v: any) => v.vehicleId?._id === vId || v.vehicleId?.id === vId || v.vehicleId === vId)?.vehicleId;
  const vehicleData = typeof vehicle === 'object' ? vehicle : null;

  const images = vehicleData?.images || carImages;

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
        {isAuctionClosed && !isWinner && <OutbidBanner />}
        {isWinner && <WinnerBanner />}
        <AuctionImageCarousel images={images} />
        {isWinner && (
          <TouchableOpacity
            onPress={() => router.push({
              pathname: "/detail",
              params: { id: vId }
            })}
            style={styles.viewDetailsLink}
          >
            <Text style={styles.viewDetailsText}>VIEW CAR DETAILS</Text>
          </TouchableOpacity>
        )}
        <AuctionDetails
          title={auction?.title || vehicleData?.name || "AUCTION CAR"}
          startPrice={(auction?.startingPrice || 0).toLocaleString()}
          finalPrice={(auction?.currentBid || 0).toLocaleString()}
          location={vehicleData?.location || "Unknown"}
        />
        <FinalRankingTable isWinner={isWinner} bids={bids} currentUserId={currentUserId} />
        {isAuctionClosed && !isWinner && <AuctionClosedBanner bidAmount={bids.find((b: any) => b.bidderId?._id === currentUserId || b.bidderId?.id === currentUserId || b.bidderId === currentUserId)?.bidAmount?.toLocaleString() || "0"} rank={userRank} />}
        {isWinner && <CongratulationsBox />}
        <AuctionResult auction={auction} bids={bids} />
      </ScrollView>
      <View style={[styles.bottomButtons, isDark && styles.bottomButtonsDark]}>
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
    paddingVertical: 24,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#D8D8D8",
  },
  bottomButtonsDark: {
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
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  viewUpcomingText: {
    fontSize: 12,
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
    fontSize: 12,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
    textTransform: "uppercase",
  },
});
