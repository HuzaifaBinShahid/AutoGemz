import BackArrow from "../components/ui/svgs/BackArrow";
import TickIcon from "../components/ui/svgs/TickIcon";
import UploadMediaIcon from "../components/ui/svgs/UploadMediaIcon";
import { useColorScheme } from "../hooks/use-color-scheme";
import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { clearAuctionImageUris, setAuctionImageUris } from "../services/vehicles/imageStore";

function asString(p: string | string[] | undefined): string {
  return Array.isArray(p) ? p[0] ?? "" : p ?? "";
}

export default function UploadMediaScreen() {
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
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (fontsLoaded && asString(params.type) !== "3step") {
      router.replace("/add-car-to-auction");
    }
  }, [fontsLoaded, params.type, router]);

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length > 0) {
      const uris = result.assets.map((a) => a.uri);
      setImageUris((prev) => [...prev, ...uris].slice(0, 20));
      if (errors.images) setErrors((e) => ({ ...e, images: undefined }));
    }
  };

  const removeImage = (index: number) => {
    setImageUris((prev) => prev.filter((_, i) => i !== index));
  };

  if (!fontsLoaded) {
    return null;
  }

  if (asString(params.type) !== "3step") {
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
              <View style={[styles.progressStep, styles.inactiveStep]} />
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
              <View style={[styles.stepCircle, styles.inactiveCircle]} />
              <Text style={[styles.progressLabel, styles.inactiveLabel]}>Contact</Text>
            </View>
          </View>
        </View>

        <View style={[styles.formContainer, isDark && styles.formContainerDark]}>
          <View style={styles.sectionHeader}>
            <View style={styles.redLine} />
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
              UPLOAD MEDIA
            </Text>
          </View>

          <View style={[styles.uploadBox, isDark && styles.uploadBoxDark]}>
            <UploadMediaIcon />
            <TouchableOpacity style={styles.addPhotosButton} onPress={pickImages}>
              <Text style={styles.addPhotosButtonText}>+ ADD PHOTOS</Text>
            </TouchableOpacity>
            <Text style={[styles.maxLimitText, isDark && styles.maxLimitTextDark]}>
              (Max limit 5 MB per image)
            </Text>
            {imageUris.length > 0 && (
              <View style={styles.previewRow}>
                {imageUris.map((uri, index) => (
                  <View key={index} style={styles.previewWrap}>
                    <Image source={{ uri }} style={styles.previewImg} />
                    <TouchableOpacity style={styles.removeBtn} onPress={() => removeImage(index)}>
                      <Text style={styles.removeBtnText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
            {errors.images ? <Text style={styles.errorText}>{errors.images}</Text> : null}
          </View>

          <View style={styles.instructionsContainer}>
            <View style={styles.instructionItem}>
              <TickIcon />
              <Text style={[styles.instructionText, isDark && styles.instructionTextDark]}>
                Adding at least 8 pictures improves the chances for a quick sale.
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <TickIcon />
              <Text style={[styles.instructionText, isDark && styles.instructionTextDark]}>
                Adding clear Front, Back and Interior pictures of your car increases the quality of your Ad and gets you noticed more.
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <TickIcon />
              <Text style={[styles.instructionText, isDark && styles.instructionTextDark]}>
                Photos should be in &apos;jpeg, jpg, png, gif&apos; format only.
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <TickIcon />
              <Text style={[styles.instructionText, isDark && styles.instructionTextDark]}>
                Pictures should be 800x600 centre frame image
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            if (imageUris.length === 0) {
              setErrors({ images: "Add at least one image" });
              return;
            }
            setAuctionImageUris(imageUris);
            router.push({
              pathname: "/contact-info",
              params: {
                type: "3step",
                make: asString(params.make),
                model: asString(params.model),
                year: asString(params.year),
                transmission: asString(params.transmission),
                vin: asString(params.vin),
                mileage: asString(params.mileage),
                description: asString(params.description),
                city: asString(params.city),
                state: asString(params.state),
                price: asString(params.price),
              },
            });
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
    marginBottom: 24,
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
  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    minHeight: 200,
  },
  uploadBoxDark: {
    borderColor: "#737779",
  },
  addPhotosButton: {
    backgroundColor: "#DC3729",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  addPhotosButtonText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  previewRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },
  previewWrap: {
    width: 72,
    height: 72,
    position: "relative",
  },
  previewImg: {
    width: 72,
    height: 72,
    borderRadius: 4,
  },
  removeBtn: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#DC3729",
    alignItems: "center",
    justifyContent: "center",
  },
  removeBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 18,
  },
  errorText: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#DC3729",
  },
  maxLimitText: {
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#ABABAB",
  },
  maxLimitTextDark: {
    color: "#ABABAB",
  },
  instructionsContainer: {
    gap: 16,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    lineHeight: 20,
  },
  instructionTextDark: {
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
