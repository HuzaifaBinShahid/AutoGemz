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
import { CommonPhoneNumber } from "@/components/common/CommonPhoneNumber";
import AppleIcon from "@/components/ui/svgs/AppleIcon";
import EmailIcon from "@/components/ui/svgs/EmailIcon";
import GoogleIcon from "@/components/ui/svgs/GoogleIcon";
import Person from "@/components/ui/svgs/Person";
import PhoneIcon from "@/components/ui/svgs/PhoneIcon";

export default function SignupScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthLayout>
      <StatusBar style="light" />
        <View style={styles.header}>
          <View style={styles.redLine} />
          <Text style={styles.headerText}>CREATE YOUR ACCOUNT</Text>
        </View>

        <Text style={styles.title}>SIGNUP</Text>
        <Text style={styles.subtitle}>
          Please enter your login credentials to access your account.
        </Text>

        <View style={styles.inputsContainer}>
          <CommonInput placeholder="FULL NAME" icon={<Person />} />
          <CommonPhoneNumber placeholder="PHONE NUMBER" icon={<PhoneIcon />} />
          <CommonInput placeholder="EMAIL" icon={<EmailIcon />} email />
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push("/secure-account")}
        >
          <Text style={styles.nextButtonText}>NEXT</Text>
        </TouchableOpacity>

        <View style={styles.loginPrompt}>
          <Text style={styles.loginText}>
            Already have an Account ?{" "}
            <Text style={styles.loginLink} onPress={() => router.push("/login")}>Login</Text>
          </Text>
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <GoogleIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <AppleIcon />
          </TouchableOpacity>
        </View>
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
  },
  headerText: {
    fontSize: 12,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 36,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    fontWeight: "600",
    lineHeight: 36,
    letterSpacing: 0,
    marginBottom: 12,
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
  nextButton: {
    backgroundColor: "#DC3729",
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  loginPrompt: {
    alignItems: "center",
    marginBottom: 24,
  },
  loginText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#A5A5A5",
  },
  loginLink: {
    color: "#F2F3EA",
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#A5A5A5",
  },
  dividerText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#A5A5A5",
    marginHorizontal: 16,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF2E",
  },
  socialButtonText: {
    fontSize: 24,
    color: "#FFFFFF",
  },
});
