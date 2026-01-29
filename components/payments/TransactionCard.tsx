import ThemedCalendarIcon from "../../components/ui/svgs/ThemedCalendarIcon";
import ThemedEyeIcon from "../../components/ui/svgs/ThemedEyeIcon";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type TransactionStatus = "paid" | "pending" | "in_progress";

interface TransactionCardProps {
  image: any;
  title: string;
  transactionId: string;
  date: string;
  amount: string;
  status: TransactionStatus;
  onViewReceipt?: () => void;
  onViewDetails?: () => void;
}

export function TransactionCard({
  image,
  title,
  transactionId,
  date,
  amount,
  status,
  onViewReceipt,
  onViewDetails,
}: TransactionCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const getStatusBadge = () => {
    switch (status) {
      case "paid":
        return { text: "PAID", backgroundColor: "#3EB549" };
      case "pending":
        return { text: "PENDING", backgroundColor: "#FFA500" };
      case "in_progress":
        return { text: "IN PROGRESS", backgroundColor: "#DC3729" };
      default:
        return { text: "PAID", backgroundColor: "#3EB549" };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} contentFit="cover" />
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusBadge.backgroundColor },
            ]}
          >
            <Text style={styles.statusText}>{statusBadge.text}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <View style={styles.titleContainer}>
            <View style={styles.redLine} />
            <Text
              style={[styles.title, isDark && styles.titleDark]}
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>
          <Text
            style={[styles.transactionId, isDark && styles.transactionIdDark]}
          >
            TRANSACTION ID: {transactionId}
          </Text>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <ThemedCalendarIcon />
              <Text style={[styles.infoText, isDark && styles.infoTextDark]}>
                {date}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <ThemedEyeIcon />
              <Text style={[styles.infoText, isDark && styles.infoTextDark]}>
                {amount}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.divider, isDark && styles.dividerDark]} />
      <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.viewReceiptButton}
            onPress={() => router.push("/payment-details")}
            activeOpacity={0.8}
          >
            <Text style={styles.viewReceiptText}>VIEW RECEIPT</Text>
          </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewDetailsButton,
            isDark && styles.viewDetailsButtonDark,
          ]}
          onPress={onViewDetails}
          activeOpacity={0.8}
        >
          <Text style={styles.viewDetailsText}>VIEW DETAILS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    marginHorizontal: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  containerDark: {
    backgroundColor: "#111111",
    borderColor: "#1D2939",
  },
  content: {
    flexDirection: "row",
    padding: 12,
    gap: 12,
  },
  imageContainer: {
    position: "relative",
    width: 100,
    height: 100,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  statusBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  statusText: {
    fontSize: 10,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  dividerDark: {
    backgroundColor: "#737779",
  },
  details: {
    flex: 1,
    gap: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  redLine: {
    width: 2,
    height: 16,
    backgroundColor: "#DC3729",
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
    flex: 1,
  },
  titleDark: {
    color: "#FFFFFF",
  },
  transactionId: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  transactionIdDark: {
    color: "#FFFFFF",
  },
  infoRow: {
    flexDirection: "row",
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  infoTextDark: {
    color: "#FFFFFF",
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 12,
    margin: 8,
  },
  viewReceiptButton: {
    flex: 1,
    backgroundColor: "#DC3729",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  viewReceiptText: {
    fontSize: 12,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  viewDetailsButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DC3729",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  viewDetailsButtonDark: {
    backgroundColor: "#111111",
  },
  viewDetailsText: {
    fontSize: 12,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
    textTransform: "uppercase",
  },
});
