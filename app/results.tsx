import { AuctionCard } from "../components/home/AuctionCard";
import BackArrow from "../components/ui/svgs/BackArrow";
import FiltersIcon from "../components/ui/svgs/FiltersIcon";
import ThemedSearchIcon from "../components/ui/svgs/ThemedSearchIcon";
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
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const dummyAuctions = [
  {
    id: 1,
    image: require("../assets/images/AuthBg.png"),
    title: "2023 FORD MUSTANG GT",
    currentBid: "CURRENT BID RS: 12,00,00",
    timeRemaining: "1D 45H 3S",
    year: "2017",
    mileage: "152,000 km",
    isActive: true,
  },
  {
    id: 2,
    image: require("../assets/images/AuthBg.png"),
    title: "2022 PORSCHE 911",
    currentBid: "CURRENT BID RS: 15,00,00",
    timeRemaining: "2D 12H 30S",
    year: "2020",
    mileage: "98,000 km",
    isActive: true,
  },
  {
    id: 3,
    image: require("../assets/images/AuthBg.png"),
    title: "2021 BMW M3",
    currentBid: "CURRENT BID RS: 18,00,00",
    timeRemaining: "3D 20H 15S",
    year: "2019",
    mileage: "75,000 km",
    isActive: true,
  },
  {
    id: 4,
    image: require("../assets/images/AuthBg.png"),
    title: "2020 AUDI A4",
    currentBid: "CURRENT BID RS: 10,00,00",
    timeRemaining: "5D 10H 45S",
    year: "2018",
    mileage: "120,000 km",
    isActive: true,
  },
  {
    id: 5,
    image: require("../assets/images/AuthBg.png"),
    title: "2022 MERCEDES C-CLASS",
    currentBid: "CURRENT BID RS: 14,00,00",
    timeRemaining: "1D 30H 20S",
    year: "2021",
    mileage: "65,000 km",
    isActive: true,
  },
];

export default function ResultsScreen() {
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
          RESULTS
        </Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchInputWrapper,
            isDark && styles.searchInputWrapperDark,
          ]}
        >
          <ThemedSearchIcon />
          <Text
            style={[styles.searchPlaceholder, isDark && styles.searchPlaceholderDark]}
          >
            Search Car Auction
          </Text>
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => router.push("/filters")}
        >
          <FiltersIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.contentHeader}>
        <Text style={[styles.mainTitle, isDark && styles.mainTitleDark]}>
          USED CARS FOR SALE IN PAKISTAN
        </Text>
        <Text style={[styles.resultsCount, isDark && styles.resultsCountDark]}>
          1 - 25 of 65091 Results
        </Text>
      </View>
      <FlatList
        data={dummyAuctions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const screenWidth = Dimensions.get("window").width;
          const cardWidth = screenWidth - 48;
          return (
            <TouchableOpacity
              style={styles.cardWrapper}
              onPress={() => router.push("/detail")}
            >
              <AuctionCard
                image={item.image}
                title={item.title}
                currentBid={item.currentBid}
                timeRemaining={item.timeRemaining}
                year={item.year}
                mileage={item.mileage}
                isActive={item.isActive}
                width={cardWidth}
                darkBorderColor="#FFFFFF0D"
              />
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  containerDark: {
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  searchInputWrapperDark: {
    backgroundColor: "#494949",
  },
  searchPlaceholder: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#A5A5A5",
    flex: 1,
  },
  searchPlaceholderDark: {
    color: "#A5A5A5",
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: "#DC3729",
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 18,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  mainTitleDark: {
    color: "#FFFFFF",
  },
  resultsCount: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    textAlign: "right",
  },
  resultsCountDark: {
    color: "#FFFFFF",
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  cardWrapper: {
    marginBottom: 16,
    width: "100%",
  },
});
