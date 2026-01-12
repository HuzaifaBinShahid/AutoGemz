import { CommonInput } from "@/components/common/CommonInput";
import { Dropdown } from "@/components/common/Dropdown";
import { FilterSlider } from "@/components/common/FilterSlider";
import FiltersDivider from "@/components/ui/FiltersDivider";
import CC1300Icon from "@/components/ui/svgs/1300CCIcon";
import BackArrow from "@/components/ui/svgs/BackArrow";
import BodyTypesIcon from "@/components/ui/svgs/BodyTypesIcon";
import DropdownIcon from "@/components/ui/svgs/DropdownIcon";
import FamilyCarsIcon from "@/components/ui/svgs/FamilyCarsIcon";
import ImportedCarsIcon from "@/components/ui/svgs/ImportedCarsIcon";
import LocationIcon from "@/components/ui/svgs/LocationIcon";
import MilageIcon from "@/components/ui/svgs/MilageIcon";
import PriceIcon from "@/components/ui/svgs/PriceIcon";
import SeaterIcon from "@/components/ui/svgs/SeaterIcon";
import SmallCarsIcon from "@/components/ui/svgs/SmallCarsIcon";
import YearsIcon from "@/components/ui/svgs/YearsIcon";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const bodyTypes = [
  { icon: FamilyCarsIcon, label: "Family Cars" },
  { icon: CC1300Icon, label: "1300cc cars" },
  { icon: SeaterIcon, label: "5 Seater" },
  { icon: ImportedCarsIcon, label: "Imported cars" },
  { icon: SmallCarsIcon, label: "Small cars" },
  { icon: CC1300Icon, label: "1500cc cars" },
];

const specifications = [
  "Engine Type",
  "Sunroof",
  "Parking Sensors",
  "Alloy Wheels",
  "Automatic",
  "Manual",
  "Heated Seats",
];

