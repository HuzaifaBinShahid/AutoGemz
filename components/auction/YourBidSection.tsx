import ClockIcon from "../../components/ui/svgs/ClockIcon";
import ElectricIcon from "../../components/ui/svgs/ElectricIcon";
import InfoIcon from "../../components/ui/svgs/InfoIcon";
import LightbulbIcon from "../../components/ui/svgs/LightbulbIcon";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function YourBidSection() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const [bidAmount, setBidAmount] = useState(300000);

  const formatBidAmount = (amount: number) => {
    return amount.toLocaleString("en-IN");
  };

  const handleDecrease = () => {
    setBidAmount((prev) => Math.max(100000, prev - 10000));
  };

  const handleIncrease = () => {
    setBidAmount((prev) => prev + 10000);
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>YOUR BID</Text>
      <View style={styles.instructionRow}>
        <LightbulbIcon />
        <Text style={[styles.instructionText, isDark && styles.instructionTextDark]}>
          Bid $34,000 or higher to take 1st place.
        </Text>
      </View>
      <View style={styles.bidInputRow}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleDecrease}
        >
          <Text style={styles.controlButtonText}>-</Text>
        </TouchableOpacity>
        <View style={[styles.bidInput, isDark && styles.bidInputDark]}>
          <Text style={[styles.bidInputText, isDark && styles.bidInputTextDark]}>
            {formatBidAmount(bidAmount)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleIncrease}
        >
          <Text style={styles.controlButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.setBidButton,
            isDark && styles.setBidButtonDark,
          ]}
          onPress={() => router.push("/winner")}
        >
          <Text
            style={[
              styles.setBidText,
              isDark && styles.setBidTextDark,
            ]}
          >
            SET BID
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bidTypeLabels}>
        <Text style={[styles.bidTypeLabel, isDark && styles.bidTypeLabelDark]}>
          INSTANT BID
        </Text>
        <Text style={[styles.bidTypeLabel, isDark && styles.bidTypeLabelDark]}>
          SCHEDULE BID
        </Text>
      </View>
      <View style={styles.bidTypeButtons}>
        <TouchableOpacity style={styles.instantBidButton}>
          <ElectricIcon />
          <Text style={styles.instantBidText}>10K+ BID</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scheduleBidButton}>
          <ClockIcon />
          <Text style={styles.scheduleBidText}>SCHEDULE BID</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoRow}>
        <InfoIcon />
        <Text style={styles.infoText}>&quot;SET BID&quot; TO CONFIRM YOUR OFFER.</Text>
      </View>
      <View style={styles.summarySection}>
        <Text style={[styles.summaryTitle, isDark && styles.summaryTitleDark]}>
          Summary
        </Text>
        <Text style={[styles.summaryText, isDark && styles.summaryTextDark]}>
          Minimum entry bid: RS 10,000
        </Text>
        <View style={styles.dashedLine} />
        <Text style={[styles.summaryText, isDark && styles.summaryTextDark]}>
          Total: RS 10,000
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4",
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 20,
    borderRadius: 8,
  },
  containerDark: {
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
    marginBottom: 16,
  },
  titleDark: {
    color: "#FFFFFF",
  },
  instructionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  instructionText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    flex: 1,
  },
  instructionTextDark: {
    color: "#FFFFFF",
  },
  bidInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  controlButton: {
    width: 40,
    height: 40,
    backgroundColor: "#DC3729",
    justifyContent: "center",
    alignItems: "center",
  },
  controlButtonText: {
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
  },
  bidInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DC3729",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  bidInputDark: {
    backgroundColor: "#494949",
    borderColor: "#DC3729",
  },
  bidInputText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  bidInputTextDark: {
    color: "#FFFFFF",
  },
  setBidButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#DC3729",
  },
  setBidText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
    textTransform: "uppercase",
  },
  setBidButtonDark: {
    backgroundColor: "black",
  },
  setBidTextDark: {
    color: "#DC3729",
  },
  bidTypeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 12,
  },
  bidTypeLabel: {
    fontSize: 12,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
  },
  bidTypeLabelDark: {
    color: "#FFFFFF",
  },
  bidTypeButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  instantBidButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#DC3729",
    paddingVertical: 6,
  },
  instantBidText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  scheduleBidButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    backgroundColor: "#DC3729",
    paddingVertical: 8,
    paddingLeft: 12,
  },
  scheduleBidText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#DC3729",
    flex: 1,
  },
  summarySection: {
    marginTop: 8,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    marginBottom: 12,
  },
  summaryTitleDark: {
    color: "#FFFFFF",
  },
  summaryText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    marginBottom: 8,
  },
  summaryTextDark: {
    color: "#FFFFFF",
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    borderStyle: "dashed",
    marginVertical: 12,
  },
});
