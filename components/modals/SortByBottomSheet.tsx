import { useColorScheme } from "../../hooks/use-color-scheme";
import {
  ChakraPetch_600SemiBold,
  useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface SortByBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

export function SortByBottomSheet({ visible, onClose }: SortByBottomSheetProps) {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedOption, setSelectedOption] = useState("All");

  if (!fontsLoaded) {
    return null;
  }

  const options = ["All", "Unread", "Earlier"];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.container, isDark && styles.containerDark]}>
              <View style={styles.handle} />
              <Text style={[styles.title, isDark && styles.titleDark]}>
                SORT BY
              </Text>
              {options.map((option, index) => (
                <View key={option}>
                  <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => {
                      setSelectedOption(option);
                      onClose();
                    }}
                  >
                    <Text style={[styles.optionText, isDark && styles.optionTextDark]}>
                      {option}
                    </Text>
                    <View style={styles.radioContainer}>
                      <View
                        style={[
                          styles.radioOuter,
                          isDark && styles.radioOuterDark,
                          selectedOption === option && styles.radioOuterSelected,
                        ]}
                      >
                        {selectedOption === option && (
                          <View style={styles.radioInner} />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                  {index < options.length - 1 && (
                    <View style={[styles.separator, isDark && styles.separatorDark]} />
                  )}
                </View>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },
  containerDark: {
    backgroundColor: "#111111",
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E5E5",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    marginBottom: 24,
    textTransform: "uppercase",
  },
  titleDark: {
    color: "#FFFFFF",
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  optionTextDark: {
    color: "#FFFFFF",
  },
  radioContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterDark: {
    borderColor: "#737779",
  },
  radioOuterSelected: {
    borderColor: "#DC3729",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#DC3729",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  separatorDark: {
    backgroundColor: "#737779",
  },
});
