import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "../../hooks/use-color-scheme";
import FamilyCarsIcon from "../../components/ui/svgs/FamilyCarsIcon";
import SeaterIcon from "../../components/ui/svgs/SeaterIcon";
import ImportedCarsIcon from "../../components/ui/svgs/ImportedCarsIcon";
import SmallCarsIcon from "../../components/ui/svgs/SmallCarsIcon";
import Icon1300CC from "../../components/ui/svgs/1300CCIcon";

const tabs = ["Body Type", "City", "Specifications", "Model"];

const carCategories = [
  { key: "family", label: "Family Cars", icon: <FamilyCarsIcon /> },
  { key: "1300cc1", label: "1300cc cars", icon: <Icon1300CC /> },
  { key: "seater", label: "5 Seater", icon: <SeaterIcon /> },
  { key: "1300cc2", label: "1300cc cars", icon: <Icon1300CC /> },
  { key: "imported", label: "Imported cars", icon: <ImportedCarsIcon /> },
  { key: "small", label: "Small cars", icon: <SmallCarsIcon /> },
];

export function BrowseTabs() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [activeTab, setActiveTab] = useState("Body Type");

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, isDark && styles.headingDark]}>BROWSE BY</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={styles.tab}
          >
            <Text style={[styles.tabText, isDark && styles.tabTextDark]}>{tab}</Text>
            {activeTab === tab && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {carCategories.map((category) => (
          <View key={category.key} style={styles.categoryItem}>
            {category.icon}
            <Text style={[styles.categoryText, isDark && styles.categoryTextDark]}>
              {category.label}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  heading: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    marginBottom: 16,
    textTransform: "uppercase",
  },
  headingDark: {
    color: "#F4F4F4",
  },
  tabsContainer: {
    marginBottom: 16,
  },
  tab: {
    marginRight: 24,
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  tabTextDark: {
    color: "#F4F4F4",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#DC3729",
  },
  categoriesContainer: {
    marginTop: 8,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 24,
    width: 80,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    marginTop: 8,
    textAlign: "center",
  },
  categoryTextDark: {
    color: "#F4F4F4",
  },
});

