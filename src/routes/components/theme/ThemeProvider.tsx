import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useLocalSettingsContext } from "../LocalSettingsContext";



export default function MyThemeProvider({ children }: { children: React.ReactNode; }) {
    const { theme } = useLocalSettingsContext();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}