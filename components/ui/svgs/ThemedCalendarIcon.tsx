import React from "react";
import Svg, { Path } from "react-native-svg";
import { useColorScheme } from "@/hooks/use-color-scheme";

const ThemedCalendarIcon = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const strokeColor = isDark ? "#F4F4F4" : "#494949";

  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path
        d="M12.6667 2.66666H3.33333C2.59695 2.66666 2 3.26362 2 3.99999V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V3.99999C14 3.26362 13.403 2.66666 12.6667 2.66666Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.6667 1.33334V4.00001"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.33333 1.33334V4.00001"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 6.66666H14"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ThemedCalendarIcon;

