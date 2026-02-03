import { MyVehicleCard } from "../components/auction/MyVehicleCard";
import BackArrow from "../components/ui/svgs/BackArrow";
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
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSellingVehicles } from "../services/vehicles/hooks";

export default function MyVehiclesScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSellingVehicles();

  const results =
    data?.pages.flatMap((p) => p.data?.results ?? []) ?? [];

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
          MY VEHICLES
        </Text>
        <View style={styles.placeholder} />
      </View>

      {isLoading && results.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#DC3729" />
        </View>
      ) : isError ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
            Failed to load vehicles
          </Text>
        </View>
      ) : results.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
            No vehicles yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <MyVehicleCard
                vehicle={item}
                onPress={() => router.push({ pathname: "/detail", params: { id: item.id } })}
              />
            </View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color="#DC3729" />
              </View>
            ) : null
          }
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  emptyTextDark: {
    color: "#FFFFFF",
  },
  listContent: {
    padding: 24,
    paddingBottom: 40,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: "center",
  },
});
