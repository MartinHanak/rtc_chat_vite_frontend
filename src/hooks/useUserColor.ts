import { useState } from "react";
import assignUserColor from "../util/assignUserColor";
import convertHexRGB from "../util/convertHexRGB";

export default function useUserColor() {
  const [userColor, setUserColor] = useState<string | undefined>(
    convertHexRGB(assignUserColor())
  );

  const changeUserColor = (color: string) => {
    setUserColor(color);
  };

  return {
    userColor,
    changeUserColor,
  };
}
