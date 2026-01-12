
import React, { useState } from "react";
import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { BottomNav } from "@/components/home/BottomNav";
import { useColorScheme } from "@/hooks/use-color-scheme";
import FiltersIcon from "@/components/ui/svgs/FiltersIcon";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import ThemedSearchIcon from "@/components/ui/svgs/ThemedSearchIcon";
import { AuctionBottomSheet } from "@/components/home/AuctionBottomSheet";
import { useRouter } from "expo-router";

const popularSearches = [
  "Suzuki",
  "Toyota",
  "Honda",
  "Daihatsu",
  "Nissan",
  "Hyundai",
  "KIA",
  "Mitsubishi",
  "Changan",
];

export default function SearchScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const [showAuctionSheet, setShowAuctionSheet] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={[styles.container, isDark && styles.containerDark]}
      edges={["top"]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchBarContainer}>
          <View style={[styles.searchContainer, isDark && styles.searchContainerDark]}>
            <ThemedSearchIcon />
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Search Car Auction"
              placeholderTextColor={isDark ? "#A5A5A5" : "#A5A5A5"}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => router.push("/filters")}
          >
            <FiltersIcon />
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
          Popular Searches
        </Text>

        <View style={[styles.listContainer, isDark && styles.listContainerDark]}>
          {popularSearches.map((brand, index) => (
            <View key={brand}>
              <TouchableOpacity style={styles.listItem}>
                <Text style={[styles.listItemText, isDark && styles.listItemTextDark]}>
                  {brand}
                </Text>
              </TouchableOpacity>
              {index < popularSearches.length - 1 && (
                <View style={[styles.separator, isDark && styles.separatorDark]} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomNav onAuctionPress={() => setShowAuctionSheet(true)} activeTab="search" />
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
    backgroundColor: "#111111",
  },
  containerDark: {
    backgroundColor: "#000000",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  searchBarContainer: {
    flexDirection: "row",
    marginBottom: 32,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 12,
  },
  searchContainerDark: {
    backgroundColor: "#111111",
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  inputDark: {
    color: "#FFFFFF",
  },
  filterButton: {
    width: 46,
    height: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    marginBottom: 16,
  },
  sectionTitleDark: {
    color: "#FFFFFF",
  },
  listContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  listContainerDark: {
    backgroundColor: "#111111",
  },
  listItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  listItemText: {
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  listItemTextDark: {
    color: "#FFFFFF",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginLeft: 16,
  },
  separatorDark: {
    backgroundColor: "#737779",
  },
});
