import BackArrow from "@/components/ui/svgs/BackArrow";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AuthLayoutProps {
  children: ReactNode;
  showBack?: boolean;
}

export function AuthLayout({ children, showBack = false }: AuthLayoutProps) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Image
        source={require("@/assets/images/AuthBg.png")}
        style={styles.backgroundImage}
        contentFit="cover"
        blurRadius={2}
        cachePolicy="memory-disk"
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.8)", "rgba(0,0,0,0.9)"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      {showBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <BackArrow />
          <Text style={styles.backText}>BACK</Text>
        </TouchableOpacity>
      )}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: 36,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  backButton: {
    paddingTop: 40,
    left: 24,
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginLeft: 8,
    fontFamily: "ChakraPetch_600SemiBold",
  },
});

