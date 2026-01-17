import BackArrow from "@/components/ui/svgs/BackArrow";
import ExteriorDesign from "@/components/ui/svgs/ExteriorDesign";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
    ChakraPetch_600SemiBold,
    useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
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

interface LegendItem {
    badge: string;
    description: string;
}

export default function ExteriorConditionScreen() {
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

    const legendItems: LegendItem[] = [
        { badge: "W2", description: "POLYCATE" },
        { badge: "D1", description: "SMALL DENT" },
        { badge: "P", description: "PAINT MARKED" },
        { badge: "D2", description: "DENT" },
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
                    EXTERIOR CONDITION
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
                    <View style={styles.diagramContainer}>
                        <ExteriorDesign />
                    </View>

                    <View style={styles.legendContainer}>
                        {legendItems.map((item, index) => (
                            <View key={index} style={styles.legendItem}>
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{item.badge}</Text>
                                </View>
                                <Text style={[styles.legendText, isDark && styles.legendTextDark]}>
                                    {item.description}
                                </Text>
                            </View>
                        ))}
                    </View>

          <View style={styles.imageContainer}>
            <Image
              source={require("@/assets/images/AuthBg.png")}
              style={styles.image}
              contentFit="cover"
            />
          </View>
          <LinearGradient
            colors={[
              "rgba(220, 55, 41, 0.75)",
              "rgba(0, 0, 0, 0.08)",
              "rgba(0, 0, 0, 0.08)",
              "rgba(203, 61, 29, 0.55)",
              "rgba(220, 55, 41, 0.5)",
            ]}
            locations={[0.03, 0.27, 0.74, 0.9059, 1.0]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.75, y: 1 }}
            style={styles.imageLabelContainer}
          >
            <View style={styles.imageBadge}>
              <Text style={styles.imageBadgeText}>W2</Text>
            </View>
            <Text style={[styles.imageLabel, isDark && styles.imageLabelDark]}>
              CAR ROOF
            </Text>
          </LinearGradient>
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
    },
    mainContainerDark: {
        backgroundColor: "#111111",
    },
    diagramContainer: {
        alignItems: "center",
        marginBottom: 24,
    },
    legendContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        width: "48%",
        gap: 8,
        marginBottom: 12,
    },
    badge: {
        backgroundColor: "#DC3729",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        minWidth: 32,
        alignItems: "center",
        justifyContent: "center",
    },
    badgeText: {
        fontSize: 12,
        fontFamily: "ChakraPetch_600SemiBold",
        color: "#FFFFFF",
    },
    legendText: {
        fontSize: 12,
        fontFamily: "Mulish_400Regular",
        color: "#494949",
    },
    legendTextDark: {
        color: "#FFFFFF",
    },
  imageContainer: {
    marginBottom: 0,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  imageLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 8,
    marginTop: 0,
  },
  imageBadge: {
    backgroundColor: "#DC3729",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBadgeText: {
    fontSize: 12,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
  },
  imageLabel: {
    fontSize: 12,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "black",
    textTransform: "uppercase",
  },
  imageLabelDark: {
    color: "#FFFFFF",
  },
});
