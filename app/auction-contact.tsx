import { Dropdown } from "@/components/common/Dropdown";
import BackArrow from "@/components/ui/svgs/BackArrow";
import MobileIcon from "@/components/ui/svgs/MobileIcon";
import { Checkbox } from "@/components/common/Checkbox";
import { AuctionListedModal } from "@/components/modals/AuctionListedModal";
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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuctionContactScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [requestInspection, setRequestInspection] = useState(true);
  const [mobileNumber, setMobileNumber] = useState("");
  const [secondaryNumber, setSecondaryNumber] = useState("");
  const [allowWhatsApp, setAllowWhatsApp] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
              <View style={[styles.progressStep, styles.activeStep]} />
              <View style={[styles.gap, isDark && styles.gapDark]} />
              <View style={[styles.progressStep, styles.activeStep]} />
            </View>
          </View>
          <View style={styles.stepsContainer}>
            <View style={styles.stepItem}>
              <View style={styles.stepCircle} />
              <Text style={[styles.progressLabel, styles.activeLabel, isDark && styles.activeLabelDark]}>Info</Text>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepCircle} />
              <Text style={[styles.progressLabel, styles.activeLabel, isDark && styles.activeLabelDark]}>Media</Text>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepCircle} />
              <Text style={[styles.progressLabel, styles.activeLabel, isDark && styles.activeLabelDark]}>Contact</Text>
            </View>
          </View>
        </View>

        <View style={[styles.formContainer, isDark && styles.formContainerDark]}>
          <View style={styles.sectionHeader}>
            <View style={styles.redLine} />
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
              LOCATION
            </Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              City <Text style={styles.asterisk}>*</Text>
            </Text>
            <Dropdown
              placeholder="ENTER CITY"
              options={["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad"]}
              value={city}
              onSelect={setCity}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              State <Text style={styles.asterisk}>*</Text>
            </Text>
            <Dropdown
              placeholder="SELECT STATE"
              options={["Sindh", "Punjab", "Khyber Pakhtunkhwa", "Balochistan"]}
              value={state}
              onSelect={setState}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox checked={requestInspection} onToggle={() => setRequestInspection(!requestInspection)} />
            <Text style={[styles.checkboxText, isDark && styles.checkboxTextDark]}>
              Request a free inspection
            </Text>
          </View>
        </View>

        <View style={[styles.formContainer, isDark && styles.formContainerDark]}>
          <View style={styles.sectionHeader}>
            <View style={styles.redLine} />
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
              CONTACT INFORMATION
            </Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              Mobile Number <Text style={styles.asterisk}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="MOBILE NUMBER"
              placeholderTextColor={isDark ? "#A5A5A5" : "#A5A5A5"}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.instructionContainer}>
            <MobileIcon />
            <Text style={[styles.instructionText, isDark && styles.instructionTextDark]}>
              Enter a genuine 11 digit mobile no. with format 03XXXXXXXXXXX. All inquires will come on this number.
            </Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              Secondary Number
            </Text>
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="SECONDARY NUMBER"
              placeholderTextColor={isDark ? "#A5A5A5" : "#A5A5A5"}
              value={secondaryNumber}
              onChangeText={setSecondaryNumber}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox checked={allowWhatsApp} onToggle={() => setAllowWhatsApp(!allowWhatsApp)} />
            <Text style={[styles.checkboxText, isDark && styles.checkboxTextDark]}>
              Allow WhatsApp Contact
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            setShowModal(true);
          }}
        >
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
      <AuctionListedModal
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
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
  formContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 24,
  },
  formContainerDark: {
    backgroundColor: "#111111",
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
  asterisk: {
    color: "#DC3729",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  inputDark: {
    backgroundColor: "#111111",
    borderColor: "#737779",
    color: "#FFFFFF",
  },
  instructionContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 8,
  },
  instructionText: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    lineHeight: 18,
  },
  instructionTextDark: {
    color: "#FFFFFF",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkboxText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  checkboxTextDark: {
    color: "#FFFFFF",
  },
  submitButton: {
    backgroundColor: "#DC3729",
    paddingVertical: 16,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});
