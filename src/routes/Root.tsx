import { Outlet } from "react-router-dom";
import { AvailableRoomsContextProvider } from "./components/AvailableRoomsContext";
import MyThemeProvider from "./components/theme/ThemeProvider";
import { Box } from "@mui/material";
import Header from "./components/Header";
import { LocalSettingsProvider } from "./components/LocalSettingsContext";

export default function Root() {

    return (
        <AvailableRoomsContextProvider>
            <LocalSettingsProvider>
                <MyThemeProvider>
                    <Header />

                    <Box component="main" sx={{ minHeight: '100vh' }} >
                        <Outlet />
                    </Box>

                </MyThemeProvider>
            </LocalSettingsProvider>
        </AvailableRoomsContextProvider>
    );
}