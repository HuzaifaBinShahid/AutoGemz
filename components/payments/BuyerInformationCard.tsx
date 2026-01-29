import { useColorScheme } from "../../hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BuyerInformationCardProps {
  name: string;
  contact: string;
  city: string;
  email: string;
}

export function BuyerInformationCard({
  name,
  contact,
  city,
  email,
}: BuyerInformationCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>
        Buyer Information
      </Text>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={[styles.label, isDark && styles.labelDark]}>Name:</Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>{name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, isDark && styles.labelDark]}>
            Contact:
          </Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>
            {contact}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, isDark && styles.labelDark]}>City:</Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>{city}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, isDark && styles.labelDark]}>Email:</Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>{email}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 12,
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
  },
  containerDark: {
    backgroundColor: "#111111",
  },
  title: {
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "black",
    marginBottom: 16,
  },
  titleDark: {
    color: "#FFFFFF",
  },
  content: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  labelDark: {
    color: "#FFFFFF",
  },
  value: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
  },
  valueDark: {
    color: "#FFFFFF",
  },
});
