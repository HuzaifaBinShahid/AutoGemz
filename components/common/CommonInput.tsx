import React from "react";
import { Platform, StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface CommonInputProps extends TextInputProps {
  icon?: React.ReactNode;
  email?: boolean;
}

export function CommonInput({ icon, email = false, style, ...props }: CommonInputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="#F2F3EA"
          keyboardType={email ? "email-address" : "default"}
          autoCapitalize={email ? "none" : "words"}
          autoCorrect={email ? false : true}
          {...props}
        />
      </View>
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
    borderRadius: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  iconContainer: {
    marginRight: 12,
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