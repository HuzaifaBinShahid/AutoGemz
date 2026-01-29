import BackArrow from "../components/ui/svgs/BackArrow";
import { useColorScheme } from "../hooks/use-color-scheme";
import {
    ChakraPetch_600SemiBold,
    useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AcHeaterScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  if (!fontsLoaded) {
    return null;
  }

  const inspectionData = [
    [
      { label: "AC Fitted", value: "Yes" },
      { label: "Blower", value: "Excellent Air Throw" },
      { label: "AC Operational", value: "Yes" },
    ],
    [
      { label: "Heating", value: "Excellent" },
      { label: "Cooling", value: "Excellent" },
    ],
  ];

  return (
    <SafeAreaView
      style={[styles.container, isDark && styles.containerDark]}
      edges={["top"]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={[styles.headerText, isDark && styles.headerTextDark]}>
          AC / HEATER
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.mainContainer,
            isDark && styles.mainContainerDark,
          ]}
        >
          <View style={styles.checkupHeader}>
            <View style={styles.titleRow}>
              <View style={styles.redLine} />
              <Text style={[styles.checkupTitle, isDark && styles.checkupTitleDark]}>
                CHECK UP
              </Text>
            </View>
            <Text style={styles.rating}>80%</Text>
          </View>

          <View style={styles.detailsSection}>
            {inspectionData.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.column}>
                    <Text
                      style={[styles.label, isDark && styles.labelDark]}
                    >
                      {item.label}
                    </Text>
                    <Text
                      style={[styles.value, isDark && styles.valueDark]}
                    >
                      {item.value}
                    </Text>
                  </View>
                ))}
                {row.length < 3 && (
                  <View style={styles.column} />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  containerDark: {
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
  },
  headerTextDark: {
    color: "#FFFFFF",
  },
  placeholder: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  mainContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 12,
    marginBottom: 24,
    padding: 16,
  },
  mainContainerDark: {
    backgroundColor: "#111111",
  },
  checkupHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  redLine: {
    width: 2,
    height: 16,
    backgroundColor: "#DC3729",
    marginRight: 8,
  },
  checkupTitle: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
  },
  checkupTitleDark: {
    color: "#FFFFFF",
  },
  rating: {
    fontSize: 24,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
  },
  detailsSection: {
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 24,
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "black",
    marginBottom: 8,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  labelDark: {
    color: "#FFFFFF",
  },
  value: {
    fontSize: 8,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  valueDark: {
    color: "#FFFFFF",
  },
});
