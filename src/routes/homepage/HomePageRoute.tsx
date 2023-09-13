import { Typography } from "@mui/material";
import RoomCatalog from "./components/RoomCatalog";

export default function HomePageRoute() {
    return (
        <>
            <Typography variant="h2">Select or create a new room</Typography>

            <RoomCatalog />
        </>
    );
}