import React from "react";
import Svg, { Rect, Path, Mask } from "react-native-svg";

const DropdownIcon = () => {
  return (
    <Svg width="48" height="42" viewBox="0 0 48 42" fill="none">
      <Rect width="48" height="42" fill="#DC3729" />
      <Path
        d="M31 18L24.7809 23.3306C24.3316 23.7158 23.6684 23.7158 23.2191 23.3306L17 18"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Mask id="path-2-inside-1_4283_8160" fill="white">
        <Path d="M0 0H48V42H0V0Z" />
      </Mask>
      <Path
        d="M0 0V-2H-2V0H0ZM48 0H50V-2H48V0ZM48 42V44H50V42H48ZM0 42H-2V44H0V42ZM0 0V2H48V0V-2H0V0ZM48 0H46V42H48H50V0H48ZM48 42V40H0V42V44H48V42ZM0 42H2V0H0H-2V42H0Z"
        fill="#DC3729"
        mask="url(#path-2-inside-1_4283_8160)"
      />
    </Svg>
  );
};

export default DropdownIcon;