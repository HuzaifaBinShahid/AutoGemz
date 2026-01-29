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
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
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

const dummyCars: AuctionCar[] = [
  {
    id: "1",
    image: require("../assets/images/AuthBg.png"),
    title: "2023 FORD MUSTANG GT",
    status: "ending_soon",
    timeRemaining: "0D 5H 0S",
    bidders: 12,
    year: "2017",
    mileage: "15000 KM",
    currentBid: "12,00,00",
    startingPrice: "12,00,00",
  },
  {
    id: "2",
    image: require("../assets/images/AuthBg.png"),
    title: "2023 FORD MUSTANG GT",
    status: "won",
    bidders: 8,
    year: "2019",
    mileage: "25000 KM",
    currentBid: "15,00,00",
    startingPrice: "10,00,00",
  },
  {
    id: "3",
    image: require("../assets/images/AuthBg.png"),
    title: "2023 FORD MUSTANG GT",
    status: "scheduled",
    bidders: 5,
    year: "2020",
    mileage: "30000 KM",
    currentBid: "18,00,00",
    startingPrice: "15,00,00",
  },
];

export default function MyAuctionCarsScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [activeTab, setActiveTab] = useState<TabType>("all");

  if (!fontsLoaded) {
    return null;
  }

  const filteredCars = dummyCars.filter((car) => {
    if (activeTab === "all") return true;
    if (activeTab === "won") return car.status === "won";
    if (activeTab === "lost") return car.status !== "won" && car.status !== "scheduled";
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

      <FlatList
        data={filteredCars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <MyAuctionCarCard
              image={item.image}
              title={item.title}
              status={item.status}
              timeRemaining={item.timeRemaining}
              bidders={item.bidders}
              year={item.year}
              mileage={item.mileage}
              currentBid={item.currentBid}
              startingPrice={item.startingPrice}
              onPress={() => router.push("/detail")}
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
});
