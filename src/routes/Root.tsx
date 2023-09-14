import { Outlet } from "react-router-dom";
import { AvailableRoomsContextProvider } from "./components/AvailableRoomsContext";
import MyThemeProvider from "./components/theme/ThemeProvider";
import { Container, Typography } from "@mui/material";

export default function Root() {

    return (
        <AvailableRoomsContextProvider>
            <MyThemeProvider>
                <Container component={"main"}>

                    <Typography variant="h1">Root for all routes</Typography>

                    <Outlet />

                </Container>
            </MyThemeProvider>
        </AvailableRoomsContextProvider>
    );
}