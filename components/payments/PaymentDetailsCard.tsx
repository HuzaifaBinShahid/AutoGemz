import ThemedCalendarIcon from "../../components/ui/svgs/ThemedCalendarIcon";
import ThemedEyeIcon from "../../components/ui/svgs/ThemedEyeIcon";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PaymentDetailsCardProps {
  image: any;
  title: string;
  transactionId: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "in_progress";
  make: string;
  year: string;
  transmission: string;
  model: string;
  mileage: string;
  registration: string;
}

export function PaymentDetailsCard({
  image,
  title,
  transactionId,
  date,
  amount,
  status,
  make,
  year,
  transmission,
  model,
  mileage,
  registration,
}: PaymentDetailsCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

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
            style={[styles.statusBadge, { backgroundColor: statusBadge.backgroundColor }]}
          >
            <Text style={styles.statusText}>{statusBadge.text}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <View style={styles.titleContainer}>
            <View style={styles.redLine} />
            <Text style={[styles.title, isDark && styles.titleDark]} numberOfLines={1}>
              {title}
            </Text>
          </View>
          <Text style={[styles.transactionId, isDark && styles.transactionIdDark]}>
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
      <View style={[styles.table, isDark && styles.tableDark]}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.borderRight, styles.borderBottom]}>
            <Text style={[styles.tableLabel, isDark && styles.tableLabelDark]}>
              Make
            </Text>
            <Text style={[styles.tableValue, isDark && styles.tableValueDark]}>
              {make}
            </Text>
          </View>
          <View style={[styles.tableCell, styles.borderRight, styles.borderBottom]}>
            <Text style={[styles.tableLabel, isDark && styles.tableLabelDark]}>
              Year
            </Text>
            <Text style={[styles.tableValue, isDark && styles.tableValueDark]}>
              {year}
            </Text>
          </View>
          <View style={[styles.tableCell, styles.borderBottom]}>
            <Text style={[styles.tableLabel, isDark && styles.tableLabelDark]}>
              Transmission
            </Text>
            <Text style={[styles.tableValue, isDark && styles.tableValueDark]}>
              {transmission}
            </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.borderRight]}>
            <Text style={[styles.tableLabel, isDark && styles.tableLabelDark]}>
              Model
            </Text>
            <Text style={[styles.tableValue, isDark && styles.tableValueDark]}>
              {model}
            </Text>
          </View>
          <View style={[styles.tableCell, styles.borderRight]}>
            <Text style={[styles.tableLabel, isDark && styles.tableLabelDark]}>
              Mileage
            </Text>
            <Text style={[styles.tableValue, isDark && styles.tableValueDark]}>
              {mileage}
            </Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={[styles.tableLabel, isDark && styles.tableLabelDark]}>
              Registration
            </Text>
            <Text style={[styles.tableValue, isDark && styles.tableValueDark]}>
              {registration}
            </Text>
          </View>
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
  content: {
    flexDirection: "row",
    marginBottom: 16,
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
    borderRadius: 4,
  },
  statusBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
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
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
    flex: 1,
  },
  titleDark: {
    color: "#FFFFFF",
  },
  transactionId: {
    fontSize: 10,
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
    color: "#111111",
    fontWeight: "700",
  },
  infoTextDark: {
    color: "#FFFFFF",
  },
  table: {
    borderWidth: 1,
    borderColor: "#ABABAB",
  },
  tableDark: {
    backgroundColor: "#1A1A1A",
    borderColor: "#ABABAB",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    padding: 12,
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: "#E5E5E5",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  tableLabel: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    marginBottom: 4,
  },
  tableLabelDark: {
    color: "#FFFFFF",
  },
  tableValue: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
  },
  tableValueDark: {
    color: "#FFFFFF",
  },
});
