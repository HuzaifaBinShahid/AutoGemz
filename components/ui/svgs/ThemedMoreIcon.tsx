import React from "react";
import Svg, { Path } from "react-native-svg";
import { useColorScheme } from "@/hooks/use-color-scheme";

const ThemedMoreIcon = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const strokeColor = isDark ? "#A5A5A5" : "#475569";

  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M4.16667 8.33325C3.25 8.33325 2.5 9.08325 2.5 9.99992C2.5 10.9166 3.25 11.6666 4.16667 11.6666C5.08333 11.6666 5.83333 10.9166 5.83333 9.99992C5.83333 9.08325 5.08333 8.33325 4.16667 8.33325Z"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <Path
        d="M15.8334 8.33325C14.9167 8.33325 14.1667 9.08325 14.1667 9.99992C14.1667 10.9166 14.9167 11.6666 15.8334 11.6666C16.75 11.6666 17.5 10.9166 17.5 9.99992C17.5 9.08325 16.75 8.33325 15.8334 8.33325Z"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <Path
        d="M9.99998 8.33325C9.08331 8.33325 8.33331 9.08325 8.33331 9.99992C8.33331 10.9166 9.08331 11.6666 9.99998 11.6666C10.9166 11.6666 11.6666 10.9166 11.6666 9.99992C11.6666 9.08325 10.9166 8.33325 9.99998 8.33325Z"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
    </Svg>
  );
};

export default ThemedMoreIcon;

