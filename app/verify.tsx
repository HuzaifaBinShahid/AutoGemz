import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AuthLayout } from "../components/auth/AuthLayout";
import { CodeInputGroup } from "../components/common/CodeInputGroup";

export default function VerifyScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const params = useLocalSearchParams();
  const [timer, setTimer] = useState(85);
  const isPasswordReset = params.from === "password-reset";

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  if (!fontsLoaded) {
    return null;
  }

  const handleCodeComplete = (code: string) => {
  };

  return (
    <AuthLayout showBack>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>VERIFY YOUR ACCOUNT</Text>
      </View>

      <Text style={styles.subtitle}>
        We&apos;ve sent the code to the email on your device
      </Text>

      <CodeInputGroup length={6} onComplete={handleCodeComplete} />

      <Text style={styles.resendText}>
        Resend code in {timer} sec
      </Text>

      <TouchableOpacity
        style={styles.verifyButton}
        onPress={() => {
          if (isPasswordReset) {
            router.push("/success?type=password-changed");
          } else {
            router.push("/deposit");
          }
        }}
      >
        <Text style={styles.verifyButtonText}>VERIFY & NEXT</Text>
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
  resendText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#F2F3EA",
    marginBottom: 24,
  },
  verifyButton: {
    backgroundColor: "#DC3729",
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  verifyButtonText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

