import { PaletteMode, createTheme } from "@mui/material";
import { useMemo, useState } from "react";
import theme from "../routes/components/theme/theme";

export default function useColorTheme() {
  const [mode, setMode] = useState<PaletteMode>("light");

  const toggleColorTheme = () => {
    setMode((previousMode) => (previousMode === "light" ? "dark" : "light"));
  };

  const modifiedTheme = useMemo(() => {
    const newTheme = createTheme({
      ...theme,
      palette: {
        ...theme.palette,
        mode,
      },
    });

    console.log(newTheme);

    return newTheme;
  }, [mode]);

  return {
    theme: modifiedTheme,
    mode,
    toggleColorTheme,
  };
}
