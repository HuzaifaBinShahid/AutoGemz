import React from "react";
import { StyleSheet, TextInput, TextInputProps, View, Platform } from "react-native";

interface CommonPhoneNumberProps extends TextInputProps {
  icon?: React.ReactNode;
}

export function CommonPhoneNumber({ icon, style, ...props }: CommonPhoneNumberProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="#F2F3EA"
          keyboardType="phone-pad"
          autoCapitalize="none"
          autoCorrect={false}
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
    paddingVertical: 1, 
    borderWidth: 1,
    borderColor: "#FFFFFF2E",
    // shadowColor: "#000000",
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3.57,
    // elevation: 3,
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

