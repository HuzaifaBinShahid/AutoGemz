import { AuctionListedModal } from "../components/modals/AuctionListedModal";
import { AutoBidSettings } from "../components/schedule/AutoBidSettings";
import { ScheduleCarInfo } from "../components/schedule/ScheduleCarInfo";
import { ScheduleSummary } from "../components/schedule/ScheduleSummary";
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

export default function ScheduleBidScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [minBid, setMinBid] = useState("10,00,00");
  const [maxBid, setMaxBid] = useState("30,00,00");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  const formatBid = (value: string) => {
    return value.replace(/,/g, "");
  };

  const parseBid = (value: string) => {
    const num = parseInt(value.replace(/,/g, "")) || 0;
    return num.toLocaleString("en-IN");
  };

  const handleMinBidDecrease = () => {
    const num = parseInt(formatBid(minBid)) || 0;
    if (num > 10000) {
      setMinBid(parseBid((num - 10000).toString()));
    }
  };

  const handleMinBidIncrease = () => {
    const num = parseInt(formatBid(minBid)) || 0;
    setMinBid(parseBid((num + 10000).toString()));
  };

  const handleMaxBidDecrease = () => {
    const num = parseInt(formatBid(maxBid)) || 0;
    if (num > 10000) {
      setMaxBid(parseBid((num - 10000).toString()));
    }
  };

  const handleMaxBidIncrease = () => {
    const num = parseInt(formatBid(maxBid)) || 0;
    setMaxBid(parseBid((num + 10000).toString()));
  };

  const handleMinBidChange = (text: string) => {
    setMinBid(text);
  };

  const handleMaxBidChange = (text: string) => {
    setMaxBid(text);
  };

  const handleReset = () => {
    setMinBid("10,00,00");
    setMaxBid("30,00,00");
  };

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
          SCHEDULE BID
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScheduleCarInfo
          image={require("../assets/images/AuthBg.png")}
          title="2023 FORD MUSTANG GT"
          year="2017"
          mileage="15000 KM"
          currentHighestBid="PKR 2,850,000"
        />

        <AutoBidSettings
          minBid={minBid}
          maxBid={maxBid}
          onMinBidDecrease={handleMinBidDecrease}
          onMinBidIncrease={handleMinBidIncrease}
          onMaxBidDecrease={handleMaxBidDecrease}
          onMaxBidIncrease={handleMaxBidIncrease}
          onMinBidSet={() => {}}
          onMaxBidSet={() => {}}
          onMinBidChange={handleMinBidChange}
          onMaxBidChange={handleMaxBidChange}
        />

        <ScheduleSummary minBid={minBid} maxBid={maxBid} />
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.8}
          onPress={() => setShowSuccessModal(true)}
        >
          <Text style={styles.confirmText}>CONFIRM SCHEDULE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.resetButton, isDark && styles.resetButtonDark]}
          activeOpacity={0.8}
          onPress={handleReset}
        >
          <Text style={styles.resetText}>RESET</Text>
        </TouchableOpacity>
      </View>

      <AuctionListedModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        heading="BID SCHEDULED SUCCESSFULLY!"
        paragraph={`Your automatic bidding is now active for: Car: Toyota Corolla Altis Grande 2018. The system will place bids between PKR ${minBid.replace(/,/g, ",")} — PKR ${maxBid.replace(/,/g, ",")} until the auction ends or your limit is reached.`}
        primaryButtonText="VIEW BIDS"
        onPrimaryButtonPress={() => {
          setShowSuccessModal(false);
          router.push("/bid");
        }}
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
    paddingHorizontal: 12,
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  bottomButtons: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#DC3729",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  resetButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DC3729",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  resetButtonDark: {
    backgroundColor: "#111111",
  },
  resetText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
    textTransform: "uppercase",
  },
});
