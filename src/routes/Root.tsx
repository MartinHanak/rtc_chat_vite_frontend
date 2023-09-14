import { Outlet } from "react-router-dom";
import { AvailableRoomsContextProvider } from "./components/AvailableRoomsContext";
import MyThemeProvider from "./components/theme/ThemeProvider";
import { Container, Typography } from "@mui/material";
import Header from "./components/Header";

export default function Root() {

    return (
        <AvailableRoomsContextProvider>
            <MyThemeProvider>
                <Container>
                    <Header />

                    <main>
                        <Typography variant="h1">Root for all routes</Typography>

                        <Outlet />
                    </main>

                </Container>
            </MyThemeProvider>
        </AvailableRoomsContextProvider>
    );
}