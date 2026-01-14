import { AccountSummaryCard } from "@/components/payments/AccountSummaryCard";
import { TransactionCard, TransactionStatus } from "@/components/payments/TransactionCard";
import BackArrow from "@/components/ui/svgs/BackArrow";
import { useColorScheme } from "@/hooks/use-color-scheme";
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

type TabType = "all" | "payable" | "return";

interface Transaction {
  id: string;
  image: any;
  title: string;
  transactionId: string;
  date: string;
  amount: string;
  status: TransactionStatus;
}

const dummyTransactions: Transaction[] = [
  {
    id: "1",
    image: require("@/assets/images/AuthBg.png"),
    title: "2023 FORD MUSTANG GT",
    transactionId: "TXN-29384",
    date: "02 Nov 2025",
    amount: "PKR 850,000",
    status: "paid",
  },
  {
    id: "2",
    image: require("@/assets/images/AuthBg.png"),
    title: "2023 FORD MUSTANG GT",
    transactionId: "TXN-29385",
    date: "01 Nov 2025",
    amount: "PKR 400,000",
    status: "pending",
  },
  {
    id: "3",
    image: require("@/assets/images/AuthBg.png"),
    title: "2023 FORD MUSTANG GT",
    transactionId: "TXN-29386",
    date: "30 Oct 2025",
    amount: "PKR 50,000",
    status: "in_progress",
  },
];

export default function PaymentsReceiptsScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [activeTab, setActiveTab] = useState<TabType>("all");

  if (!fontsLoaded) {
    return null;
  }

  const filteredTransactions = dummyTransactions.filter((transaction) => {
    if (activeTab === "all") return true;
    if (activeTab === "payable") return transaction.status === "pending" || transaction.status === "in_progress";
    if (activeTab === "return") return transaction.status === "paid";
    return true;
  });

  const tabs: { key: TabType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "payable", label: "Payable" },
    { key: "return", label: "Return" },
  ];

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
          PAYMENT & RECEIPTS
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AccountSummaryCard />

        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.activeTabText,
                  activeTab === tab.key && isDark && styles.activeTabTextDark,
                  activeTab !== tab.key && isDark && styles.tabTextDark,
                ]}
              >
                {tab.label}
              </Text>
              {activeTab === tab.key && (
                <View style={styles.tabIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {filteredTransactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            image={transaction.image}
            title={transaction.title}
            transactionId={transaction.transactionId}
            date={transaction.date}
            amount={transaction.amount}
            status={transaction.status}
            onViewReceipt={() => console.log("View receipt")}
            onViewDetails={() => console.log("View details")}
          />
        ))}
      </ScrollView>
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
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 24,
  },
  tab: {
    position: "relative",
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  tabTextDark: {
    color: "#A5A5A5",
  },
  activeTabText: {
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
  },
  activeTabTextDark: {
    color: "#DC3729",
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#DC3729",
  },
});
