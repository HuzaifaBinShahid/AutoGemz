import React, { useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface FilterSliderProps {
  icon: React.ReactNode;
  title: string;
  minLabel: string;
  maxLabel: string;
  isDark: boolean;
  minValue?: number;
  maxValue?: number;
  formatValue?: (value: number) => string;
}

const HANDLE_SIZE = 16;
const TRACK_HEIGHT = 3;

export function FilterSlider({
  icon,
  title,
  minLabel,
  maxLabel,
  isDark,
  minValue = 0,
  maxValue = 100,
  formatValue,
}: FilterSliderProps) {
  const [minVal, setMinVal] = useState(minValue);
  const [maxVal, setMaxVal] = useState(maxValue);
  const [sliderWidth, setSliderWidth] = useState(0);
  const sliderRef = useRef<View>(null);

  const minPosition = useRef(new Animated.Value(0)).current;
  const maxPosition = useRef(new Animated.Value(0)).current;
  const minPositionRef = useRef(0);
  const maxPositionRef = useRef(0);
  const minStartX = useRef(0);
  const maxStartX = useRef(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setSliderWidth(width);
    const maxPos = width - HANDLE_SIZE;
    maxPosition.setValue(maxPos);
    maxPositionRef.current = maxPos;
    setMaxVal(maxValue);
    setMinVal(minValue);
  };

  const getValueFromPosition = (position: number) => {
    if (sliderWidth === 0) return minValue;
    const trackWidth = sliderWidth - HANDLE_SIZE;
    const ratio = Math.max(0, Math.min(1, position / trackWidth));
    return Math.round(minValue + ratio * (maxValue - minValue));
  };

  const formatDisplayValue = (value: number) => {
    if (formatValue) return formatValue(value);
    return value.toString();
  };

  const minPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        minStartX.current = minPositionRef.current;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (sliderWidth === 0) return;
        const trackWidth = sliderWidth - HANDLE_SIZE;
        const newPosition = Math.max(
          0,
          Math.min(
            minStartX.current + gestureState.dx,
            maxPositionRef.current - HANDLE_SIZE
          )
        );
        minPosition.setValue(newPosition);
        minPositionRef.current = newPosition;
        const newValue = getValueFromPosition(newPosition);
        setMinVal(newValue);
      },
      onPanResponderRelease: () => {
        minStartX.current = minPositionRef.current;
      },
    })
  ).current;

  const maxPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        maxStartX.current = maxPositionRef.current;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (sliderWidth === 0) return;
        const trackWidth = sliderWidth - HANDLE_SIZE;
        const newPosition = Math.max(
          minPositionRef.current + HANDLE_SIZE,
          Math.min(
            maxStartX.current + gestureState.dx,
            sliderWidth - HANDLE_SIZE
          )
        );
        maxPosition.setValue(newPosition);
        maxPositionRef.current = newPosition;
        const newValue = getValueFromPosition(newPosition);
        setMaxVal(newValue);
      },
      onPanResponderRelease: () => {
        maxStartX.current = maxPositionRef.current;
      },
    })
  ).current;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        {icon}
        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
          {title}
        </Text>
        <Text
          style={[styles.rangeText, isDark && styles.rangeTextDark]}
        >
          {formatDisplayValue(minVal)} - {formatDisplayValue(maxVal)}
        </Text>
      </View>
      <View
        ref={sliderRef}
        style={styles.sliderContainer}
        onLayout={onLayout}
      >
        <View style={[styles.sliderTrack, isDark && styles.sliderTrackDark]} />
        <View style={styles.sliderHandlesContainer}>
          <Animated.View
            style={[
              styles.sliderHandleContainer,
              { transform: [{ translateX: minPosition }] },
            ]}
            {...minPanResponder.panHandlers}
          >
            <View style={[styles.sliderHandleRing, isDark && styles.sliderHandleRingDark]}>
              <View style={[styles.sliderHandleInner, isDark && styles.sliderHandleInnerDark]} />
            </View>
          </Animated.View>
          <Animated.View
            style={[
              styles.sliderHandleContainer,
              { transform: [{ translateX: maxPosition }] },
            ]}
            {...maxPanResponder.panHandlers}
          >
            <View style={[styles.sliderHandleRing, isDark && styles.sliderHandleRingDark]}>
              <View style={[styles.sliderHandleInner, isDark && styles.sliderHandleInnerDark]} />
            </View>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "ChakraPetch_600SemiBold",
    color: "#494949",
    marginBottom: 6,
    flex: 1,
  },
  sectionTitleDark: {
    color: "#FFFFFF",
  },
  rangeText: {
    fontSize: 14,
    fontFamily: "Mulish_400Regular",
    color: "#494949",
    marginBottom: 6,
  },
  rangeTextDark: {
    color: "#FFFFFF",
  },
  sliderContainer: {
    marginTop: 8,
    position: "relative",
    height: 20,
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
  },
  sliderTrack: {
    height: TRACK_HEIGHT,
    backgroundColor: "#737779",
    borderRadius: 2,
    width: "100%",
  },
  sliderTrackDark: {
    backgroundColor: "#737779",
  },
  sliderHandlesContainer: {
    position: "absolute",
    width: "100%",
    height: HANDLE_SIZE,
    top: (20 - HANDLE_SIZE) / 2,
  },
  sliderHandleContainer: {
    position: "absolute",
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderHandleRing: {
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    borderRadius: HANDLE_SIZE / 2,
    borderWidth: 2,
    borderColor: "#737779",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  sliderHandleRingDark: {
    borderColor: "#737779",
  },
  sliderHandleInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000000",
  },
  sliderHandleInnerDark: {
    backgroundColor: "#000000",
  },
});
