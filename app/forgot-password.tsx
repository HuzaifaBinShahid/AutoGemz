import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Toast } from "expo-react-native-toastify";

import { AuthLayout } from "../components/auth/AuthLayout";
import { CommonInput } from "../components/common/CommonInput";
import EmailIcon from "../components/ui/svgs/EmailIcon";
import { forgotPassword } from "../services/auth";

const CODE_LENGTH = 4;

export default function ForgotPasswordScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const codeRefs = useRef<(TextInput | null)[]>([]);

  const handleResetPassword = async () => {
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError("Email is required");
      return;
    }
    setEmailError("");
    setIsSubmitting(true);
    try {
      await forgotPassword({ email: trimmed });
      Toast.success("Verification code sent to your email");
      setShowCode(true);
    } catch (err: unknown) {
      let message = "Failed to send verification code. Please try again.";
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

  const handleCodeChange = (value: string, index: number) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    if (digit && index < CODE_LENGTH - 1) {
      codeRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyPress = (e: { nativeEvent: { key: string } }, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join("");
    if (!fullCode.trim()) {
      Toast.error("Please enter the verification code");
      return;
    }
    router.replace("/login");
  };

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
        {showCode ? "Enter the verification code sent to your email" : "Please enter your email address"}
      </Text>

      {!showCode ? (
        <>
          <View style={styles.inputsContainer}>
            <CommonInput
              placeholder="EMAIL"
              icon={<EmailIcon />}
              email
              value={email}
              onChangeText={(t) => { setEmail(t); if (emailError) setEmailError(""); }}
              error={emailError}
              editable={!isSubmitting}
            />
          </View>
          <TouchableOpacity
            style={[styles.resetButton, isSubmitting && styles.resetButtonDisabled]}
            onPress={handleResetPassword}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.resetButtonText}>RESET PASSWORD</Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.codeRow}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => { codeRefs.current[index] = el; }}
                style={[styles.codeInput, digit ? styles.codeInputFilled : null]}
                value={digit}
                onChangeText={(v) => handleCodeChange(v, index)}
                onKeyPress={(e) => handleCodeKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                placeholderTextColor="#F2F3EA"
                selectTextOnFocus
              />
            ))}
          </View>
          <TouchableOpacity style={styles.resetButton} onPress={handleVerify}>
            <Text style={styles.resetButtonText}>VERIFY</Text>
          </TouchableOpacity>
        </>
      )}
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
  codeRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 24,
  },
  codeInput: {
    width: 52,
    height: 56,
    backgroundColor: "#FFFFFF1A",
    borderWidth: 1,
    borderColor: "#FFFFFF2E",
    borderRadius: 4,
    fontSize: 24,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#F2F3EA",
    textAlign: "center",
  },
  codeInputFilled: {
    borderColor: "#DC3729",
  },
  resetButton: {
    backgroundColor: "#DC3729",
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  resetButtonDisabled: {
    opacity: 0.7,
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

