import { useColorScheme } from "../../../hooks/use-color-scheme";
import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

interface DropdownArrowProps {
  backgroundColor?: string;
}

const DropdownArrow = ({ backgroundColor }: DropdownArrowProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const color = backgroundColor ? "#FFFFFF" : (isDark ? "#FFFFFFB2" : "#111111");

  if (backgroundColor) {
    return (
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Rect width="24" height="24" rx="4" fill={backgroundColor} />
        <Path
          d="M7 10L12 15L17 10H7Z"
          fill={color}
        />
      </Svg>
    );
  }

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 10L12 15L17 10H7Z"
        fill={color}
      />
    </Svg>
  );
};

export default DropdownArrow;

