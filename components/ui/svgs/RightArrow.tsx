import React from "react";
import Svg, { Path } from "react-native-svg";
import { useColorScheme } from "../../../hooks/use-color-scheme";

const RightArrow = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const strokeColor = isDark ? "#FFFFFF" : "#494949";

  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.5 15L12.5 10L7.5 5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default RightArrow;
