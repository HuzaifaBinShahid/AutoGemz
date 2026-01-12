import React from "react";
import Svg, { G, Path, Rect, Defs, ClipPath } from "react-native-svg";

const DetailLocationIcon = () => {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <G clipPath="url(#clip0_4283_8743)">
        <Path
          d="M8.67383 1.76367H8.66699C6.28445 1.76367 3.62335 3.15747 2.92871 6.21289C2.14534 9.66776 4.25285 12.6437 6.29102 14.6035L6.29199 14.6055C6.95344 15.248 7.80982 15.5693 8.66699 15.5693C9.52367 15.5693 10.3802 15.2479 11.0498 14.6035C13.024 12.7053 15.0634 9.84645 14.4766 6.52832L14.4121 6.20605C13.7179 3.15146 11.0506 1.76367 8.67383 1.76367ZM8.66699 4.6709C10.1997 4.67102 11.4414 5.91356 11.4414 7.44629C11.4412 8.97884 10.1996 10.2206 8.66699 10.2207C7.13431 10.2207 5.89181 8.97892 5.8916 7.44629C5.8916 5.91348 7.13418 4.6709 8.66699 4.6709Z"
          fill="#DC3729"
          stroke="#DC3729"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4283_8743">
          <Rect
            width="17.3333"
            height="17.3333"
            fill="white"
            transform="matrix(-1 0 0 1 17.3335 0)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default DetailLocationIcon;
