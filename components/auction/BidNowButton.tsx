import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface BidNowButtonProps {
  onPress?: () => void;
}

export function BidNowButton({ onPress }: BidNowButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push("/bid");
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>BID NOW</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#DC3729",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 24,
    marginBottom: 24,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});
