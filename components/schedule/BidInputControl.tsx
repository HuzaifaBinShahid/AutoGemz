import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface BidInputControlProps {
  label: string;
  value: string;
  onDecrease: () => void;
  onIncrease: () => void;
  onSetBid: () => void;
  onChangeText?: (text: string) => void;
}

export function BidInputControl({
  label,
  value,
  onDecrease,
  onIncrease,
  onSetBid,
  onChangeText,
}: BidInputControlProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={styles.container}>
      <View style={styles.redLineContainer}>
        <View style={styles.redLine} />
      <Text style={[styles.label, isDark && styles.labelDark]}>{label}</Text>
      </View>
      <View style={styles.inputRow}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={onDecrease}
        >
          <Text style={styles.controlButtonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, isDark && styles.inputDark]}
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.controlButton}
          onPress={onIncrease}
        >
          <Text style={styles.controlButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.setBidButton}
          onPress={onSetBid}
        >
          <Text style={styles.setBidText}>SET BID</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  redLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  redLine: {
    width: 2,
    height: 16,
    backgroundColor: "#DC3729",
  },
  label: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "black",
  },
  labelDark: {
    color: "#FFFFFF",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  controlButton: {
    width: 40,
    height: 45,
    backgroundColor: "#DC3729",
    alignItems: "center",
    justifyContent: "center",
  },
  controlButtonText: {
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
  },
  input: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
  },
  inputDark: {
    backgroundColor: "#FFFFFF4D",
    color: "#FFFFFF",
  },
  setBidButton: {
    backgroundColor: "#DC3729",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  setBidText: {
    fontSize: 12,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});
