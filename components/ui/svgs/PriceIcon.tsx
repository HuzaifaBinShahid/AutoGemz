import React from "react";
import Svg, { Rect, Path } from "react-native-svg";

const PriceIcon = () => {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <Rect width="32" height="32" fill="#DC3729" />
      <Path
        d="M10.9365 18.3509L13.9565 21.3709C15.1965 22.6109 17.2098 22.6109 18.4565 21.3709L21.3832 18.4442C22.6232 17.2042 22.6232 15.1909 21.3832 13.9442L18.3565 10.9309C17.7232 10.2976 16.8498 9.95758 15.9565 10.0042L12.6232 10.1642C11.2898 10.2242 10.2298 11.2842 10.1632 12.6109L10.0032 15.9442C9.96317 16.8442 10.3032 17.7176 10.9365 18.3509Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.4898 16.1507C15.4103 16.1507 16.1565 15.4045 16.1565 14.484C16.1565 13.5636 15.4103 12.8174 14.4898 12.8174C13.5693 12.8174 12.8231 13.5636 12.8231 14.484C12.8231 15.4045 13.5693 16.1507 14.4898 16.1507Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M16.8231 19.484L19.4898 16.8174"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default PriceIcon;
