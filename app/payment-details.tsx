import { BuyerInformationCard } from "@/components/payments/BuyerInformationCard";
import { PaymentBreakdownCard } from "@/components/payments/PaymentBreakdownCard";
import { PaymentDetailsCard } from "@/components/payments/PaymentDetailsCard";
import BackArrow from "@/components/ui/svgs/BackArrow";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
    ChakraPetch_600SemiBold,
    useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentDetailsScreen() {
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
          PAYMENT DETAILS
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <PaymentDetailsCard
          image={require("@/assets/images/AuthBg.png")}
          title="2023 FORD MUSTANG GT"
          transactionId="TXN-29384"
          date="02 Nov 2025"
          amount="PKR 850,000"
          status="paid"
          make="Toyota"
          year="2018"
          transmission="Automatic"
          model="Corolla Altis Grande"
          mileage="72,000 km"
          registration="Lahore"
        />

        <PaymentBreakdownCard
          totalAmount="PKR 850,000"
          amountPaid="PKR 850,000"
          returnAmount="PKR 50,000"
          remainingBalance="PKR 0"
          paymentMethod="Bank Transfer"
          referenceNumber="REF-11245"
        />

        <BuyerInformationCard
          name="AutoHaus Motors"
          contact="03XXXXXXXXX"
          city="Lahore"
          email="autohaus@example.com"
        />
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.downloadButton}
          activeOpacity={0.8}
        >
          <Text style={styles.downloadText}>DOWNLOAD RECEIPT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewDetailsButton, isDark && styles.viewDetailsButtonDark]}
          activeOpacity={0.8}
        >
          <Text style={styles.viewDetailsText}>VIEW DETAILS</Text>
        </TouchableOpacity>
      </View>
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
  downloadButton: {
    flex: 1,
    backgroundColor: "#DC3729",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  downloadText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  viewDetailsButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DC3729",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  viewDetailsButtonDark: {
    backgroundColor: "#111111",
  },
  viewDetailsText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
    textTransform: "uppercase",
  },
});
