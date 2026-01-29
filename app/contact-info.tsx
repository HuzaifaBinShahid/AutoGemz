import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "../hooks/use-color-scheme";
import BackArrow from "../components/ui/svgs/BackArrow";
import MobileIcon from "../components/ui/svgs/MobileIcon";
import { Checkbox } from "../components/common/Checkbox";
import { AuctionListedModal } from "../components/modals/AuctionListedModal";
import { withToast } from "../services/apiHandler";
import { getAuctionImageUris, clearAuctionImageUris } from "../services/vehicles/imageStore";
import { sellVehicle, sellVehicleWithFormData } from "../services/vehicles";

function asString(p: string | string[] | undefined): string {
  return Array.isArray(p) ? p[0] ?? "" : p ?? "";
}

export default function ContactInfoScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const params = useLocalSearchParams<{
    type?: string;
    make?: string;
    model?: string;
    year?: string;
    transmission?: string;
    vin?: string;
    mileage?: string;
    description?: string;
    city?: string;
    state?: string;
    price?: string;
  }>();
  const flowType = asString(params.type);
  const make = asString(params.make);
  const model = asString(params.model);
  const year = asString(params.year);
  const transmission = asString(params.transmission);
  const vin = asString(params.vin);
  const mileage = asString(params.mileage);
  const description = asString(params.description);
  const city = asString(params.city);
  const state = asString(params.state);
  const price = asString(params.price);

  const [mobileNumber, setMobileNumber] = useState("");
  const [secondaryNumber, setSecondaryNumber] = useState("");
  const [allowWhatsApp, setAllowWhatsApp] = useState(false);
  const [freeInspection, setFreeInspection] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileError, setMobileError] = useState("");

  useEffect(() => {
    if (!fontsLoaded) return;
    if (flowType === "instant" && (!make || !model || !year || !transmission || !vin || !mileage || !description || !city)) {
      router.replace("/instant-offer");
    }
    if (flowType === "3step" && (!make || !model || !year || !transmission || !vin || !mileage || !description || !city || !state || !price)) {
      router.replace("/add-car-to-auction");
    }
  }, [fontsLoaded, flowType, make, model, year, transmission, vin, mileage, description, city, state, price, router]);

  const handleSubmit = async () => {
    const trimmed = mobileNumber.trim();
    if (!trimmed) {
      setMobileError("Mobile number is required");
      return;
    }
    setMobileError("");
    setIsSubmitting(true);
    try {
      if (flowType === "instant") {
        await withToast(
          sellVehicle({
            make,
            model,
            year: parseInt(year, 10),
            transmission,
            vin,
            mileage: parseInt(mileage, 10) || 0,
            description,
            mobileNumber: trimmed,
            allowWhatpsAppContact: allowWhatsApp,
            type: "instant",
            secondaryNumber: secondaryNumber.trim(),
            city,
          }),
          "Vehicle listing created successfully"
        );
      } else {
        const imageUris = getAuctionImageUris();
        const formData = new FormData();
        formData.append("make", make);
        formData.append("model", model);
        formData.append("year", year);
        formData.append("transmission", transmission);
        formData.append("vin", vin);
        formData.append("mileage", mileage);
        formData.append("description", description);
        formData.append("mobileNumber", trimmed);
        formData.append("allowWhatpsAppContact", String(allowWhatsApp));
        formData.append("type", "3step");
        formData.append("price", price);
        formData.append("secondaryNumber", secondaryNumber.trim());
        formData.append("city", city);
        formData.append("state", state);
        formData.append("freeinspectionRequest", String(freeInspection));
        imageUris.forEach((uri, index) => {
          const ext = uri.split(".").pop()?.toLowerCase() || "jpg";
          const mime = ext === "png" ? "image/png" : "image/jpeg";
          formData.append("images", { uri, type: mime, name: `image-${index}.${ext}` } as unknown as Blob);
        });
        await withToast(
          sellVehicleWithFormData(formData),
          "Vehicle listing created successfully"
        );
        clearAuctionImageUris();
      }
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  if (flowType === "instant" && (!make || !model || !year || !transmission || !vin || !mileage || !description || !city)) {
    return null;
  }

  if (flowType === "3step" && (!make || !model || !year || !transmission || !vin || !mileage || !description || !city || !state || !price)) {
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
          {flowType === "3step" ? "SELL YOUR CAR WITH 3 EASY & SIMPLE STEPS!" : "SELL SMARTER WITH AN INSTANT OFFER"}
        </Text>

        <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
          It&apos;s free and takes less than a minute
        </Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressLineContainer}>
            <View style={styles.progressLineWrapper}>
              {flowType === "3step" ? (
                <>
                  <View style={[styles.progressStep, styles.inactiveStep]} />
                  <View style={[styles.gap, isDark && styles.gapDark]} />
                  <View style={[styles.progressStep, styles.inactiveStep]} />
                  <View style={[styles.gap, isDark && styles.gapDark]} />
                  <View style={[styles.progressStep, styles.activeStep]} />
                </>
              ) : (
                <>
                  <View style={[styles.progressStep, styles.inactiveStep]} />
                  <View style={[styles.gap, isDark && styles.gapDark]} />
                  <View style={[styles.progressStep, styles.activeStep]} />
                </>
              )}
            </View>
          </View>
          <View style={styles.stepsContainer}>
            {flowType === "3step" ? (
              <>
                <View style={styles.stepItem}>
                  <View style={[styles.stepCircle, styles.inactiveCircle]} />
                  <Text style={[styles.progressLabel, styles.inactiveLabel]}>Info</Text>
                </View>
                <View style={styles.stepItem}>
                  <View style={[styles.stepCircle, styles.inactiveCircle]} />
                  <Text style={[styles.progressLabel, styles.inactiveLabel]}>Media</Text>
                </View>
                <View style={styles.stepItem}>
                  <View style={styles.stepCircle} />
                  <Text style={[styles.progressLabel, styles.activeLabel, isDark && styles.activeLabelDark]}>Contact</Text>
                </View>
              </>
            ) : (
              <>
                <View style={styles.stepItem}>
                  <View style={[styles.stepCircle, styles.inactiveCircle]} />
                  <Text style={[styles.progressLabel, styles.inactiveLabel]}>Info</Text>
                </View>
                <View style={styles.stepItem}>
                  <View style={styles.stepCircle} />
                  <Text style={[styles.progressLabel, styles.activeLabel, isDark && styles.activeLabelDark]}>Contact</Text>
                </View>
              </>
            )}
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
              onChangeText={(t) => { setMobileNumber(t); if (mobileError) setMobileError(""); }}
              keyboardType="phone-pad"
              editable={!isSubmitting}
            />
            {mobileError ? <Text style={styles.errorText}>{mobileError}</Text> : null}
          </View>

          <View style={styles.instructionContainer}>
            <MobileIcon />
            <Text style={[styles.instructionText, isDark && styles.instructionTextDark]}>
              Enter a genuine 11 digit mobile no. with format 03XXXXXXXXX. All inquires will come on this number.
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
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox checked={allowWhatsApp} onToggle={() => setAllowWhatsApp(!allowWhatsApp)} />
            <Text style={[styles.checkboxText, isDark && styles.checkboxTextDark]}>
              Allow WhatsApp Contact
            </Text>
          </View>

          {flowType === "3step" ? (
            <View style={styles.checkboxContainer}>
              <Checkbox checked={freeInspection} onToggle={() => setFreeInspection(!freeInspection)} />
              <Text style={[styles.checkboxText, isDark && styles.checkboxTextDark]}>
                Free Inspection Request
              </Text>
            </View>
          ) : null}
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          )}
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
  errorText: {
    marginTop: 6,
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#DC3729",
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
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});

