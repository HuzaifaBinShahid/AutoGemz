import { useColorScheme } from "../../hooks/use-color-scheme";
import {
    ChakraPetch_600SemiBold,
    useFonts,
} from "@expo-google-fonts/chakra-petch";
import { Mulish_400Regular } from "@expo-google-fonts/mulish";
import { useRouter } from "expo-router";
import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

interface AuctionBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

export function AuctionBottomSheet({ visible, onClose }: AuctionBottomSheetProps) {
  const [fontsLoaded] = useFonts({
    ChakraPetch_600SemiBold,
    Mulish_400Regular,
  });
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  if (!fontsLoaded) {
    return null;
  }

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
              <Text style={[styles.heading, isDark && styles.headingDark]}>
                HOW WOULD YOU LIKE TO AUCTION YOUR CAR?
              </Text>
              <Text style={[styles.paragraph, isDark && styles.paragraphDark]}>
                Choose whether you want to list your car for auction or get an instant offer instead. You can switch options anytime before posting.
              </Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.outlineButton]}
                  onPress={() => {
                    onClose();
                    router.push("/add-car-to-auction");
                  }}
                >
                  <Text style={[styles.buttonText, isDark && styles.buttonTextDark]}>ADD CAR TO AUCTION</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.solidButton]}
                  onPress={() => {
                    onClose();
                    router.push("/instant-offer");
                  }}
                >
                  <Text style={[styles.buttonText, isDark && styles.buttonTextDark]}>INSTANT OFFER</Text>
                </TouchableOpacity>
              </View>
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
    paddingTop: 32,
    paddingBottom: 40,
  },
  containerDark: {
    backgroundColor: "#1F1F1F",
  },
  heading: {
    fontSize: 18,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    marginBottom: 16,
    textTransform: "uppercase",
  },
  headingDark: {
    color: "#FFFFFF",
  },
  paragraph: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#ABABAB",
    marginBottom: 32,
    lineHeight: 20,
  },
  paragraphDark: {
    color: "#FFFFFF",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#DC3729",
    backgroundColor: "transparent",
  },
  solidButton: {
    backgroundColor: "#DC3729",
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "black",
    textTransform: "uppercase",
  },
  buttonTextDark: {
    color: "white",
  },
});

