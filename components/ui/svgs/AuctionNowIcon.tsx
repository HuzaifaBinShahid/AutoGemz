import React from "react";
import Svg, {
  G,
  Rect,
  Path,
  Defs,
  Filter,
  FeFlood,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeBlend,
} from "react-native-svg";

const AuctionNowIcon = () => {
  return (
    <Svg width="118" height="118" viewBox="0 0 118 118" fill="none">
      <G >
        <Rect x="32" y="20" width="53.8563" height="53.8563" rx="26.9282" fill="#DC3729" />
      </G>
      <Path fill-rule="evenodd" clip-rule="evenodd" d="M59 33.4697C60.0493 33.4697 60.9 34.3204 60.9 35.3697V44.8697H70.4C71.4493 44.8697 72.3 45.7204 72.3 46.7697C72.3 47.8191 71.4493 48.6697 70.4 48.6697H60.9V58.1697C60.9 59.2191 60.0493 60.0697 59 60.0697C57.9506 60.0697 57.1 59.2191 57.1 58.1697V48.6697H47.6C46.5506 48.6697 45.7 47.8191 45.7 46.7697C45.7 45.7204 46.5506 44.8697 47.6 44.8697L57.1 44.8697V35.3697C57.1 34.3204 57.9506 33.4697 59 33.4697Z" fill="white" />
      <Defs>
        <Filter id="filter0_d_4274_14936" x="0" y="0" width="117.856" height="117.856" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <FeFlood flood-opacity="0" result="BackgroundImageFix" />
          <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <FeOffset dy="12" />
          <FeGaussianBlur stdDeviation="16" />
          <FeColorMatrix type="matrix" values="0 0 0 0 0.213889 0 0 0 0 0.2475 0 0 0 0 0.366667 0 0 0 0.25 0" />
          <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4274_14936" />
          <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4274_14936" result="shape" />
        </Filter>
      </Defs>
    </Svg>
  );
};

export default AuctionNowIcon;
