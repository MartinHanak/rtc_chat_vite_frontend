import {
  PaletteColor,
  SimplePaletteColorOptions,
  createTheme,
} from "@mui/material/styles";

// extend TypesScript MUI theme for a 3rd color
declare module "@mui/material/styles" {
  interface Palette {
    tertiary: PaletteColor;
  }

  interface PaletteOptions {
    tertiary: SimplePaletteColorOptions;
  }
}

// A custom theme for this app
const theme = createTheme({
  palette: {
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
  },
});

export default theme;
