import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface OfferCardProps {
  offerNumber: number;
  dealerName: string;
  offerPrice: string;
  responseTime: string;
  onViewDetails?: () => void;
  onAcceptOffer?: () => void;
}

export function OfferCard({
  offerNumber,
  dealerName,
  offerPrice,
  responseTime,
  onViewDetails,
  onAcceptOffer,
}: OfferCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <View style={styles.redLine} />
        <Text style={[styles.offerLabel, isDark && styles.offerLabelDark]}>
          OFFER {offerNumber}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, isDark && styles.detailLabelDark]}>
            DEALER NAME:
          </Text>
          <Text style={[styles.detailValue, isDark && styles.detailValueDark]}>
            {dealerName}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, isDark && styles.detailLabelDark]}>
            OFFER PRICE:
          </Text>
          <Text style={[styles.detailValue, isDark && styles.detailValueDark]}>
            RS: {offerPrice}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, isDark && styles.detailLabelDark]}>
            RESPONSE TIME:
          </Text>
          <Text style={[styles.detailValue, isDark && styles.detailValueDark]}>
            {responseTime}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, isDark && styles.detailLabelDark]}>
            CONTACT:
          </Text>
          <Text style={[styles.detailValue, isDark && styles.detailValueDark]}>
            Call | WhatsApp
          </Text>
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={onViewDetails}
            activeOpacity={0.8}
          >
            <Text style={styles.viewDetailsText}>VIEW DETAILS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.acceptButton, isDark && styles.acceptButtonDark]}
            onPress={onAcceptOffer}
            activeOpacity={0.8}
          >
            <Text style={styles.acceptText}>ACCEPT OFFER</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.divider, isDark && styles.dividerDark]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  containerDark: {
    backgroundColor: "#111111",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  redLine: {
    width: 2,
    height: 16,
    backgroundColor: "#DC3729",
    marginRight: 8,
  },
  offerLabel: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
  },
  offerLabelDark: {
    color: "#FFFFFF",
  },
  content: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  detailLabelDark: {
    color: "#FFFFFF",
  },
  detailValue: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  detailValueDark: {
    color: "#FFFFFF",
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  viewDetailsButton: {
    flex: 1,
    backgroundColor: "#DC3729",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  viewDetailsText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  acceptButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DC3729",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  acceptButtonDark: {
    backgroundColor: "#111111",
  },
  acceptText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
    textTransform: "uppercase",
  },
  divider: {
    height: 1,
    backgroundColor: "#737779",
    marginTop: 16,
  },
  dividerDark: {
    backgroundColor: "#737779",
  },
});
