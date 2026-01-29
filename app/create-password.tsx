import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AuthLayout } from "../components/auth/AuthLayout";
import { CommonInput } from "../components/common/CommonInput";
import LockIcon from "../components/ui/svgs/LockIcon";
import ShowPasswordIcon from "../components/ui/svgs/ShowPasswordIcon";

export default function CreatePasswordScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthLayout showBack>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>CREATE NEW PASSWORD</Text>
      </View>

      <Text style={styles.subtitle}>
        Use a new password you haven't used before.
      </Text>

      <View style={styles.inputsContainer}>
        <CommonInput
          placeholder="PASSWORD"
          icon={<LockIcon />}
          secureTextEntry={!showPassword}
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <ShowPasswordIcon />
            </TouchableOpacity>
          }
        />
        <CommonInput
          placeholder="CONFIRM PASSWORD"
          icon={<LockIcon />}
          secureTextEntry={!showConfirmPassword}
          rightIcon={
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <ShowPasswordIcon />
            </TouchableOpacity>
          }
        />
      </View>

      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => router.push("/verify?from=password-reset")}
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

