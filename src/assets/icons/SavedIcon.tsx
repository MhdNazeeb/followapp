import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SavedIcon = ({ height = 40,width=20, color = "#000" }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 512 512"
      fill={color}
    >
      <Path d="M440.125,0H0v512h512V71.875L440.125,0z M281.6,31.347h31.347v94.041H281.6V31.347z M136.359,31.347h113.894v125.388 h94.041V31.347h32.392v156.735H136.359V31.347z M417.959,480.653H94.041V344.816h323.918V480.653z M417.959,313.469H94.041 v-31.347h323.918V313.469z M480.653,480.653h-31.347V250.775H62.694v229.878H31.347V31.347h73.665v188.082h303.02V31.347h19.108 l53.512,53.512V480.653z"/>
    </Svg>
  );
};

export default SavedIcon;
