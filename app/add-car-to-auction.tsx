import { Dropdown } from "../components/common/Dropdown";
import BackArrow from "../components/ui/svgs/BackArrow";
import ThinkIcon from "../components/ui/svgs/ThinkIcon";
import { useColorScheme } from "../hooks/use-color-scheme";
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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddCarToAuctionScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [transmission, setTransmission] = useState("");
  const [registrationCity, setRegistrationCity] = useState("");
  const [mileage, setMileage] = useState("");
  const [description, setDescription] = useState("");
  const [charCount, setCharCount] = useState(1000);

  const handleDescriptionChange = (text: string) => {
    if (text.length <= 1000) {
      setDescription(text);
      setCharCount(1000 - text.length);
    }
  };

  const handleReset = () => {
    setDescription("");
    setCharCount(1000);
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
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <BackArrow />
          <Text style={styles.backText}>BACK</Text>
        </TouchableOpacity>

        <Text style={[styles.title, isDark && styles.titleDark]}>
          SELL YOUR CAR WITH 3 EASY & SIMPLE STEPS!
        </Text>

        <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
          It&apos;s free and takes less than a minute
        </Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressLineContainer}>
            <View style={styles.progressLineWrapper}>
              <View style={[styles.progressStep, styles.activeStep]} />
              <View style={[styles.gap, isDark && styles.gapDark]} />
              <View style={[styles.progressStep, styles.inactiveStep]} />
              <View style={[styles.gap, isDark && styles.gapDark]} />
              <View style={[styles.progressStep, styles.inactiveStep]} />
            </View>
          </View>
          <View style={styles.stepsContainer}>
            <View style={styles.stepItem}>
              <View style={styles.stepCircle} />
              <Text style={[styles.progressLabel, styles.activeLabel, isDark && styles.activeLabelDark]}>Info</Text>
            </View>
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, styles.inactiveCircle]} />
              <Text style={[styles.progressLabel, styles.inactiveLabel]}>Media</Text>
            </View>
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, styles.inactiveCircle]} />
              <Text style={[styles.progressLabel, styles.inactiveLabel]}>Contact</Text>
            </View>
          </View>
        </View>

        <View style={[styles.formContainer, isDark && styles.formContainerDark]}>
        <View style={styles.sectionHeader}>
          <View style={styles.redLine} />
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            CAR INFORMATION
          </Text>
        </View>

        <Text style={[styles.mandatoryText, isDark && styles.mandatoryTextDark]}>
          All fields marked with <Text style={styles.asterisk}>*</Text> are mandatory
        </Text>

        
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              Make <Text style={styles.asterisk}>*</Text>
            </Text>
            <Dropdown
              placeholder="SELECT MAKE"
              options={["Toyota", "Honda", "Ford", "BMW", "Mercedes"]}
              value={make}
              onSelect={setMake}
            />
          </View>

          <View style={styles.warningContainer}>
            <ThinkIcon />
            <Text style={[styles.warningText, isDark && styles.warningTextDark]}>
              We don&apos;t allow duplicates of same ad.
            </Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              Model <Text style={styles.asterisk}>*</Text>
            </Text>
            <Dropdown
              placeholder="SELECT MODEL"
              options={["Camry", "Civic", "Mustang", "X5", "C-Class"]}
              value={model}
              onSelect={setModel}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              Year <Text style={styles.asterisk}>*</Text>
            </Text>
            <Dropdown
              placeholder="YEAR"
              options={["2024", "2023", "2022", "2021", "2020"]}
              value={year}
              onSelect={setYear}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              Transmission <Text style={styles.asterisk}>*</Text>
            </Text>
            <Dropdown
              placeholder="SELECT TRANSMISSION"
              options={["Automatic", "Manual"]}
              value={transmission}
              onSelect={setTransmission}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              Registration City <Text style={styles.asterisk}>*</Text>
            </Text>
            <Dropdown
              placeholder="REGISTRATION CITY"
              options={["Karachi", "Lahore", "Islamabad", "Rawalpindi"]}
              value={registrationCity}
              onSelect={setRegistrationCity}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              Mileage (km) <Text style={styles.asterisk}>*</Text>
            </Text>
            <Dropdown
              placeholder="MILEAGE"
              options={["0-10,000", "10,000-50,000", "50,000-100,000", "100,000+"]}
              value={mileage}
              onSelect={setMileage}
            />
          </View>

          <View style={styles.fieldContainer}>
            <View style={styles.descriptionHeader}>
              <Text style={[styles.label, isDark && styles.labelDark]}>
                Description <Text style={styles.asterisk}>*</Text>
              </Text>
              <View style={styles.descriptionMeta}>
                <Text style={[styles.charCount, isDark && styles.charCountDark]}>
                  Remaining Characters {charCount}
                </Text>
                <TouchableOpacity onPress={handleReset}>
                  <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TextInput
              style={[
                styles.textArea,
                isDark && styles.textAreaDark,
              ]}
              placeholder="Describe Your car: Example: Alloy rim, first owner, genuine parts, maintained by authorized workshop, excellent mileage, original paint etc."
              placeholderTextColor={isDark ? "#A5A5A5" : "#A5A5A5"}
              multiline
              numberOfLines={6}
              value={description}
              onChangeText={handleDescriptionChange}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.warningContainer}>
            <ThinkIcon />
            <Text style={[styles.warningText, isDark && styles.warningTextDark]}>
              We don&apos;t allow promotional messages that are not relevant to the ad
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            router.push("/upload-media");
          }}
        >
          <Text style={styles.nextButtonText}>NEXT</Text>
        </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    marginBottom: 8,
    textTransform: "uppercase",
    textAlign: "center",
  },
  titleDark: {
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#ABABAB",
    marginBottom: 24,
    textAlign: "center",
  },
  subtitleDark: {
    color: "#ABABAB",
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressLineContainer: {
    marginBottom: 12,
  },
  progressLineWrapper: {
    flexDirection: "row",
  },
  progressStep: {
    flex: 1,
    height: 4,
    borderRadius: 1,
  },
  activeStep: {
    backgroundColor: "#DC3729",
  },
  inactiveStep: {
    backgroundColor: "#E5E5E5",
  },
  gap: {
    width: 8,
    height: 4,
    backgroundColor: "#F4F4F4",
    borderRadius: 1,
  },
  gapDark: {
    backgroundColor: "#000000",
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  stepCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#DC3729",
  },
  inactiveCircle: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#E5E5E5",
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#A5A5A5",
  },
  activeLabel: {
    color: "#DC3729",
  },
  activeLabelDark: {
    color: "#F4F4F4",
  },
  inactiveLabel: {
    color: "#A5A5A5",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  redLine: {
    width: 4,
    height: 20,
    backgroundColor: "#DC3729",
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textTransform: "uppercase",
  },
  sectionTitleDark: {
    color: "#FFFFFF",
  },
  mandatoryText: {
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#ABABAB",
    marginBottom: 16,
    textAlign: "center",
  },
  mandatoryTextDark: {
    color: "#ABABAB",
  },
  asterisk: {
    color: "#DC3729",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 24,
  },
  formContainerDark: {
    backgroundColor: "#111111",
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    marginBottom: 8,
  },
  labelDark: {
    color: "#FFFFFF99",
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  warningTextDark: {
    color: "#FFFFFF",
  },
  descriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  descriptionMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  charCount: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#ABABAB",
  },
  charCountDark: {
    color: "#ABABAB",
  },
  resetText: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#DC3729",
  },
  textArea: {
    minHeight: 120,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    padding: 16,
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    textAlignVertical: "top",
  },
  textAreaDark: {
    backgroundColor: "#111111",
    borderColor: "#737779",
    color: "#FFFFFF",
  },
  nextButton: {
    backgroundColor: "#DC3729",
    paddingVertical: 16,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});
