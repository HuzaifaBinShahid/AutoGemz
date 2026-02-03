import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { SearchBar } from "../../components/home/SearchBar";
import { BrowseTabs } from "../../components/home/BrowseTabs";
import { AuctionCard } from "../../components/home/AuctionCard";
import { NewsCard } from "../../components/home/NewsCard";
import { BottomNav } from "../../components/home/BottomNav";
import { AuctionBottomSheet } from "../../components/home/AuctionBottomSheet";
import { useRouter } from "expo-router";
import { useAuctions } from "../../services/auctions/hooks";
import { ActivityIndicator } from "react-native";

// Hardcoded auctions removed

const news = [
  {
    id: 1,
    image: require("../../assets/images/AuthBg.png"),
    date: "JULY 14, 2024",
    author: "DREW ADAMS",
    title: "BENEFITS OF REGULAR OIL CHANGES...",
    description: "Stay informed about new car...",
  },
  {
    id: 2,
    image: require("../../assets/images/AuthBg.png"),
    date: "JULY 15, 2024",
    author: "JANE SMITH",
    title: "ELECTRIC VEHICLES: THE FUTURE...",
    description: "Learn about the latest trends...",
  },
];

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showAuctionSheet, setShowAuctionSheet] = useState(false);
  const router = useRouter();

  const { data: auctionsData, isLoading: isAuctionsLoading } = useAuctions({
    isActive: true,
  });

  const auctions = auctionsData?.data?.results || [];

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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, isDark && styles.greetingDark]}>Hello Arron,</Text>
            <Text style={[styles.welcome, isDark && styles.welcomeDark]}>
              Welcome to AutoGemz
            </Text>
          </View>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => router.push("/profile-settings")}
          >
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.avatarImage}
              contentFit="cover"
            />
          </TouchableOpacity>
        </View>

        <SearchBar />

        <BrowseTabs />

        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
          CURRENT AUCTIONS
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.auctionsContainer}>
          {isAuctionsLoading ? (
            <View style={{ width: 290, height: 150, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator color="#DC3729" />
            </View>
          ) : auctions.length === 0 ? (
            <View style={{ width: 290, height: 150, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: isDark ? '#F4F4F4' : '#494949', fontFamily: 'Mulish_400Regular' }}>No active auctions</Text>
            </View>
          ) : (
            auctions.map((auction) => {
              const vehicle = auction.vehicles?.[0]?.vehicleId;
              const vehicleData = typeof vehicle === 'object' ? vehicle : null;
              const actualVehicleId = vehicleData?._id || vehicleData?.id || vehicle;
              
              return (
                <TouchableOpacity
                  key={auction.id}
                  onPress={() => router.push({
                    pathname: "/bid",
                    params: { 
                      vId: actualVehicleId, 
                      auctionId: auction.id || auction._id 
                    }
                  })}
                >
                  <AuctionCard
                    image={vehicleData?.images?.[0] || require("../../assets/images/AuthBg.png")}
                    title={auction.title || "Auction"}
                    currentBid={`CURRENT BID RS: ${(auction.currentBid || vehicleData?.price || 0).toLocaleString()}`}
                    timeRemaining={formatTimeRemaining(auction.endDate || auction.endTime)}
                    year={vehicleData?.year?.toString() || "—"}
                    mileage={`${(vehicleData?.mileage || 0).toLocaleString()} km`}
                    isActive={auction.isActive}
                  />
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>

        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark, styles.newsTitle]}>
          LATEST NEWS
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.newsContainer}>
          {news.map((item) => (
            <NewsCard
              key={item.id}
              image={item.image}
              date={item.date}
              author={item.author}
              title={item.title}
              description={item.description}
            />
          ))}
        </ScrollView>
      </ScrollView>
      <BottomNav onAuctionPress={() => setShowAuctionSheet(true)} activeTab="home" />
      <AuctionBottomSheet
        visible={showAuctionSheet}
        onClose={() => setShowAuctionSheet(false)}
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
    backgroundColor: "#0F0F0F",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    marginBottom: 4,
  },
  greetingDark: {
    color: "#F4F4F4",
  },
  welcome: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#A5A5A5",
  },
  welcomeDark: {
    color: "#A5A5A5",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    marginBottom: 16,
    textTransform: "uppercase",
  },
  sectionTitleDark: {
    color: "#F4F4F4",
  },
  newsTitle: {
    marginTop: 32,
  },
  auctionsContainer: {
    marginBottom: 16,
  },
  newsContainer: {
    marginBottom: 8,
  },
});
