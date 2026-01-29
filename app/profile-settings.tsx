import { Dropdown } from "../components/common/Dropdown";
import BackArrow from "../components/ui/svgs/BackArrow";
import CalendarIcon from "../components/ui/svgs/CalendarIcon";
import { useColorScheme } from "../hooks/use-color-scheme";
import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "expo-react-native-toastify";
import { useProfile, useUpdateProfile, useUpdateProfileAvatar } from "../services/auth/hooks";

export default function ProfileSettingsScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { data, isLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const updateAvatarMutation = useUpdateProfileAvatar();

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerDate, setDatePickerDate] = useState<Date>(() => new Date());
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  function formatDateForApi(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseDateFromApi(value: string | null | undefined): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

  useEffect(() => {
    if (data?.data) {
      const d = data.data;
      setFullName(d.fullName ?? "");
      setGender(d.gender ?? "");
      const dobStr = d.dateOfBirth;
      if (dobStr) {
        const parsed = parseDateFromApi(dobStr);
        if (parsed) {
          setDateOfBirth(formatDateForApi(parsed));
          setDatePickerDate(parsed);
        } else {
          setDateOfBirth("");
        }
      } else {
        setDateOfBirth("");
      }
      setCountry(d.country ?? "");
      setCity(d.city ?? "");
      setEmail(d.email ?? "");
      setUsername(d.username ?? "");
      setMobileNumber(d.phone ?? "");
    }
  }, [data]);

  if (!fontsLoaded) {
    return null;
  }

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={["top"]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#DC3729" />
        </View>
      </SafeAreaView>
    );
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <BackArrow />
          <Text style={[styles.backText, isDark && styles.backTextDark]}>PROFILE SETTINGS</Text>
        </TouchableOpacity>

        <View style={[styles.profileBox, isDark && styles.profileBoxDark]}>
          <View style={styles.profileImageContainer}>
            <Image
              source={
                data?.data?.avatar
                  ? { uri: data.data.avatar }
                  : require("../assets/images/icon.png")
              }
              style={styles.profileImage}
              contentFit="cover"
            />
          </View>
          <TouchableOpacity
            style={[
              styles.uploadButton,
              isDark && styles.uploadButtonDark,
              updateAvatarMutation.isPending && styles.uploadButtonDisabled,
            ]}
            onPress={async () => {
              const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== "granted") {
                Toast.error("Permission to access photos is required");
                return;
              }
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
                base64: true,
              });
              if (result.canceled || !result.assets[0]) return;
              const asset = result.assets[0];
              const mime = asset.mimeType ?? "image/jpeg";
              const base64 = asset.base64;
              if (!base64) {
                Toast.error("Could not get image data");
                return;
              }
              const dataUrl = `data:${mime};base64,${base64}`;
              updateAvatarMutation.mutate(dataUrl, {
                onSuccess: () => {
                  Toast.success("Profile picture updated successfully");
                },
                onError: (err) => {
                  const msg =
                    err && typeof err === "object" && "response" in err
                      ? (err as { response?: { data?: { message?: string } } })
                          .response?.data?.message
                      : err instanceof Error
                        ? err.message
                        : "Something went wrong";
                  Toast.error(msg ?? "Something went wrong");
                },
              });
            }}
            disabled={updateAvatarMutation.isPending}
          >
            {updateAvatarMutation.isPending ? (
              <ActivityIndicator color={isDark ? "#FFFFFF" : "#494949"} />
            ) : (
              <Text
                style={[
                  styles.uploadButtonText,
                  isDark && styles.uploadButtonTextDark,
                ]}
              >
                Upload Profile Picture
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              Full Name
            </Text>
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="FULL NAME"
              placeholderTextColor={isDark ? "#A5A5A5" : "#A5A5A5"}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              Gender
            </Text>
            <Dropdown
              placeholder="SELECT"
              options={["Male", "Female", "Other"]}
              value={gender}
              onSelect={setGender}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              Date of Birth
            </Text>
            <TouchableOpacity
              style={[
                styles.dateInputContainer,
                styles.dateTouchable,
                isDark && styles.dateTouchableDark,
              ]}
              onPress={() => {
                if (dateOfBirth) {
                  const p = parseDateFromApi(dateOfBirth);
                  if (p) setDatePickerDate(p);
                }
                setShowDatePicker(true);
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dateInput,
                  styles.dateInputText,
                  isDark && styles.inputDark,
                  !dateOfBirth && (isDark ? styles.datePlaceholderDark : styles.datePlaceholder),
                ]}
              >
                {dateOfBirth || "DATE OF BIRTH"}
              </Text>
              <View style={styles.calendarIconContainer}>
                <CalendarIcon />
              </View>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={datePickerDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(_: unknown, selectedDate?: Date) => {
                  if (Platform.OS === "android") setShowDatePicker(false);
                  if (selectedDate) {
                    setDatePickerDate(selectedDate);
                    setDateOfBirth(formatDateForApi(selectedDate));
                  }
                }}
              />
            )}
            {showDatePicker && Platform.OS === "ios" && (
              <View style={styles.iosDatePickerActions}>
                <TouchableOpacity
                  style={styles.iosDatePickerButton}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text style={styles.iosDatePickerButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              Country
            </Text>
            <Dropdown
              placeholder="SELECT"
              options={["Pakistan", "USA", "UK", "Canada"]}
              value={country}
              onSelect={setCountry}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>City</Text>
            <Dropdown
              placeholder="SELECT"
              options={["Karachi", "Lahore", "Islamabad", "Rawalpindi"]}
              value={city}
              onSelect={setCity}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              Email
            </Text>
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="EMAIL"
              placeholderTextColor={isDark ? "#A5A5A5" : "#A5A5A5"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              Username
            </Text>
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="USERNAME"
              placeholderTextColor={isDark ? "#A5A5A5" : "#A5A5A5"}
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.labelDark]}>
              Mobile Number
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
        </View>

        <TouchableOpacity
          style={[styles.saveButton, updateProfileMutation.isPending && styles.saveButtonDisabled]}
          onPress={() => {
            updateProfileMutation.mutate(
              {
                fullName: fullName.trim(),
                gender: gender || undefined,
                dateOfBirth: dateOfBirth || undefined,
                country: country || undefined,
                city: city || undefined,
                username: username.trim() || undefined,
              },
              {
                onSuccess: () => {
                  Toast.success("Profile updated successfully");
                },
                onError: (err) => {
                  const msg =
                    err && typeof err === "object" && "response" in err
                      ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
                      : err instanceof Error
                        ? err.message
                        : "Something went wrong";
                  Toast.error(msg ?? "Something went wrong");
                },
              }
            );
          }}
          disabled={updateProfileMutation.isPending}
        >
          {updateProfileMutation.isPending ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 24,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "black",
    marginLeft: 8,
    textTransform: "uppercase",
  },
  backTextDark: {
    color: "white",
  },
  profileBox: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    marginBottom: 24,
    alignItems: "center",
  },
  profileBoxDark: {
    backgroundColor: "#111111",
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#90EE90",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 24,
    width: "80%",
    alignItems: "center",
  },
  uploadButtonDark: {
    backgroundColor: "#111111",
    borderColor: "#FFFFFF",
  },
  uploadButtonDisabled: {
    opacity: 0.7,
  },
  uploadButtonText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  uploadButtonTextDark: {
    color: "#FFFFFF",
  },
  fieldContainer: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#111111",
    marginBottom: 8,
  },
  labelDark: {
    color: "#A5A5A5",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 0.3,
    borderColor: "#E5E5E5",
    paddingHorizontal: 16,
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  inputDark: {
    backgroundColor: "#FFFFFF0D",
    borderColor: "#FFFFFF2E",
    color: "#FFFFFF",
  },
  dateInputContainer: {
    position: "relative",
  },
  dateTouchable: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 0.3,
    borderColor: "#E5E5E5",
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 48,
  },
  dateTouchableDark: {
    backgroundColor: "#FFFFFF0D",
    borderColor: "#FFFFFF2E",
  },
  dateInput: {
    paddingRight: 50,
  },
  dateInputText: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    paddingRight: 34,
  },
  datePlaceholder: {
    color: "#A5A5A5",
  },
  datePlaceholderDark: {
    color: "#A5A5A5",
  },
  calendarIconContainer: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  iosDatePickerActions: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  iosDatePickerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  iosDatePickerButtonText: {
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#DC3729",
  },
  saveButton: {
    backgroundColor: "#DC3729",
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});
