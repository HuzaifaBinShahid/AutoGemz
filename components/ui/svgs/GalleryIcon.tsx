import React from "react";
import Svg, { Path } from "react-native-svg";

const GalleryIcon = () => {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path
        d="M2 4C2 2.89543 2.89543 2 4 2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 6.5C6.55228 6.5 7 6.05228 7 5.5C7 4.94772 6.55228 4.5 6 4.5C5.44772 4.5 5 4.94772 5 5.5C5 6.05228 5.44772 6.5 6 6.5Z"
        fill="white"
      />
      <Path
        d="M2 10L5 7L8 10L11 7L14 10"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default GalleryIcon;
