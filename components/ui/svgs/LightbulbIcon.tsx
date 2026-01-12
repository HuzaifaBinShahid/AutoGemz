import React from "react";
import Svg, { Path } from "react-native-svg";

const LightbulbIcon = () => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 2C7.24 2 5 4.24 5 7C5 8.5 5.5 9.87 6.35 10.95L7.5 12.5V15C7.5 15.55 7.95 16 8.5 16H11.5C12.05 16 12.5 15.55 12.5 15V12.5L13.65 10.95C14.5 9.87 15 8.5 15 7C15 4.24 12.76 2 10 2ZM11.5 14H8.5V13H11.5V14ZM9.5 11.5H10.5V9.5H9.5V11.5Z"
        fill="#DC3729"
      />
    </Svg>
  );
};

export default LightbulbIcon;
