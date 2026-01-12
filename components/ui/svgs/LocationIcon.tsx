import React from "react";
import Svg, { Rect, Path, Mask } from "react-native-svg";

const LocationIcon = () => {
  return (
    <Svg width="44" height="42" viewBox="0 0 44 42" fill="none">
      <Rect width="44" height="42" fill="#DC3729" />
      <Path
        d="M30.6983 14.8522L28.0576 27.3053C27.8583 28.1841 27.3389 28.4028 26.6008 27.9891L22.577 25.0241L20.6358 26.8916C20.4208 27.1066 20.2414 27.286 19.827 27.286L20.1164 23.1885L27.5733 16.4503C27.8976 16.1616 27.5026 16.001 27.0695 16.2903L17.8508 22.0953L13.882 20.8528C13.0189 20.5835 13.0033 19.9897 14.062 19.5753L29.5851 13.5947C30.3039 13.3253 30.9326 13.7541 30.6983 14.8522Z"
        fill="white"
      />
      <Mask id="path-2-inside-1_4283_7753" fill="white">
        <Path d="M0 0H44V42H0V0Z" />
      </Mask>
      <Path
        d="M0 0V-2H-2V0H0ZM44 0H46V-2H44V0ZM44 42V44H46V42H44ZM0 42H-2V44H0V42ZM0 0V2H44V0V-2H0V0ZM44 0H42V42H44H46V0H44ZM44 42V40H0V42V44H44V42ZM0 42H2V0H0H-2V42H0Z"
        fill="#DC3729"
        mask="url(#path-2-inside-1_4283_7753)"
      />
    </Svg>
  );
};

export default LocationIcon;
