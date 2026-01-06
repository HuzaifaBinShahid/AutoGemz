import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { CommonInput } from "@/components/common/CommonInput";
import EmailIcon from "@/components/ui/svgs/EmailIcon";

export default function ForgotPasswordScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthLayout showBack>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>FORGOT PASSWORD</Text>
      </View>

      <Text style={styles.subtitle}>
        Please enter your email address
      </Text>

      <View style={styles.inputsContainer}>
        <CommonInput placeholder="EMAIL" icon={<EmailIcon />} email />
      </View>

      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => router.push("/create-password")}
      >
        <Text style={styles.resetButtonText}>RESET PASSWORD</Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    fontWeight: "600",
    lineHeight: 36,
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#F2F3EA",
    marginBottom: 32,
    lineHeight: 20,
  },
  inputsContainer: {
    marginBottom: 24,
  },
  resetButton: {
    backgroundColor: "#DC3729",
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

