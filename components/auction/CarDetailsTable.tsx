import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface CarDetailsTableProps {
  model?: string;
  mileage?: string;
  type?: string;
  engineType?: string;
  owner?: string;
  color?: string;
}

export function CarDetailsTable({
  model = "2019 hatchback",
  mileage = "34,000 km",
  type = "Automatic",
  engineType = "2.0-liter four-cylinder",
  owner = "2",
  color = "White",
}: CarDetailsTableProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.row}>
        <View style={[styles.cell, styles.borderRight, styles.borderBottom]}>
          <Text style={[styles.label, isDark && styles.labelDark]}>Model</Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>{model}</Text>
        </View>
        <View style={[styles.cell, styles.borderRight, styles.borderBottom]}>
          <Text style={[styles.label, isDark && styles.labelDark]}>Mileage</Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>{mileage}</Text>
        </View>
        <View style={[styles.cell, styles.borderBottom]}>
          <Text style={[styles.label, isDark && styles.labelDark]}>Type</Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>{type}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.cell, styles.borderRight]}>
          <Text style={[styles.label, isDark && styles.labelDark]}>Engine Type</Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>{engineType}</Text>
        </View>
        <View style={[styles.cell, styles.borderRight]}>
          <Text style={[styles.label, isDark && styles.labelDark]}>Owner</Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>{owner}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={[styles.label, isDark && styles.labelDark]}>Color</Text>
          <Text style={[styles.value, isDark && styles.valueDark]}>{color}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#475569",
    marginHorizontal: 24,
    marginBottom: 24,
  },
  containerDark: {
    borderColor: "#475569",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    padding: 16,
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: "#494949",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#494949",
  },
  label: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    marginBottom: 8,
  },
  labelDark: {
    color: "#FFFFFF",
  },
  value: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  valueDark: {
    color: "#FFFFFF",
  },
});
