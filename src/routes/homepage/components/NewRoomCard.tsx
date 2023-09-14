import { CardActionArea, CardContent, Typography } from "@mui/material";
import RoomCardContainer from "./RoomCardContainer";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";


export default function NewRoomCard() {

    const navigate = useNavigate();

    function handleNewRoomClick() {
        navigate('/room');
    }

    return (
        <RoomCardContainer>

            <CardActionArea onClick={handleNewRoomClick} sx={{ width: '100%', height: '100%' }}>
                <CardContent sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <AddIcon sx={{ fontSize: 80 }} />
                    <Typography>New Room</Typography>
                </CardContent>
            </CardActionArea>

        </RoomCardContainer>
    );
}