import { Dropdown } from "../components/common/Dropdown";
import BackArrow from "../components/ui/svgs/BackArrow";
import CalendarIcon from "../components/ui/svgs/CalendarIcon";
import { useColorScheme } from "../hooks/use-color-scheme";
import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { Image } from "expo-image";
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

export default function ProfileSettingsScreen() {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

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
              source={require("../assets/images/icon.png")}
              style={styles.profileImage}
              contentFit="cover"
            />
          </View>
          <TouchableOpacity
            style={[styles.uploadButton, isDark && styles.uploadButtonDark]}
          >
            <Text
              style={[
                styles.uploadButtonText,
                isDark && styles.uploadButtonTextDark,
              ]}
            >
              Upload Profile Picture
            </Text>
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
            <View style={styles.dateInputContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.dateInput,
                  isDark && styles.inputDark,
                ]}
                placeholder="DATE OF BIRTH"
                placeholderTextColor={isDark ? "#A5A5A5" : "#A5A5A5"}
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
              />
              <View style={styles.calendarIconContainer}>
                <CalendarIcon />
              </View>
            </View>
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

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
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
  dateInput: {
    paddingRight: 50,
  },
  calendarIconContainer: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  saveButton: {
    backgroundColor: "#DC3729",
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});
