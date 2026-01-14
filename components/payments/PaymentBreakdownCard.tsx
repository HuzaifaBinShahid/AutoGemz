import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PaymentBreakdownCardProps {
  totalAmount: string;
  amountPaid: string;
  returnAmount: string;
  remainingBalance: string;
  paymentMethod: string;
  referenceNumber: string;
}

export function PaymentBreakdownCard({
  totalAmount,
  amountPaid,
  returnAmount,
  remainingBalance,
  paymentMethod,
  referenceNumber,
}: PaymentBreakdownCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>
        Payment Breakdown
      </Text>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={[styles.label, isDark && styles.labelDark]}>
            Total Amount:
          </Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>
            {totalAmount}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, isDark && styles.labelDark]}>
            Amount Paid:
          </Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>
            {amountPaid}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, isDark && styles.labelDark]}>
            Return:
          </Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>
            {returnAmount}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, isDark && styles.labelDark]}>
            Remaining Balance:
          </Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>
            {remainingBalance}
          </Text>
        </View>
        <View style={[styles.divider, isDark && styles.dividerDark]} />
        <View style={styles.row}>
          <Text style={[styles.label, isDark && styles.labelDark]}>
            Payment Method:
          </Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>
            {paymentMethod}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, isDark && styles.labelDark]}>
            Reference #:
          </Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>
            {referenceNumber}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 12,
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
  },
  containerDark: {
    backgroundColor: "#111111",
  },
  title: {
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "black",
    marginBottom: 16,
  },
  titleDark: {
    color: "#FFFFFF",
  },
  content: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  labelDark: {
    color: "#FFFFFF",
  },
  value: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
  },
  valueDark: {
    color: "#FFFFFF",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 8,
    opacity: 0.5,
  },
  dividerDark: {
    backgroundColor: "#737779",
  },
});
