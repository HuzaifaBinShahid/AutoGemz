import { useColorScheme } from "../../hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TotalAmount from "../../components/ui/svgs/TotalAmount";
import RemainingAmountIcon from "../../components/ui/svgs/RemainingAmountIcon";
import ReturnsIcon from "../../components/ui/svgs/ReturnsIcon";

interface AccountSummaryCardProps {
  label: string;
  amount: string;
  icon: React.ReactNode;
}

function AccountCard({ label, amount, icon }: AccountSummaryCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.card, isDark && styles.cardDark]}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={[styles.label, isDark && styles.labelDark]}>{label}</Text>
      <Text style={[styles.amount, isDark && styles.amountDark]}>{amount}</Text>
    </View>
  );
}

export function AccountSummaryCard() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isDark && styles.titleDark]}>Your Account</Text>
      <View style={styles.cardsContainer}>
        <AccountCard
          label="Total Amount"
          amount="PKR 1,250,000"
          icon={<TotalAmount />}
        />
        <AccountCard
          label="Remaining"
          amount="PKR 250,000"
          icon={<RemainingAmountIcon />}
        />
        <AccountCard
          label="Returns"
          amount="PKR 50,000"
          icon={<ReturnsIcon />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    marginBottom: 16,
  },
  titleDark: {
    color: "#FFFFFF",
  },
  cardsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
    position: "relative",
    paddingTop: 24,
  },
  cardDark: {
    backgroundColor: "#231F20",
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  label: {
    fontSize: 8,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    marginBottom: 8,
  },
  labelDark: {
    color: "#FFFFFF",
  },
  amount: {
    fontSize: 10,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
  },
  amountDark: {
    color: "#FFFFFF",
  },
});
