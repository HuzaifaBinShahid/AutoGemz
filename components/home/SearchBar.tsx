import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { useRouter } from "expo-router";
import ThemedSearchIcon from "../../components/ui/svgs/ThemedSearchIcon";
import FiltersIcon from "../../components/ui/svgs/FiltersIcon";

export function SearchBar() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.searchContainer, isDark && styles.searchContainerDark]}
        onPress={() => router.push("/search")}
      >
        <ThemedSearchIcon />
        <TextInput
          style={[styles.input, isDark && styles.inputDark]}
          placeholder="Search Car Auction"
          placeholderTextColor={isDark ? "#A5A5A5" : "#A5A5A5"}
          editable={false}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => router.push("/filters")}
      >
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

