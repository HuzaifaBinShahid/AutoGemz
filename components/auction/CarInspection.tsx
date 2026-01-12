import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface InspectionCategory {
  name: string;
  rating: number;
}

interface CarInspectionProps {
  overallRating?: number;
  maxRating?: number;
  categories?: InspectionCategory[];
}

const defaultCategories: InspectionCategory[] = [
  { name: "EXTERIOR & BODY", rating: 90 },
  { name: "ENGINE / CLUTCH", rating: 85 },
  { name: "STEERING", rating: 95 },
];

export function CarInspection({
  overallRating = 8.1,
  maxRating = 10,
  categories = defaultCategories,
}: CarInspectionProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={styles.redLine} />
          <Text style={[styles.title, isDark && styles.titleDark]}>
            CAR INSPECTION
          </Text>
        </View>
      </View>
      <View style={styles.ratingHeader}>
        <Text style={[styles.ratingLabel, isDark && styles.ratingLabelDark]}>
          OVERALL RATING
        </Text>
        <Text style={styles.ratingValue}>
          {overallRating} / {maxRating}
        </Text>
      </View>
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <Text
              style={[styles.categoryName, isDark && styles.categoryNameDark]}
            >
              {category.name}
            </Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${category.rating}%` },
                  ]}
                />
              </View>
              <Text style={styles.ratingText}>{category.rating}%</Text>
            </View>
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
    marginVertical: 16,
    marginBottom: 24,
    width: "90%",
    alignSelf: "center",
  },
  containerDark: {
    backgroundColor: "#111111",
  },
  header: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  redLine: {
    width: 2,
    height: 24,
    backgroundColor: "#DC3729",
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
  },
  titleDark: {
    color: "#FFFFFF",
  },
  ratingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  ratingLabel: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
  },
  ratingLabelDark: {
    color: "#FFFFFF",
  },
  ratingValue: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
  },
  categoriesContainer: {
    gap: 16,
  },
  categoryItem: {
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  categoryNameDark: {
    color: "#FFFFFF",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#E5E5E5",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#DC3729",
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#DC3729",
    minWidth: 40,
    textAlign: "right",
  },
});
