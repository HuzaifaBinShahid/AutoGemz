import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function CongratulationsBox() {
  return (
    <LinearGradient
      colors={["#DC3729", "#78160E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Text style={styles.title}>CONGRATULATIONS! YOU WON</Text>
      <Text style={styles.message}>
        Your bid of $34,000 secured the 1st place.
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginHorizontal: 24,
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
