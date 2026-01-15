import React from "react";
import Svg, { Rect } from "react-native-svg";

interface InspectionIconProps {
  color?: string;
}

export default function InspectionIcon({ color = "#DC3729" }: InspectionIconProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Rect width="24" height="24" rx="4" fill={color} />
    </Svg>
  );
}
