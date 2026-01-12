import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

const ElectricIcon = () => {
  return (
    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <G clipPath="url(#clip0_4283_9366)">
        <Path
          d="M12.9066 6.42755H8.19328L10.5433 0L3.36328 9.84364H8.07665L5.72661 16.2712L12.9066 6.42755Z"
          fill="#FFD83B"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4283_9366">
          <Rect width="16.2712" height="16.2712" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default ElectricIcon;
