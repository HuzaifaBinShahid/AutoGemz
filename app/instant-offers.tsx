import { CarDetailsCard } from "../components/offers/CarDetailsCard";
import { NoOffersCard } from "../components/offers/NoOffersCard";
import { OfferCard } from "../components/offers/OfferCard";
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
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TabType = "all" | "offers" | "no_offers";

interface Offer {
  id: string;
  offerNumber: number;
  dealerName: string;
  offerPrice: string;
  responseTime: string;
}

const dummyOffers: Offer[] = [
  {
    id: "1",
    offerNumber: 1,
    dealerName: "AutoHaus Motors",
    offerPrice: "12,00,00",
    responseTime: "10 mins ago",
  },
  {
    id: "2",
    offerNumber: 2,
    dealerName: "Premium Cars",
    offerPrice: "11,50,00",
    responseTime: "25 mins ago",
  },
];

export default function InstantOffersScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [hasOffers] = useState(true);

  if (!fontsLoaded) {
    return null;
  }

  const filteredOffers = dummyOffers.filter((offer) => {
    if (activeTab === "all") return true;
    if (activeTab === "offers") return true;
    if (activeTab === "no_offers") return false;
    return true;
  });

  const showNoOffers = activeTab === "no_offers" || (!hasOffers && activeTab === "all");

  const tabs: { key: TabType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "offers", label: "Offers" },
    { key: "no_offers", label: "No Offers" },
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
        <View style={styles.headerContent}>
          <Text style={[styles.headerText, isDark && styles.headerTextDark]}>
            INSTANT OFFERS
          </Text>
          <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
            View offers from verified dealers based on your car details.
          </Text>
        </View>
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

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CarDetailsCard
          image={require("../assets/images/AuthBg.png")}
          title="2023 FORD MUSTANG GT"
          description="First owner, well-maintained, original paint, genuine parts, and regularly serviced."
          make="Toyota"
          year="2018"
          transmission="Automatic"
          model="Corolla Altis Grande"
          mileage="72,000 km"
          registration="Lahore"
        />

        {showNoOffers ? (
          <NoOffersCard />
        ) : (
          filteredOffers.map((offer) => (
            <View key={offer.id} style={styles.offerWrapper}>
              <OfferCard
                offerNumber={offer.offerNumber}
                dealerName={offer.dealerName}
                offerPrice={offer.offerPrice}
                responseTime={offer.responseTime}
                onViewDetails={() => console.log("View details")}
                onAcceptOffer={() => console.log("Accept offer")}
              />
            </View>
          ))
        )}
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
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerContent: {
    flex: 1,
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
  subtitle: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    lineHeight: 20,
  },
  subtitleDark: {
    color: "#FFFFFF",
  },
  placeholder: {
    width: 24,
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  offerWrapper: {
    marginHorizontal: 24,
  },
});
