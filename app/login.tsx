import { AuthLayout } from "../components/auth/AuthLayout";
import { Checkbox } from "../components/common/Checkbox";
import { CommonInput } from "../components/common/CommonInput";
import AppleIcon from "../components/ui/svgs/AppleIcon";
import GoogleIcon from "../components/ui/svgs/GoogleIcon";
import LockIcon from "../components/ui/svgs/LockIcon";
import Person from "../components/ui/svgs/Person";
import ShowPasswordIcon from "../components/ui/svgs/ShowPasswordIcon";
import { login } from "../services/auth";
import { saveRefreshToken, saveToken } from "../services/token";
import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Toast } from "expo-react-native-toastify";

const DEFAULT_ROLE = "user";

export default function LoginScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ emailOrUsername?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const next: typeof errors = {};
    const trimmedEmail = emailOrUsername.trim();
    if (!trimmedEmail) {
      next.emailOrUsername = "Username or email is required";
    }
    if (!password) {
      next.password = "Password is required";
    } else if (password.length < 6) {
      next.password = "Password must be at least 6 characters";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    setErrors({});
    try {
      const res = await login({
        email: emailOrUsername.trim(),
        password,
        role: DEFAULT_ROLE,
      });
      const access = res.token?.access?.token;
      const refresh = res.token?.refresh?.token;
      if (access) await saveToken(access);
      if (refresh) await saveRefreshToken(refresh);
      Toast.success("Login successful");
      router.replace("/(tabs)");
    } catch (err: unknown) {
      let message = "Login failed. Please try again.";
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

  return (
    <AuthLayout>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.redLine} />
        <Text style={styles.headerText}>WELCOME BACK</Text>
      </View>

      <Text style={styles.title}>LOGIN</Text>

      <Text style={styles.subtitle}>
        Please enter your login credentials to access your account.
      </Text>

      <View style={styles.inputsContainer}>
        <CommonInput
          placeholder="EMAIL OR USERNAME"
          icon={<Person />}
          value={emailOrUsername}
          onChangeText={(t) => {
            setEmailOrUsername(t);
            if (errors.emailOrUsername) setErrors((e) => ({ ...e, emailOrUsername: undefined }));
          }}
          autoCapitalize="none"
          autoCorrect={false}
          error={errors.emailOrUsername}
          editable={!isSubmitting}
        />
        <CommonInput
          placeholder="PASSWORD"
          icon={<LockIcon />}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(t) => {
            setPassword(t);
            if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
          }}
          error={errors.password}
          editable={!isSubmitting}
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={isSubmitting}>
              <ShowPasswordIcon />
            </TouchableOpacity>
          }
        />
      </View>

      <View style={styles.optionsRow}>
        <View style={styles.rememberMeContainer}>
          <Checkbox checked={rememberMe} onToggle={() => setRememberMe(!rememberMe)} />
          <Text style={styles.rememberMeText}>Remember Me</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/forgot-password")} disabled={isSubmitting}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.loginButton, isSubmitting && styles.loginButtonDisabled]}
        onPress={handleLogin}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.loginButtonText}>LOGIN</Text>
        )}
      </TouchableOpacity>

      <View style={styles.signupPrompt}>
        <Text style={styles.signupText}>
          Not registered yet?{" "}
          <Text style={styles.signupLink} onPress={() => router.push("/signup")}>
            Create an Account
          </Text>
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
    marginVertical: 24,
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
    marginBottom: 16,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#FFFFFFB2",
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#FFFFFF",
  },
  loginButton: {
    backgroundColor: "#DC3729",
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  signupPrompt: {
    alignItems: "center",
    marginBottom: 24,
  },
  signupText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#A5A5A5",
  },
  signupLink: {
    color: "#F2F3EA",
    textDecorationLine: "underline",
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
});
