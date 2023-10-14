import { PaletteMode } from "@mui/material";
import { PaletteColor, SimplePaletteColorOptions } from "@mui/material/styles";

// extend TypesScript MUI theme for a 3rd color
declare module "@mui/material/styles" {
  interface Palette {
    tertiary: PaletteColor;
    secondaryDefault: PaletteColor;
  }

  interface TypeBackground {
    light: string;
    secondaryDefault: string;
  }

  interface PaletteOptions {
    tertiary: SimplePaletteColorOptions;
  }

  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            light: "#6b9ff6",
            main: "#4788f4",
            dark: "#315faa",
            contrastText: "#fff",
          },
          secondary: {
            light: "#4db683",
            main: "#21a464",
            dark: "#177246",
            contrastText: "#000",
          },
          background: {
            default: "#fff",
            secondaryDefault: "#fff", //"#e0e0e0",
            paper: "#fff",
            light: "#f6f6f6",
          },
          tertiary: {
            light: "#ffd96f",
            main: "#ffd04b",
            dark: "#b29134",
            contrastText: "#fff",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            light: "#6b9ff6",
            main: "#4788f4",
            dark: "#315faa",
            contrastText: "#fff",
          },
          secondary: {
            light: "#4db683",
            main: "#21a464",
            dark: "#177246",
            contrastText: "#000",
          },
          tertiary: {
            light: "#ffd96f",
            main: "#ffd04b",
            dark: "#b29134",
            contrastText: "#fff",
          },
          background: {
            default: "#121212",
            paper: "#121212",
            secondaryDefault: "#1e1e1e",
            light: "#303030",
          },
          divider: "rgba(255, 255, 255, 0.12)",
          text: {
            primary: "#fff",
            secondary: "rgba(255, 255, 255, 0.7)",
            disabled: "rgba(255, 255, 255, 0.5)",
          },
          action: {
            active: "#fff",
            hover: "rgba(255, 255, 255, 0.08)",
            selected: "rgba(255, 255, 255, 0.16)",
            disabled: "rgba(255, 255, 255, 0.3)",
            disabledBackground: "rgba(255, 255, 255, 0.12)",
          },
        }),
  },
});

export default getDesignTokens;
