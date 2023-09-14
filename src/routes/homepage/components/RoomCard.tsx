import { Box, CardActionArea, CardContent, Typography } from "@mui/material";
import { Room, RoomType } from "../../../types/room";
import RoomCardContainer from "./RoomCardContainer";

import ChatIcon from '@mui/icons-material/Chat';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import React from "react";
import { useNavigate } from "react-router-dom";

const typeToIcon: Record<RoomType, React.ReactNode> = {
    'video': <VideoChatIcon sx={{ fontSize: 80 }} />,
    'audio': <VoiceChatIcon sx={{ fontSize: 80 }} />,
    'text': <ChatIcon sx={{ fontSize: 80 }} />
};

interface RoomCard {
    room: Room;
}
export default function RoomCard({ room }: RoomCard) {

    const navigate = useNavigate();

    function handleRoomCardClick() {
        const encodedRoomName = encodeURIComponent(room.name);

        navigate(`/room/${encodedRoomName}`);
    }

    return (
        <RoomCardContainer>
            <CardActionArea onClick={handleRoomCardClick} sx={{ width: '100%', height: '100%' }}>

                <Box sx={{ minHeight: '33%', height: '33%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {room.type && typeToIcon[room.type]}
                </Box>

                <CardContent>
                    <Typography>{room.name}</Typography>
                </CardContent>

            </CardActionArea>
        </RoomCardContainer>
    );

}