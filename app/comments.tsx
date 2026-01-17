import BackArrow from "@/components/ui/svgs/BackArrow";
import { useColorScheme } from "@/hooks/use-color-scheme";
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

export default function CommentsScreen() {
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

  const commentsText = "Engine average Suspension work required AC blower noisy Both pillar showered Front windscreen change Airbag open Airbag light alteration Tyres need to be change Paint buff on all door frame";

  const disclaimerText = "This report estimates the vehicle's condition on the certification date, based on visible parts' working status. Unseen or uninspected parts are not considered. Odometer reading is relied upon, and famewheels.com is not accountable for its verification. The report is subjective, not a commitment on the car's condition. famewheels.com and its associates are not liable for any consequences arising from its use.";

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
          COMMENTS
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
          <View style={styles.section}>
            <Text style={[styles.sectionHeading, isDark && styles.sectionHeadingDark]}>
              Comments
            </Text>
            <Text style={[styles.paragraph, isDark && styles.paragraphDark]}>
              {commentsText}
            </Text>
          </View>

          <View style={[styles.divider, isDark && styles.dividerDark]} />

          <View style={styles.section}>
            <Text style={[styles.sectionHeading, isDark && styles.sectionHeadingDark]}>
              Disclaimer:
            </Text>
            <Text style={[styles.paragraph, isDark && styles.paragraphDark]}>
              {disclaimerText}
            </Text>
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
  section: {
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    marginBottom: 12,
  },
  sectionHeadingDark: {
    color: "#FFFFFF",
  },
  paragraph: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    lineHeight: 18,
  },
  paragraphDark: {
    color: "#FFFFFF",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    borderStyle: "dashed",
    marginVertical: 16,
  },
  dividerDark: {
    borderBottomColor: "#494949",
  },
});
