import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";

interface NewsCardProps {
  image: any;
  date: string;
  author: string;
  title: string;
  description: string;
}

export function NewsCard({ image, date, author, title, description }: NewsCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Image source={image} style={styles.image} contentFit="cover" />
      <View style={styles.content}>
        <Text style={[styles.meta, isDark && styles.metaDark]}>
          {date} • BY {author}
        </Text>
        <Text style={[styles.title, isDark && styles.titleDark]}>{title}</Text>
        <Text style={[styles.description, isDark && styles.descriptionDark]} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    backgroundColor: "#FFFFFF",
    marginRight: 16,
    overflow: "hidden",
    flexDirection: "row",
  },
  containerDark: {
    backgroundColor: "#1F1F1F",
  },
  image: {
    width: 100,
    height: "100%",
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  meta: {
    fontSize: 10,
    fontFamily: "Mulish_400Regular",
    color: "#A5A5A5",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  metaDark: {
    color: "#A5A5A5",
  },
  title: {
    fontSize: 12,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  titleDark: {
    color: "#F4F4F4",
  },
  description: {
    fontSize: 10,
    fontFamily: "Mulish_400Regular",
    color: "#A5A5A5",
    lineHeight: 14,
  },
  descriptionDark: {
    color: "#A5A5A5",
  },
});

