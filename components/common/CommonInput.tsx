import React from "react";
import { Platform, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface CommonInputProps extends TextInputProps {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  email?: boolean;
  containerStyle?: any;
  inputContainerStyle?: any;
  error?: string;
}

export function CommonInput({ icon, rightIcon, email = false, error, style, containerStyle, inputContainerStyle, ...props }: CommonInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputContainer, error ? styles.inputContainerError : undefined, inputContainerStyle]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="#F2F3EA"
          keyboardType={email ? "email-address" : "default"}
          autoCapitalize={email ? "none" : "words"}
          autoCorrect={email ? false : true}
          {...props}
        />
        {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF1A",
    paddingHorizontal: 16,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: "#FFFFFF2E",
  },
  inputContainerError: {
    borderColor: "#DC3729",
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: "#DC3729",
    fontFamily: "Mulish_400Regular",
  },
  iconContainer: {
    marginRight: 12,
  },
  rightIconContainer: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#F2F3EA",
    borderWidth: 0,
    ...(Platform.OS === "web" && { outlineStyle: "none" as any }),
  },
});