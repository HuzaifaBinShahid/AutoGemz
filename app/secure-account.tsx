import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Toast } from "expo-react-native-toastify";

import { AuthLayout } from "../components/auth/AuthLayout";
import { CommonInput } from "../components/common/CommonInput";
import LockIcon from "../components/ui/svgs/LockIcon";
import Person from "../components/ui/svgs/Person";
import ShowPasswordIcon from "../components/ui/svgs/ShowPasswordIcon";
import { register } from "../services/auth";

const DEFAULT_ROLE = "user";

function asString(p: string | string[] | undefined): string {
  return Array.isArray(p) ? p[0] ?? "" : p ?? "";
}

export default function SecureAccountScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const params = useLocalSearchParams<{ fullName?: string; phone?: string; email?: string }>();
  const fullName = asString(params.fullName);
  const phone = asString(params.phone);
  const email = asString(params.email);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string; confirmPassword?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (fontsLoaded && (!fullName || !phone || !email)) {
      router.replace("/signup");
    }
  }, [fontsLoaded, fullName, phone, email, router]);

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!username.trim()) next.username = "Username is required";
    if (!password) next.password = "Password is required";
    else if (password.length < 6) next.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) next.confirmPassword = "Passwords do not match";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    setErrors({});
    try {
      await register({
        fullName,
        phone,
        email,
        username: username.trim(),
        password,
        role: DEFAULT_ROLE,
      });
      Toast.success("Account created successfully");
      router.replace("/success");
    } catch (err: unknown) {
      let message = "Registration failed. Please try again.";
      if (err && typeof err === "object" && "response" in err) {
        const ax = err as { response?: { data?: { message?: string } } };
        if (ax.response?.data?.message) message = ax.response.data.message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      Toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  if (!fullName || !phone || !email) {
    return null;
  }

  return (
    <AuthLayout showBack>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerText}>SECURE YOUR ACCOUNT</Text>
      </View>

      <Text style={styles.subtitle}>
        Please enter your login credentials to access your account.
      </Text>

      <View style={styles.inputsContainer}>
        <CommonInput
          placeholder="USER NAME"
          icon={<Person />}
          value={username}
          onChangeText={(t) => { setUsername(t); if (errors.username) setErrors((e) => ({ ...e, username: undefined })); }}
          error={errors.username}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isSubmitting}
        />
        <CommonInput
          placeholder="PASSWORD"
          icon={<LockIcon />}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(t) => { setPassword(t); if (errors.password) setErrors((e) => ({ ...e, password: undefined })); }}
          error={errors.password}
          editable={!isSubmitting}
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={isSubmitting}>
              <ShowPasswordIcon />
            </TouchableOpacity>
          }
        />
        <CommonInput
          placeholder="CONFIRM PASSWORD"
          icon={<LockIcon />}
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={(t) => {
            setConfirmPassword(t);
            if (errors.confirmPassword) setErrors((e) => ({ ...e, confirmPassword: undefined }));
          }}
          error={errors.confirmPassword}
          editable={!isSubmitting}
          rightIcon={
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} disabled={isSubmitting}>
              <ShowPasswordIcon />
            </TouchableOpacity>
          }
        />
      </View>

      <TouchableOpacity
        style={[styles.nextButton, isSubmitting && styles.nextButtonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.nextButtonText}>NEXT</Text>
        )}
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
  },
  headerText: {
    fontSize: 36,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    letterSpacing: 1,
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
  nextButtonDisabled: {
    opacity: 0.7,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

