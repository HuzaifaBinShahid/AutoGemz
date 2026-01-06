import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
}

export function Checkbox({ checked, onToggle }: CheckboxProps) {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.container}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <View style={styles.checkmark} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#DC3729",
    borderColor: "#DC3729",
  },
  checkmark: {
    width: 6,
    height: 10,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "#FFFFFF",
    transform: [{ rotate: "45deg" }],
    marginTop: -2,
  },
});

