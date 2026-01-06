import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import ThemedSearchIcon from "@/components/ui/svgs/ThemedSearchIcon";
import FiltersIcon from "@/components/ui/svgs/FiltersIcon";

export function SearchBar() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, isDark && styles.searchContainerDark]}>
        <ThemedSearchIcon />
        <TextInput
          style={[styles.input, isDark && styles.inputDark]}
          placeholder="Search Car Auction"
          placeholderTextColor={isDark ? "#A5A5A5" : "#A5A5A5"}
        />
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <FiltersIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 16,
    gap: 12,
  },
  searchContainerDark: {
    backgroundColor: "#1F1F1F",
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  inputDark: {
    color: "#F4F4F4",
  },
  filterButton: {
    width: 46,
    height: 40,
  },
});

