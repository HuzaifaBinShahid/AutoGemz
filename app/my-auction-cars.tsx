import { AuctionStatus, MyAuctionCarCard } from "../components/auction/MyAuctionCarCard";
import BackArrow from "../components/ui/svgs/BackArrow";
import { useColorScheme } from "../hooks/use-color-scheme";
import {
    ChakraPetch_600SemiBold,
    useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useMyBids } from "../services/auctions/hooks";
import { SafeAreaView } from "react-native-safe-area-context";

type TabType = "all" | "won" | "lost";

interface AuctionCar {
  id: string;
  image: any;
  title: string;
  status: AuctionStatus;
  timeRemaining?: string;
  bidders: number;
  year: string;
  mileage: string;
  currentBid: string;
  startingPrice: string;
}

// Dummy data removed

export default function MyAuctionCarsScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { data, isLoading } = useMyBids();
  const [activeTab, setActiveTab] = useState<TabType>("all");

  if (!fontsLoaded) {
    return null;
  }

  const auctions = data?.data?.results || [];

  const formatTimeRemaining = (endDate: string) => {
    if (!endDate) return "—";
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    if (diff <= 0) return "Ended";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}D ${hours}H ${minutes}M`;
  };

  const filteredCars = auctions.filter((auction) => {
    if (activeTab === "all") return true;
    // Map status properly based on API response
    if (activeTab === "won") return auction.status === "won";
    if (activeTab === "lost") return auction.status === "lost";
    return true;
  });

  const tabs: { key: TabType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "won", label: "Won" },
    { key: "lost", label: "Lost" },
  ];

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
          MY AUCTION CARS
        </Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
                activeTab === tab.key && isDark && styles.activeTabTextDark,
                activeTab !== tab.key && isDark && styles.tabTextDark,
              ]}
            >
              {tab.label}
            </Text>
            {activeTab === tab.key && (
              <View style={styles.tabIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator color="#DC3729" size="large" />
        </View>
      ) : filteredCars.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
            No auctions found
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredCars}
          keyExtractor={(item) => item.id || item._id}
          renderItem={({ item }) => {
            const vehicle = item.vehicles?.[0]?.vehicleId;
            const vehicleData = typeof vehicle === 'object' ? vehicle : null;
            const actualVehicleId = vehicleData?._id || vehicleData?.id || vehicle;

            return (
              <View style={styles.cardWrapper}>
                <MyAuctionCarCard
                  image={vehicleData?.images?.[0] || require("../assets/images/AuthBg.png")}
                  title={item.title || "AUCTION"}
                  status={item.status as AuctionStatus || (item.isActive ? "active" : "ending_soon")}
                  timeRemaining={formatTimeRemaining(item.endDate || item.endTime)}
                  bidders={item.biddersCount || 0}
                  year={vehicleData?.year?.toString() || "—"}
                  mileage={`${(vehicleData?.mileage || 0).toLocaleString()} KM`}
                  currentBid={(item.currentBid || vehicleData?.price || 0).toLocaleString()}
                  startingPrice={(item.startingPrice || 0).toLocaleString()}
                  onPress={() => router.push({
                    pathname: "/winner",
                    params: { vId: actualVehicleId, auctionId: item.id || item._id }
                  })}
                />
              </View>
            );
          }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingTop: 8,
    gap: 24,
  },
  tab: {
    position: "relative",
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  tabTextDark: {
    color: "#A5A5A5",
  },
  activeTabText: {
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
  },
  activeTabTextDark: {
    color: "#DC3729",
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#DC3729",
  },
  listContent: {
    padding: 24,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  emptyTextDark: {
    color: "#A5A5A5",
  },
});
