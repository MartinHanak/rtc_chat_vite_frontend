import { useState } from "react";
import assignUserColor from "../util/assignUserColor";

export default function useUserColor() {
  const [userColor, setUserColor] = useState<string | undefined>(
    assignUserColor()
  );

  const changeUserColor = (color: string) => {
    setUserColor(color);
  };

  return {
    userColor,
    changeUserColor,
  };
}
