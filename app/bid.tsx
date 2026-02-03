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
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useAuctions } from "../services/auctions/hooks";
import { useBids } from "../services/bids/hooks";
import { ActivityIndicator } from "react-native";
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
  const { id, vId, auctionId } = useLocalSearchParams<{ id: string; vId: string; auctionId: string }>();
  const resolvedVehicleId = vId || id;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const { data: auctionData, isLoading: isAuctionLoading } = useAuctions({ 
    isActive: true 
  }); 
  // Finding the specific auction and vehicle details
  const auction = auctionData?.data?.results?.find((a: any) => (a.id === auctionId || a._id === auctionId));
  const vehicle = auction?.vehicles?.find((v: any) => {
    const vid = v.vehicleId?._id || v.vehicleId?.id || v.vehicleId;
    return vid === resolvedVehicleId;
  });
  const vehicleData = typeof vehicle?.vehicleId === "object" ? vehicle.vehicleId : null;

  const { data: bidsData } = useBids(auctionId as string, { vehicleId: resolvedVehicleId as string });

  if (!fontsLoaded || isAuctionLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDark ? 'black' : 'white' }}>
        <ActivityIndicator color="#DC3729" size="large" />
      </View>
    );
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
        <BidCountdownBanner endDate={auction?.endDate || auction?.endTime} />
        <AuctionImageCarousel images={vehicleData?.images?.length ? vehicleData.images : carImages} />
        <AuctionDetails
          title={auction?.title || `${vehicleData?.year} ${vehicleData?.make} ${vehicleData?.model}`.toUpperCase()}
          startPrice={(vehicle?.minimumBidAmount || vehicleData?.price || 0).toLocaleString()}
          finalPrice={bidsData?.data?.results?.[0]?.bidAmount ? `RS ${bidsData.data.results[0].bidAmount.toLocaleString()}` : "Open for Bidding"}
          location={vehicleData?.city || "Dubai"}
        />
        <BidRankTable bids={bidsData?.data?.results || []} />
        <YourBidSection 
          auctionId={auctionId} 
          vehicleId={resolvedVehicleId} 
          minBid={vehicle?.minimumBidAmount || vehicleData?.price || 0} 
          increment={vehicle?.bidIncrement || 1000} 
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
