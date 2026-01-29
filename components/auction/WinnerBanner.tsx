import WinnerIcon from "../../components/ui/svgs/WinnerIcon";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function WinnerBanner() {
  return (
    <View style={styles.container}>
      <WinnerIcon />
      <Text style={styles.text}>WINNER</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3EB549",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  text: {
    fontSize: 24,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});
