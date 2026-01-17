import { InfoSection } from "@/components/auction/InfoSection";
import { MenuList } from "@/components/inspection/MenuList";
import { OverallRating } from "@/components/inspection/OverallRating";
import BackArrow from "@/components/ui/svgs/BackArrow";
import Breaks from "@/components/ui/svgs/Breaks";
import Comments from "@/components/ui/svgs/Comments";
import Electronic from "@/components/ui/svgs/Electronical";
import EngineTransmissions from "@/components/ui/svgs/EngineTransmissions";
import ExteriorBody from "@/components/ui/svgs/ExteriorBody";
import ExteriorConditions from "@/components/ui/svgs/ExteriorConditions";
import Heater from "@/components/ui/svgs/Heater";
import Interior from "@/components/ui/svgs/Interior";
import MainIcon from "@/components/ui/svgs/MainIcon";
import ShareIcon from "@/components/ui/svgs/ShareIcon";
import SuspensionIcon from "@/components/ui/svgs/SuspensionIcon";
import TestDriveIcon from "@/components/ui/svgs/TestDriveIcon";
import TyresIcon from "@/components/ui/svgs/TyresIcon";
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

export default function CarInspectionReportScreen() {
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

  const inspectionItems = [
    {
      id: "1",
      label: "Exterior Condition",
      icon: <ExteriorConditions />,
      onPress: () => { },
    },
    {
      id: "2",
      label: "Body Frame Accident",
      icon: <ExteriorBody />,
      onPress: () => { },
    },
    {
      id: "3",
      label: "Engine/Transmission",
      icon: <EngineTransmissions />,
      onPress: () => { },
    },
    {
      id: "4",
      label: "Suspension/Steering",
      icon: <SuspensionIcon />,
      onPress: () => { },
    },
    {
      id: "5",
      label: "Interior",
      icon: <Interior />,
      onPress: () => { },
    },
    {
      id: "6",
      label: "AC / Heater",
      icon: <Heater />,
      onPress: () => router.push("/ac-heater"),
    },
    {
      id: "7",
      label: "Breaks",
      icon: <Breaks />,
      onPress: () => router.push("/breaks"),
    },
    {
      id: "8",
      label: "Electrical & Electronics",
      icon: <Electronic />,
      onPress: () => router.push("/electrical-electronics"),
    },
    {
      id: "9",
      label: "Exterior & Body",
      icon: <ExteriorBody />,
      onPress: () => { },
    },
    {
      id: "10",
      label: "Tyres",
      icon: <TyresIcon />,
      onPress: () => { },
    },
    {
      id: "11",
      label: "Test Drive",
      icon: <TestDriveIcon />,
      onPress: () => { },
    },
    {
      id: "12",
      label: "Main - Vehicle Pictures",
      icon: <MainIcon />,
      onPress: () => router.push("/vehicle-pictures"),
    },
    {
      id: "13",
      label: "Comments",
      icon: <Comments />,
      onPress: () => router.push("/comments"),
    },
  ];

  const specificationItems = [
    { name: "AC / Heater", rating: 95 },
    { name: "Engine / Transmission / Clutch", rating: 100 },
    { name: "Exterior", rating: 97 },
    { name: "Interior", rating: 97 },
    { name: "ACCIDENT CHECKLIST", rating: 97 },
    { name: "BRAKES", rating: 97 },
    { name: "Suspension & Steering", rating: 97 },
    { name: "Electrical & Electronics", rating: 99 },
    { name: "Tyres", rating: 97 },
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
          CAR INSPECTION REPORT
        </Text>
        <TouchableOpacity>
          <ShareIcon />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/AuthBg.png")}
            style={styles.image}
            contentFit="cover"
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={[styles.carTitle, isDark && styles.carTitleDark]}>
            TOYOTA COROLLA HATCHBACK MID-SPEC
          </Text>
          <Text style={[styles.location, isDark && styles.locationDark]}>
            Lahore
          </Text>
        </View>

        <OverallRating rating={5.74} maxRating={10} />

        <InfoSection
          title="CAR SPECIFICATION"
          items={[
            { label: "Inspection Date", value: "Oct 13, 2023" },
            { label: "Engine Type", value: "2.0-liter four-cylinder" },
            { label: "Mileage", value: "34,000 km" },
            { label: "Engine No.", value: "ENG-12345" },
            { label: "Registration No.", value: "REG-67890" },
            { label: "VIN No.", value: "VIN-ABCD1234" },
            { label: "Engine Capacity", value: "2000cc" },
            { label: "Transmission Type", value: "Automatic" },
            { label: "Registered City", value: "Lahore" },
            { label: "Color Type", value: "White" },
            { label: "Registered From", value: "2020" },
          ]}
        />

        <View
          style={[
            styles.specificationContainer,
            isDark && styles.specificationContainerDark,
          ]}
        >
          <View style={styles.titleContainer}>
            <View style={styles.redLine} />
            <Text style={[styles.title, isDark && styles.titleDark]}>
              CAR SPECIFICATION
            </Text>
          </View>
          <View style={styles.specificationList}>
            {specificationItems.map((item, index) => (
              <View key={index} style={styles.specificationItem}>
                <Text style={[styles.specName, isDark && styles.specNameDark]}>
                  {item.name}
                </Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${item.rating}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.specRating}>{item.rating}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <MenuList items={inspectionItems} />

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.printReportButton}
            activeOpacity={0.8}
          >
            <Text style={styles.printReportText}>PRINT REPORT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.printSummaryButton,
              isDark && styles.printSummaryButtonDark,
            ]}
            activeOpacity={0.8}
          >
            <Text style={styles.printSummaryText}>PRINT SUMMARY</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: 16,
  },
  image: {
    width: "90%",
    height: "100%",
    alignSelf: "center",
  },
  titleContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  carTitle: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
    flex: 1,
  },
  carTitleDark: {
    color: "#FFFFFF",
  },
  location: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  locationDark: {
    color: "#FFFFFF",
  },
  specificationContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 12,
    marginBottom: 24,
    padding: 16,
  },
  specificationContainerDark: {
    backgroundColor: "#111111",
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
  specificationList: {
    marginTop: 16,
    gap: 12,
  },
  specificationItem: {
    marginBottom: 12,
  },
  specName: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  specNameDark: {
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
  specRating: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#DC3729",
    minWidth: 40,
    textAlign: "right",
  },
  bottomButtons: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 24,
    marginTop: 24,
  },
  printReportButton: {
    flex: 1,
    backgroundColor: "#DC3729",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  printReportText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  printSummaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DC3729",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  printSummaryButtonDark: {
    backgroundColor: "#111111",
  },
  printSummaryText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
    textTransform: "uppercase",
  },
});
