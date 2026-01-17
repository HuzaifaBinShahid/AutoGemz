import BackArrow from "@/components/ui/svgs/BackArrow";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
    ChakraPetch_600SemiBold,
    useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { Image } from "expo-image";
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

interface VehicleImage {
  id: string;
  image: any;
  label: string;
}

export default function VehiclePicturesScreen() {
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

  const vehicleImages: VehicleImage[] = [
    {
      id: "1",
      image: require("@/assets/images/AuthBg.png"),
      label: "| Front View Image",
    },
    {
      id: "2",
      image: require("@/assets/images/AuthBg.png"),
      label: "| Front View Image",
    },
    {
      id: "3",
      image: require("@/assets/images/AuthBg.png"),
      label: "| Front View Image",
    },
    {
      id: "4",
      image: require("@/assets/images/AuthBg.png"),
      label: "| Front View Image",
    },
    {
      id: "5",
      image: require("@/assets/images/AuthBg.png"),
      label: "| Front View Image",
    },
    {
      id: "6",
      image: require("@/assets/images/AuthBg.png"),
      label: "| Front View Image",
    },
    {
      id: "7",
      image: require("@/assets/images/AuthBg.png"),
      label: "| Front View Image",
    },
    {
      id: "8",
      image: require("@/assets/images/AuthBg.png"),
      label: "| Front View Image",
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
          VEHICLE PICTURES
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {vehicleImages.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.imageBox,
                index % 2 === 0 && styles.imageBoxLeft,
                index % 2 === 1 && styles.imageBoxRight,
              ]}
            >
              <Image
                source={item.image}
                style={styles.image}
                contentFit="cover"
              />
              <View style={styles.labelContainer}>
                <View style={styles.redLine} />
                <Text style={[styles.imageLabel, isDark && styles.imageLabelDark]}>
                  {item.label.replace("| ", "")}
                </Text>
              </View>
            </View>
          ))}
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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 12,
  },
  imageBox: {
    width: "48%",
    marginBottom: 12,
    backgroundColor:"#FFFFFF",
    padding:12,
  },
  imageBoxLeft: {},
  imageBoxRight: {},
  image: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: 8,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  redLine: {
    width: 2,
    height: 12,
    backgroundColor: "#DC3729",
    marginRight: 4,
  },
  imageLabel: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "black",
    fontWeight: "bold",
  },
  imageLabelDark: {
    color: "#FFFFFF",
  },
});
