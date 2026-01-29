import BackArrow from "../components/ui/svgs/BackArrow";
import ImageIcon from "../components/ui/svgs/ImageIcon";
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

interface BrakeItem {
  label: string;
  value: string;
  status: "red" | "green";
  hasViewButton?: boolean;
}

export default function BreaksScreen() {
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

  const brakeItems: BrakeItem[] = [
    {
      label: "Front Right Disc",
      value: "Linings",
      status: "red",
      hasViewButton: true,
    },
    {
      label: "Front Left Disc",
      value: "Linings",
      status: "red",
    },
    {
      label: "Front Right Brake Pad",
      value: "More than 50%",
      status: "green",
    },
    {
      label: "Front Left Brake Pad",
      value: "More than 50%",
      status: "green",
    },
    {
      label: "Parking / Hand Brake",
      value: "Okay",
      status: "green",
    },
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
          BREAKS
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

          <View style={styles.itemsSection}>
            {brakeItems.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.brakeItem,
                  item.status === "red"
                    ? isDark
                      ? styles.brakeItemRedDark
                      : styles.brakeItemRed
                    : isDark
                    ? styles.brakeItemGreenDark
                    : styles.brakeItemGreen,
                ]}
              >
                <View style={styles.brakeItemContent}>
                  <Text
                    style={[styles.brakeLabel, isDark && styles.brakeLabelDark]}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={[styles.brakeValue, isDark && styles.brakeValueDark]}
                  >
                    {item.value}
                  </Text>
                </View>
                {item.hasViewButton && (
                  <TouchableOpacity style={styles.viewButton}>
                    <ImageIcon />
                    <Text style={styles.viewButtonText}>VIEW</Text>
                  </TouchableOpacity>
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
    flex: 1,
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
    borderRadius: 8,
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
  itemsSection: {
    gap: 12,
  },
  brakeItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  brakeItemRed: {
    backgroundColor: "#EFCECB",
  },
  brakeItemRedDark: {
    backgroundColor: "#CB3D1D8C",
  },
  brakeItemGreen: {
    backgroundColor: "#D9EFCB87",
  },
  brakeItemGreenDark: {
    backgroundColor: "#29DC9780",
  },
  brakeItemContent: {
    flex: 1,
  },
  brakeLabel: {
    fontSize: 12,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "black",
    fontWeight: "bold",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  brakeLabelDark: {
    color: "#FFFFFF",
  },
  brakeValue: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#0000008C",
    fontWeight: "normal",
  },
  brakeValueDark: {
    color: "#FFFFFF",
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DC3729",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    gap: 6,
  },
  viewButtonText: {
    fontSize: 12,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});
