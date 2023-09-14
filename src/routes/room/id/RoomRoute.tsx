import { Alert, Box, CircularProgress } from "@mui/material";
import { useAvailableRoomsContext } from "../../components/AvailableRoomsContext";
import { useLocation } from "react-router-dom";
import Room from "./Room";

export default function RoomRoute() {

    const location = useLocation();
    const currentRoomName = decodeURIComponent(location.pathname.split('/').slice(-1)[0]);

    const { rooms, status } = useAvailableRoomsContext();

    // if it is a full-refresh or first load then the available rooms will be loading initially
    if (status === 'loading') {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 1, height: 1 }}>
                <CircularProgress />
            </Box>
        );
    }

    // room might now exist / deleted
    if (rooms.filter((room) => (room.name === currentRoomName)).length !== 1) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 1, height: 1 }}>
                <Alert severity='error' sx={{ width: '100%' }}>
                    {`Room ${currentRoomName} does not exist.`}
                </Alert>
            </Box>
        );
    }

    return (
        <Room room={rooms.filter((room) => (room.name === currentRoomName))[0]} />
    );
}