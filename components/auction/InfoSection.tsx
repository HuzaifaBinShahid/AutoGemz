import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface InfoItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface InfoSectionProps {
  title: string;
  items: InfoItem[];
}

export function InfoSection({ title, items }: InfoSectionProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.titleContainer}>
        <View style={styles.redLine} />
        <Text style={[styles.title, isDark && styles.titleDark]}>{title}</Text>
      </View>
      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemColumn}>
            <Text style={[styles.itemLabel, isDark && styles.itemLabelDark]}>
              {item.label}
            </Text>
            <Text
              style={[
                styles.itemValue,
                isDark && styles.itemValueDark,
                item.highlight && styles.itemValueHighlight,
              ]}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  containerDark: {
    backgroundColor: "#111111",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  redLine: {
    width: 2,
    height: 24,
    backgroundColor: "#DC3729",
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
  },
  titleDark: {
    color: "#FFFFFF",
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  itemColumn: {
    width: "30%",
    marginBottom: 16,
  },
  itemLabel: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    marginBottom: 8,
  },
  itemLabelDark: {
    color: "#FFFFFF",
  },
  itemValue: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  itemValueDark: {
    color: "#FFFFFF",
  },
  itemValueHighlight: {
    color: "#DC3729",
  },
});
