import { PaletteMode, createTheme } from "@mui/material";
import { useMemo, useState } from "react";
import getDesignTokens from "../routes/components/theme/theme";

export default function useColorTheme() {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const toggleColorTheme = () => {
    setMode((previousMode) => (previousMode === "light" ? "dark" : "light"));
  };

  const modifiedTheme = useMemo(() => {
    return createTheme(getDesignTokens(mode));
  }, [mode]);

  return {
    theme: modifiedTheme,
    mode,
    toggleColorTheme,
  };
}
