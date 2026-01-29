import { useColorScheme } from "../hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import MyAuctionCars from "../components/ui/svgs/MyAuctionCars";
import DealerOffers from "../components/ui/svgs/DealerOffers";
import PaymentReciepts from "../components/ui/svgs/PaymentReciepts";
import ScheduleBidIcon from "../components/ui/svgs/ScheduleBidIcon";
import HelpIcon from "../components/ui/svgs/HelpIcon";
import RightArrow from "../components/ui/svgs/RightArrow";
import { BottomNav } from "../components/home/BottomNav";
import { AuctionListedModal } from "../components/modals/AuctionListedModal";
import { StatusBar } from "expo-status-bar";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
}

export default function MoreScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showAuctionSheet, setShowAuctionSheet] = useState(false);

  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      id: "1",
      label: "My Auction Cars",
      icon: <MyAuctionCars />,
      onPress: () => router.push("/my-auction-cars"),
    },
    {
      id: "1b",
      label: "My Vehicle",
      icon: <MyAuctionCars />,
      onPress: () => router.push("/my-vehicles"),
    },
    {
      id: "2",
      label: "Dealer Instant Offers",
      icon: <DealerOffers />,
      onPress: () => router.push("/instant-offers"),
    },
    {
      id: "3",
      label: "Payments & Receipts",
      icon: <PaymentReciepts />,
      onPress: () => router.push("/payments-receipts"),
    },
    {
      id: "4",
      label: "Scheduled Bid",
      icon: <ScheduleBidIcon />,
      onPress: () => router.push("/schedule-bid"),
    },
    {
      id: "5",
      label: "Help",
      icon: <HelpIcon />,
    },
  ];

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
        <View style={[styles.profileSection]}>
          <Image
            source={require("../assets/images/AuthBg.png")}
            style={styles.avatar}
          />
          <Text style={[styles.name, isDark && styles.nameDark]}>
            Arron Gray
          </Text>
          <Text style={[styles.email, isDark && styles.emailDark]}>
            arrongray@gmail.com
          </Text>
        </View>
        <View style={[styles.menuContainer, isDark && styles.menuContainerDark]}>
          {menuItems.map((item, index) => (
            <View key={item.id}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <View style={styles.menuItemLeft}>
                  {item.icon}
                  <Text style={[styles.menuLabel, isDark && styles.menuLabelDark]}>
                    {item.label}
                  </Text>
                </View>
                <RightArrow />
              </TouchableOpacity>
              {index < menuItems.length - 1 && (
                <View
                  style={[
                    styles.divider,
                    isDark && styles.dividerDark,
                  ]}
                />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomNav
        onAuctionPress={() => setShowAuctionSheet(true)}
        activeTab="more"
      />
      <AuctionListedModal
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
    backgroundColor: "#000000",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    marginBottom: 8,
  },
  nameDark: {
    color: "#FFFFFF",
  },
  email: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  emailDark: {
    color: "#FFFFFF",
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    borderRadius: 8,
    overflow: "hidden",
  },
  menuContainerDark: {
    backgroundColor: "#111111",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  menuLabel: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  menuLabelDark: {
    color: "#FFFFFF",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginLeft: 16,
  },
  dividerDark: {
    backgroundColor: "#494949",
  },
});
