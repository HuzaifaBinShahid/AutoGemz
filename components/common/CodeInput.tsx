import React, { forwardRef } from "react";
import { Platform, StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface CodeInputProps extends Omit<TextInputProps, "value" | "onChangeText"> {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const CodeInput = forwardRef<TextInput, CodeInputProps>(
  ({ value, onChangeText, onFocus, onBlur, style, ...props }, ref) => {
    return (
      <View style={styles.container}>
        <TextInput
          ref={ref}
          style={[styles.input, style]}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholderTextColor="#F2F3EA"
          keyboardType="number-pad"
          maxLength={1}
          textAlign="center"
          {...props}
        />
      </View>
    );
  }
);

CodeInput.displayName = "CodeInput";

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    backgroundColor: "#FFFFFF1A",
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#FFFFFF2E",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: "100%",
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#F2F3EA",
    ...(Platform.OS === "web" && { outlineStyle: "none" as any }),
  },
});

