import React from "react";
import { StyleSheet, Text, View } from "react-native";
import OutbidIcon from "@/components/ui/svgs/OutbidIcon";

export function OutbidBanner() {
  return (
    <View style={styles.container}>
      <OutbidIcon />
      <Text style={styles.text}>OUTBID</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DC3729",
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
