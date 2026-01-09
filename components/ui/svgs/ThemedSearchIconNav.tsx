import React from "react";
import Svg, { Path } from "react-native-svg";
import { useColorScheme } from "@/hooks/use-color-scheme";

interface ThemedSearchIconNavProps {
  active?: boolean;
}

const ThemedSearchIconNav = ({ active = false }: ThemedSearchIconNavProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const strokeColor = active ? "#DC3729" : (isDark ? "#A5A5A5" : "#475569");

  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ThemedSearchIconNav;

