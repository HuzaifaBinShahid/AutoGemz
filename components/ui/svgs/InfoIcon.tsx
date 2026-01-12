import React from "react";
import Svg, { Path } from "react-native-svg";

const InfoIcon = () => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path
        d="M8 5.33333V8M8 10.6667H8.00667M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
        stroke="#DC3729"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default InfoIcon;
