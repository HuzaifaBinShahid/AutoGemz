import { BottomNav } from "../components/home/BottomNav";
import { AuctionBottomSheet } from "../components/home/AuctionBottomSheet";
import { SortByBottomSheet } from "../components/modals/SortByBottomSheet";
import FiltersIcon from "../components/ui/svgs/FiltersIcon";
import NotificationsListIcon from "../components/ui/svgs/NotificationsListIcon";
import { useColorScheme } from "../hooks/use-color-scheme";
import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
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

const notifications = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "10:35 PM",
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "10:35 PM",
  },
  {
    id: 3,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "10:35 PM",
  },
  {
    id: 4,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "10:35 PM",
  },
];

export default function NotificationsScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showAuctionSheet, setShowAuctionSheet] = useState(false);
  const [showSortSheet, setShowSortSheet] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={[styles.container, isDark && styles.containerDark]}
      edges={["top"]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>
          NOTIFICATION
        </Text>
        <TouchableOpacity onPress={() => setShowSortSheet(true)}>
          <FiltersIcon />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, isDark && styles.contentDark]}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((notification, index) => (
          <View
            key={notification.id}
            style={[
              styles.notificationItem,
              isDark && styles.notificationItemDark,
              index === notifications.length - 1 && styles.lastItem,
            ]}
          >
            <NotificationsListIcon />
            <View style={styles.notificationContent}>
              <Text
                style={[
                  styles.notificationText,
                  isDark && styles.notificationTextDark,
                ]}
              >
                {notification.text}
              </Text>
              <Text
                style={[
                  styles.notificationTime,
                  isDark && styles.notificationTimeDark,
                ]}
              >
                {notification.time}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <BottomNav onAuctionPress={() => setShowAuctionSheet(true)} activeTab="notification" />
      <AuctionBottomSheet
        visible={showAuctionSheet}
        onClose={() => setShowAuctionSheet(false)}
      />
      <SortByBottomSheet
        visible={showSortSheet}
        onClose={() => setShowSortSheet(false)}
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  headerDark: {
    backgroundColor: "#000000",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
  },
  headerTitleDark: {
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: 16,
    paddingBottom: 40,
    backgroundColor: "#FFFFFF",
  },
  contentDark: {
    backgroundColor: "#000000",
  },
  notificationItem: {
    flexDirection: "row",
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    marginHorizontal: "5%",
    width: "90%",
    alignSelf: "center",
  },
  notificationItemDark: {
    backgroundColor: "#111111",
    borderBottomColor: "#737779",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    marginBottom: 8,
    lineHeight: 20,
  },
  notificationTextDark: {
    color: "#FFFFFF",
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#ABABAB",
    textAlign: "right",
  },
  notificationTimeDark: {
    color: "#ABABAB",
  },
});
