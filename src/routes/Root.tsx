import { Outlet } from "react-router-dom";
import { AvailableRoomsContextProvider } from "./components/AvailableRoomsContext";

export default function Root() {

    return (
        <AvailableRoomsContextProvider>
            <main>
                Root for all routes

                <Outlet />
            </main>
        </AvailableRoomsContextProvider>
    );
}