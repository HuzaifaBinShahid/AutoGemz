import AuctionNowIcon from "@/components/ui/svgs/AuctionNowIcon";
import ThemedHomeIcon from "@/components/ui/svgs/ThemedHomeIcon";
import ThemedMoreIcon from "@/components/ui/svgs/ThemedMoreIcon";
import ThemedNotificationIcon from "@/components/ui/svgs/ThemedNotificationIcon";
import ThemedSearchIconNav from "@/components/ui/svgs/ThemedSearchIconNav";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BottomNavProps {
  onAuctionPress?: () => void;
  activeTab?: "home" | "notification" | "search";
}

export function BottomNav({ onAuctionPress, activeTab = "home" }: BottomNavProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <LinearGradient
        colors={["#FF6B3515", "#FF6B3500", "#FF6B3500", "#FF6B3515"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
        pointerEvents="none"
      />
      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)")}>
        <ThemedHomeIcon active={activeTab === "home"} />
        <Text style={[styles.navText, activeTab === "home" && styles.activeNavText, activeTab !== "home" && isDark && styles.navTextDark]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/search")}>
        <ThemedSearchIconNav active={activeTab === "search"} />
        <Text style={[styles.navText, activeTab === "search" && styles.activeNavText, activeTab !== "search" && isDark && styles.navTextDark]}>
          Search
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.auctionButton} onPress={onAuctionPress}>
        <AuctionNowIcon />
        <Text style={[styles.auctionText, isDark && styles.auctionTextDark]}>
          Auction Now
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/notifications")}>
        <ThemedNotificationIcon active={activeTab === "notification"} />
        <Text style={[styles.navText, activeTab === "notification" && styles.activeNavText, activeTab !== "notification" && isDark && styles.navTextDark]}>
          Notification
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <ThemedMoreIcon />
        <Text style={[styles.navText, isDark && styles.navTextDark]}>More</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "relative",
  },
  containerDark: {
    backgroundColor: "#3636364D",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: {
    alignItems: "center",
    gap: 8,
    marginHorizontal: 10,
  },
  navText: {
    fontSize: 11,
    fontFamily: "Mulish_400Regular",
    color: "#475569",
  },
  navTextDark: {
    color: "#A5A5A5",
  },
  activeNavText: {
    color: "#DC3729",

  },
  auctionButton: {
    alignItems: "center",
    position: "relative",
    top: -45,
  },
  auctionText: {
    fontSize: 10,
    fontFamily: "Mulish_400Regular",
    color: "#475569",
  },
  auctionTextDark: {
    color: "#A5A5A5",
  },
});
