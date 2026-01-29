import { useColorScheme } from "../../hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

interface OverallRatingProps {
  rating?: number;
  maxRating?: number;
}

export function OverallRating({
  rating = 5.74,
  maxRating = 10,
}: OverallRatingProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const percentage = (rating / maxRating) * 100;
  const radius = 60;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getRatingColor = (value: number) => {
    if (value >= 8) return "#3EB549";
    if (value >= 6) return "#2DD4BF";
    if (value >= 4) return "#19ADD9";
    return "#DC3729";
  };

  const ratingColor = getRatingColor(rating);

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.titleContainer}>
        <View style={styles.redLine} />
        <Text style={[styles.title, isDark && styles.titleDark]}>
          OVERALL RATING
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "#3EB549" }]} />
            <Text style={[styles.legendText, isDark && styles.legendTextDark]}>
              EXCELLENT
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "#2DD4BF" }]} />
            <Text style={[styles.legendText, isDark && styles.legendTextDark]}>
              BETTER
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "#19ADD9" }]} />
            <Text style={[styles.legendText, isDark && styles.legendTextDark]}>
              AVERAGE
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "#DC3729" }]} />
            <Text style={[styles.legendText, isDark && styles.legendTextDark]}>
              BELOW AVERAGE
            </Text>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <Svg width={140} height={140} style={styles.chart}>
            <G rotation="-90" origin="70,70">
              <Circle
                cx="70"
                cy="70"
                r={radius}
                stroke="#E5E5E5"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Circle
                cx="70"
                cy="70"
                r={radius}
                stroke={ratingColor}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </G>
          </Svg>
          <View style={styles.ratingTextContainer}>
            <Text style={[styles.ratingValue, isDark && styles.ratingValueDark]}>
              {rating.toFixed(2)}
            </Text>
            <Text style={[styles.ratingMax, isDark && styles.ratingMaxDark]}>
              / {maxRating}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 12,
    marginBottom: 24,
    padding: 16,
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
    height: 16,
    backgroundColor: "#DC3729",
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
  },
  titleDark: {
    color: "#FFFFFF",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  legend: {
    flex: 1,
    gap: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  legendTextDark: {
    color: "#FFFFFF",
  },
  chartContainer: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  chart: {
    position: "absolute",
  },
  ratingTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  ratingValue: {
    fontSize: 24,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
  },
  ratingValueDark: {
    color: "#FFFFFF",
  },
  ratingMax: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
  },
  ratingMaxDark: {
    color: "#FFFFFF",
  },
});