export default function FiltersScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [searchInput, setSearchInput] = useState("");
  const [city, setCity] = useState("Lahore");
  const [registeredIn, setRegisteredIn] = useState("Lahore");
  const [modelCategory, setModelCategory] = useState("Family Cars");
  const [transmission, setTransmission] = useState("Automatic Matic");
  const [seats, setSeats] = useState("Seats 2");
  const [colors, setColors] = useState("Black");
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [sliderResetKey, setSliderResetKey] = useState(0);

  const toggleSpec = (spec: string) => {
    if (selectedSpecs.includes(spec)) {
      setSelectedSpecs(selectedSpecs.filter((s) => s !== spec));
    } else {
      setSelectedSpecs([...selectedSpecs, spec]);
    }
  };

  const clearAll = () => {
    setSearchInput("");
    setCity("Lahore");
    setRegisteredIn("Lahore");
    setModelCategory("Family Cars");
    setTransmission("Automatic Matic");
    setSeats("Seats 2");
    setColors("Black");
    setSelectedSpecs([]);
    setSliderResetKey((prev) => prev + 1);
  };

  const handleApply = () => {
    router.push("/results");
  };

  if (!fontsLoaded) {
    return null;
  }

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
          FILTERS
        </Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchInputWrapper,
              isDark && styles.searchInputWrapperDark,
            ]}
          >
            <CommonInput
              placeholder="e.g. Honda in Lahore"
              style={[styles.searchInput, isDark && styles.searchInputDark]}
              containerStyle={styles.searchInputContainer}
              inputContainerStyle={styles.searchInputInner}
              value={searchInput}
              onChangeText={setSearchInput}
            />
          </View>
          <TouchableOpacity style={styles.searchIconButton}>
            <LocationIcon />
          </TouchableOpacity>
        </View>

        <FiltersDivider />

        <View style={[styles.section, isDark && styles.sectionDark]}>
          <Text
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            City
          </Text>
          <Dropdown
            placeholder="SELECT"
            options={["Lahore", "Karachi", "Islamabad", "Rawalpindi"]}
            value={city}
            onSelect={setCity}
            customIcon={<DropdownIcon />}
          />
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            Registered In
          </Text>
          <Dropdown
            placeholder="SELECT"
            options={["Lahore", "Karachi", "Islamabad", "Rawalpindi"]}
            value={registeredIn}
            onSelect={setRegisteredIn}
            customIcon={<DropdownIcon />}
          />
        </View>

        <FilterSlider
          key={`price-${sliderResetKey}`}
          icon={<PriceIcon />}
          title="Price"
          minLabel="PKR 0K"
          maxLabel="300K+"
          isDark={isDark}
          minValue={0}
          maxValue={300}
          formatValue={(val) => `PKR ${val}K${val >= 300 ? "+" : ""}`}
        />

        <FilterSlider
          key={`years-${sliderResetKey}`}
          icon={
            <View style={styles.redIconBg}>
              <YearsIcon />
            </View>
          }
          title="Years"
          minLabel="2006"
          maxLabel="2024"
          isDark={isDark}
          minValue={2006}
          maxValue={2024}
          formatValue={(val) => val.toString()}
        />

        <FilterSlider
          key={`mileage-${sliderResetKey}`}
          icon={
            <View style={styles.redIconBg}>
              <MilageIcon />
            </View>
          }
          title="Milage"
          minLabel="KM 0K"
          maxLabel="300K+"
          isDark={isDark}
          minValue={0}
          maxValue={300}
          formatValue={(val) => `KM ${val}K${val >= 300 ? "+" : ""}`}
        />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BodyTypesIcon />
            <Text
              style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
            >
              Body types
            </Text>
          </View>
          <View style={styles.bodyTypesGrid}>
            {bodyTypes.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <View key={index} style={styles.bodyTypeItem}>
                  <IconComponent />
                  <Text
                    style={[
                      styles.bodyTypeLabel,
                      isDark && styles.bodyTypeLabelDark,
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            Model Category
          </Text>
          <Dropdown
            placeholder="SELECT"
            options={[
              "Family Cars",
              "1300cc cars",
              "5 Seater",
              "Imported cars",
              "Small cars",
              "1500cc cars",
            ]}
            value={modelCategory}
            onSelect={setModelCategory}
            customIcon={<DropdownIcon />}
          />
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            Specifications
          </Text>
          <View style={styles.specsGrid}>
            {specifications.map((spec, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.specButton,
                  isDark && styles.specButtonDark,
                  selectedSpecs.includes(spec) && styles.specButtonSelected,
                ]}
                onPress={() => toggleSpec(spec)}
              >
                <Text
                  style={[
                    styles.specButtonText,
                    isDark && styles.specButtonTextDark,
                    selectedSpecs.includes(spec) &&
                      styles.specButtonTextSelected,
                  ]}
                >
                  {spec}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            Transmission type
          </Text>
          <Dropdown
            placeholder="SELECT"
            options={["Automatic Matic", "Manual", "CVT"]}
            value={transmission}
            onSelect={setTransmission}
            customIcon={<DropdownIcon />}
          />
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            Number of seats
          </Text>
          <Dropdown
            placeholder="SELECT"
            options={["Seats 2", "Seats 4", "Seats 5", "Seats 7"]}
            value={seats}
            onSelect={setSeats}
            customIcon={<DropdownIcon />}
          />
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            Colors
          </Text>
          <Dropdown
            placeholder="SELECT"
            options={["Black", "White", "Red", "Blue", "Silver", "Gray"]}
            value={colors}
            onSelect={setColors}
            customIcon={<DropdownIcon />}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>APPLY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.clearButton, isDark && styles.clearButtonDark]}
          onPress={clearAll}
        >
          <Text
            style={[
              styles.clearButtonText,
              isDark && styles.clearButtonTextDark,
            ]}
          >
            CLEAR ALL
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  containerDark: {
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 8,
  },
  headerText: {
    fontSize: 24,
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
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  searchInputWrapper: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    borderRadius: 8,
  },
  searchInputWrapperDark: {
    backgroundColor: "#111111",
  },
  searchInputContainer: {
    marginBottom: 0,
  },
  searchInputInner: {
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  searchIconButton: {
    width: 48,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    marginBottom: 0,
    color: "#494949",
    fontSize: 14,
  },
  searchInputDark: {
    marginBottom: 0,
    color: "#FFFFFF",
  },
  section: {
    marginBottom: 24,
    borderRadius: 8,
  },
  sectionDark: {
    borderStyle: "solid",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "#0000004D",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  redIconBg: {
    width: 32,
    height: 32,
    backgroundColor: "#DC3729",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    marginBottom: 6,
  },
  sectionTitleDark: {
    color: "#FFFFFF",
  },
  sliderContainer: {
    marginTop: 8,
  },
  sliderTrack: {
    height: 3,
    backgroundColor: "#E5E5E5",
    borderRadius: 2,
    marginBottom: 16,
  },
  sliderTrackDark: {
    backgroundColor: "#737779",
  },
  sliderHandles: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sliderHandle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#737779",
  },
  sliderHandleDark: {
    backgroundColor: "#F4F4F4",
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sliderLabel: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  sliderLabelDark: {
    color: "#FFFFFF",
  },
  bodyTypesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  bodyTypeItem: {
    width: "30%",
    alignItems: "center",
    gap: 8,
  },
  bodyTypeLabel: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    textAlign: "center",
  },
  bodyTypeLabelDark: {
    color: "#FFFFFF",
  },
  specsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  specButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  specButtonDark: {
    backgroundColor: "#231F20",
    borderColor: "#0000004D",
  },
  specButtonSelected: {
    backgroundColor: "#DC3729",
    borderColor: "#DC3729",
  },
  specButtonText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  specButtonTextDark: {
    color: "#FFFFFF99",
  },
  specButtonTextSelected: {
    color: "#FFFFFF",
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical:24,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#494949",
  },
  applyButton: {
    flex: 1,
    backgroundColor: "#DC3729",
    paddingVertical: 8,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  clearButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DC3729",
    paddingVertical: 8,
    alignItems: "center",
  },
  clearButtonDark: {
    backgroundColor: "#FFFFFF0D",
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
    textTransform: "uppercase",
  },
  clearButtonTextDark: {
    color: "#DC3729",
  },
});
