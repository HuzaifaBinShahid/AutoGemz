import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AuthLayout } from "@/components/auth/AuthLayout";
import AccountCreatedIcon from "@/components/ui/svgs/AccountCreatedIcon";

export default function SuccessScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const params = useLocalSearchParams();
  const isPasswordChanged = params.type === "password-changed";

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthLayout>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.redLine} />
        <Text style={styles.congratulationsText}>CONGRATULATIONS!</Text>
      </View>

      <Text style={styles.title}>
        {isPasswordChanged ? "PASSWORD CHANGED!" : "ACCOUNT CREATED!"}
      </Text>

      <Text style={styles.subtitle}>
        {isPasswordChanged
          ? "Your password has been changed successfully."
          : "Your account has been created successfully!"}
      </Text>

      <View style={styles.iconContainer}>
        <AccountCreatedIcon />
      </View>

      <TouchableOpacity
        style={styles.dashboardButton}
        onPress={() => {
          if (isPasswordChanged) {
            router.push("/login");
          } else {
            router.push("/(tabs)");
          }
        }}
      >
        <Text style={styles.buttonText}>
          {isPasswordChanged ? "BACK TO LOGIN" : "BACK TO DASHBOARD"}
        </Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  redLine: {
    width: 4,
    height: 20,
    backgroundColor: "#DC3729",
    marginRight: 8,
    marginTop: 24,
  },
  congratulationsText: {
    fontSize: 12,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#A5A5A5",
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingTop: 24,
  },
  title: {
    fontSize: 36,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    fontWeight: "600",
    lineHeight: 50,
    letterSpacing: 0,
    textTransform: "uppercase",
    marginBottom: 12,
    width: "70%",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#F2F3EA",
    marginBottom: 40,
    lineHeight: 20,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  dashboardButton: {
    backgroundColor: "#DC3729",
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 4,
    marginBottom: 24,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

