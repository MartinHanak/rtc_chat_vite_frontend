import hexRgb from "hex-rgb";

export default function convertHexRGB(input: string) {
  const RGBvalues = hexRgb(input);

  if (RGBvalues.alpha === 1) {
    return `rgb(${RGBvalues.red}, ${RGBvalues.green}, ${RGBvalues.blue})`;
  } else {
    return `rgba(${RGBvalues.red}, ${RGBvalues.green}, ${RGBvalues.blue}, ${RGBvalues.alpha})`;
  }
}
