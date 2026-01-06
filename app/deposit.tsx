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
import CardNumberIcon from "@/components/ui/svgs/CardNumberIcon";
import ExpiryIcon from "@/components/ui/svgs/ExpiryIcon";
import LockIcon from "@/components/ui/svgs/LockIcon";
import VisaIcon from "@/components/ui/svgs/VisaIcon";

export default function DepositScreen() {
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
        <Text style={styles.title}>MAKE FIRST DEPOSIT</Text>
      </View>

      <Text style={styles.subtitle}>
        Please enter your login credentials to access your account.
      </Text>

      <View style={styles.inputsContainer}>
        <CommonInput placeholder="VISA/MASTERCARD" icon={<VisaIcon />} />
        <CommonInput placeholder="CARD NUMBER" icon={<CardNumberIcon />} />
        <View style={styles.rowInputs}>
          <View style={styles.halfInput}>
            <CommonInput placeholder="EXPIRY" icon={<ExpiryIcon />} />
          </View>
          <View style={styles.halfInput}>
            <CommonInput placeholder="CVC" icon={<LockIcon />} secureTextEntry />
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.push("/success")}
        >
          <Text style={styles.buttonText}>SKIP FOR NOW</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.depositButton}
          onPress={() => router.push("/success")}
        >
          <Text style={styles.buttonText}>DEPOSIT & CONTINUE</Text>
        </TouchableOpacity>
      </View>
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
    lineHeight: 40,
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
  rowInputs: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  skipButton: {
    flex: 1,
    backgroundColor: "#DC3729",
    paddingVertical: 16,
    alignItems: "center",
  },
  depositButton: {
    flex: 1,
    backgroundColor: "#DC3729",
    paddingVertical: 16,
    alignItems: "center",
    textAlign: "center",
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
  },
});

