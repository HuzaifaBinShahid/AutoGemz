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
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SearchBar } from "@/components/home/SearchBar";
import { BrowseTabs } from "@/components/home/BrowseTabs";
import { AuctionCard } from "@/components/home/AuctionCard";
import { NewsCard } from "@/components/home/NewsCard";
import { BottomNav } from "@/components/home/BottomNav";
import { AuctionBottomSheet } from "@/components/home/AuctionBottomSheet";

const auctions = [
  {
    id: 1,
    image: require("@/assets/images/AuthBg.png"),
    title: "2023 FORD MUSTANG GT",
    currentBid: "CURRENT BID RS: 12,00,00",
    timeRemaining: "1D 45H 3S",
    year: "2017",
    mileage: "152,000 km",
    isActive: true,
  },
  {
    id: 2,
    image: require("@/assets/images/AuthBg.png"),
    title: "2022 PORSCHE 911",
    currentBid: "CURRENT BID RS: 15,00,00",
    timeRemaining: "2D 12H 30S",
    year: "2020",
    mileage: "98,000 km",
    isActive: true,
  },
];

const news = [
  {
    id: 1,
    image: require("@/assets/images/AuthBg.png"),
    date: "JULY 14, 2024",
    author: "DREW ADAMS",
    title: "BENEFITS OF REGULAR OIL CHANGES...",
    description: "Stay informed about new car...",
  },
  {
    id: 2,
    image: require("@/assets/images/AuthBg.png"),
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
          <View style={styles.avatar}>
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.avatarImage}
              contentFit="cover"
            />
          </View>
        </View>

        <SearchBar />

        <BrowseTabs />

        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
          CURRENT AUCTIONS
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.auctionsContainer}>
          {auctions.map((auction) => (
            <AuctionCard
              key={auction.id}
              image={auction.image}
              title={auction.title}
              currentBid={auction.currentBid}
              timeRemaining={auction.timeRemaining}
              year={auction.year}
              mileage={auction.mileage}
              isActive={auction.isActive}
            />
          ))}
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
      <BottomNav onAuctionPress={() => setShowAuctionSheet(true)} />
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
    paddingBottom: 100,
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
