import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import Svg, { Path } from "react-native-svg";

const DropdownArrow = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const color = isDark ? "#FFFFFFB2" : "#111111";

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

