import {Dimensions} from 'react-native';
export const getHeight = (percent: number) => {
  // console.log(Dimensions.get('window').height);
  
  return percent === 0 ? 0 : Dimensions.get('window').height / percent;
};

export const getWidth = (percent: number) => {
  // console.log(Dimensions.get('window').width);
  
  return percent === 0 ? 0 : Dimensions.get('window').width / percent;
};
export const lightenColor = (hex:any, percent:any) => {
  
  const num = parseInt(hex?.replace('#', ''), 16);
  const r = (num >> 16) + Math.round((255 - (num >> 16)) * percent / 100);
  const g = ((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * percent / 100);
  const b = (num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * percent / 100);

  // Ensure values stay within 0–255
  const newR = Math.min(255, Math.max(0, r));
  const newG = Math.min(255, Math.max(0, g));
  const newB = Math.min(255, Math.max(0, b));

  return `#${((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1).toUpperCase()}`;
};

// export const alphabetColors: { [key: string]: string } = {
//   A: "#000000", // Black
//   B: "#FFFF00", // Yellow
//   C: "#FF0000", // Red
//   D: "#00FF00", // Green
//   E: "#0000FF", // Blue
//   F: "#FF00FF", // Magenta
//   G: "#00FFFF", // Cyan
//   H: "#800000", // Maroon
//   I: "#008000", // Dark Green
//   J: "#000080", // Navy
//   K: "#FFA500", // Orange
//   L: "#FFC0CB", // Pink
//   M: "#800080", // Purple
//   N: "#A52A2A", // Brown
//   O: "#FFD700", // Gold
//   P: "#4B0082", // Indigo
//   Q: "#00FF7F", // Spring Green
//   R: "#FF4500", // Orange Red
//   S: "#1E90FF", // Dodger Blue
//   T: "#ADFF2F", // Green Yellow
//   U: "#FF69B4", // Hot Pink
//   V: "#9400D3", // Dark Violet
//   W: "#7FFF00", // Chartreuse
//   X: "#DC143C", // Crimson
//   Y: "#20B2AA", // Light Sea Green
//   Z: "#DAA520"  // Goldenrod
// };

// export function getColorByLetter(letter: string): string {
//   const upperLetter = letter.toUpperCase();
//   return alphabetColors[upperLetter] ?? "#000000";
// }



export const alphabetGradients: { [key: string]: [string, string] } = {
  A: ["#000000", "#434343"], // Black → Dark Gray
  B: ["#FFFF00", "#FFD700"], // Yellow → Gold
  C: ["#FF0000", "#FF6347"], // Red → Tomato
  D: ["#00FF00", "#32CD32"], // Green → Lime Green
  E: ["#0000FF", "#1E90FF"], // Blue → Dodger Blue
  F: ["#FF00FF", "#FF69B4"], // Magenta → Hot Pink
  G: ["#00FFFF", "#20B2AA"], // Cyan → Light Sea Green
  // ...and so on for all letters
};

export function getColorByLetter(letter: string): [string, string] {
  const upperLetter = letter.toUpperCase();
  
  return alphabetGradients[upperLetter] ?? ["#000000", "#434343"];
}
