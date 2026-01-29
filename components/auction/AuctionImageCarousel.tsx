import { Image } from "expo-image";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";
import LikeIcon from "../../components/ui/svgs/LikeIcon";
import ShareIcon from "../../components/ui/svgs/ShareIcon";
import GalleryIcon from "../../components/ui/svgs/GalleryIcon";

interface AuctionImageCarouselProps {
  images: any[];
}

export function AuctionImageCarousel({ images }: AuctionImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = Dimensions.get("window").width;

  const onScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <View key={index} style={{ width: screenWidth }}>
            <Image source={image} style={styles.image} contentFit="cover" />
          </View>
        ))}
      </ScrollView>
      <View style={styles.imageCounter}>
        <BlurView intensity={3.57} tint="dark" style={styles.counterBlur}>
          <GalleryIcon />
          <Text style={styles.counterText}>
            {currentIndex + 1}/{images.length}
          </Text>
        </BlurView>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <BlurView intensity={3.57} tint="dark" style={styles.buttonBlur}>
            <ShareIcon />
          </BlurView>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <BlurView intensity={3.57} tint="dark" style={styles.buttonBlur}>
            <LikeIcon />
          </BlurView>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 210,
    position: "relative",
  },
  image: {
    width: "95%",
    height: "100%",
    alignSelf: "center",
  },
  imageCounter: {
    position: "absolute",
    bottom: 16,
    left: 16,
  },
  counterBlur: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF1A",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  counterText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#FFFFFF",
  },
  actionButtons: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  buttonBlur: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF1A",
    justifyContent: "center",
    alignItems: "center",
  },
});
