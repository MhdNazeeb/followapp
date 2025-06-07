import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const ProfileIcon = ({ height = 40,width=20, color = "#020202" }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Circle cx="12" cy="7.25" r="5.73" stroke={color} strokeWidth="1.91" strokeMiterlimit="10" />
      <Path 
        d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05" 
        stroke={color} strokeWidth="1.91" strokeMiterlimit="10" 
      />
    </Svg>
  );
};

export default ProfileIcon;
