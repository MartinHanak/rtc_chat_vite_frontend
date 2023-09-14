import { CardContent, CircularProgress } from "@mui/material";
import RoomCardContainer from "./RoomCardContainer";

export default function LoadingRoomCard() {
    return (
        <RoomCardContainer>
            <CardContent sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </CardContent>
        </RoomCardContainer>
    );
}