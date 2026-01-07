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
import { useColorScheme } from "@/hooks/use-color-scheme";
import AccountCreatedIcon from "@/components/ui/svgs/AccountCreatedIcon";

interface AuctionListedModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AuctionListedModal({ visible, onClose }: AuctionListedModalProps) {
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
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.modal, isDark && styles.modalDark]}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={[styles.closeText, isDark && styles.closeTextDark]}>×</Text>
              </TouchableOpacity>

              <View style={styles.iconContainer}>
                <AccountCreatedIcon />
              </View>

              <Text style={[styles.heading, isDark && styles.headingDark]}>
                YOUR CAR HAS BEEN LISTED FOR AUCTION!
              </Text>

              <Text style={[styles.paragraph, isDark && styles.paragraphDark]}>
                Great work! Your auction is now live — buyers can start placing bids right away.
              </Text>

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() => {
                    onClose();
                    router.push("/(tabs)");
                  }}
                >
                  <Text style={styles.primaryButtonText}>VIEW MY AUCTION</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.secondaryButton, isDark && styles.secondaryButtonDark]}
                  onPress={onClose}
                >
                  <Text style={[styles.secondaryButtonText, isDark && styles.secondaryButtonTextDark]}>
                    CANCEL
                  </Text>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modal: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    maxWidth: 400,
    padding: 24,
    alignItems: "center",
  },
  modalDark: {
    backgroundColor: "#111111",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    fontSize: 24,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
  },
  closeTextDark: {
    color: "#FFFFFF",
  },
  iconContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  heading: {
    fontSize: 20,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    textAlign: "center",
    marginBottom: 16,
    textTransform: "uppercase",
    lineHeight: 28,
  },
  headingDark: {
    color: "#FFFFFF",
  },
  paragraph: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#ABABAB",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 20,
  },
  paragraphDark: {
    color: "#FFFFFF",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#DC3729",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DC3729",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonDark: {
    backgroundColor: "#111111",
    borderColor: "#FFFFFF",
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#DC3729",
    textTransform: "uppercase",
  },
  secondaryButtonTextDark: {
    color: "#FFFFFF",
  },
});

