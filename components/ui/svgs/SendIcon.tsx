import React from "react";
import Svg, { Path } from "react-native-svg";

const SendIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
        stroke="#DC3729"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SendIcon;
