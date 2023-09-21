import { Box, BoxProps, CardActionArea, PaletteColor, styled } from "@mui/material";
import { Room, RoomType } from "../../../types/room";
import RoomCardContainer from "./RoomCardContainer";

import ChatIcon from '@mui/icons-material/Chat';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import React from "react";
import { useNavigate } from "react-router-dom";
import RoomCardContent from "./RoomCardContent";

const typeToIcon: Record<RoomType, React.ReactNode> = {
    'video': <VideoChatIcon sx={{ fontSize: 80, color: "primary.dark" }} />,
    'audio': <VoiceChatIcon sx={{ fontSize: 80, color: "secondary.dark" }} />,
    'text': <ChatIcon sx={{ fontSize: 80, color: "tertiary.dark" }} />
};

interface StyledRoomCardHeaderProps extends BoxProps {
    roomType: RoomType;
}

const StyledRoomCardHeader = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'roomType',
})<StyledRoomCardHeaderProps>(
    ({ roomType, theme }) => {

        let color: PaletteColor;
        switch (roomType) {
            case 'video':
                color = theme.palette['primary'];
                break;
            case 'audio':
                color = theme.palette['secondary'];
                break;
            default:
                color = theme.palette['tertiary'];
                break;
        }

        return {
            padding: theme.spacing(2),
            margin: `${theme.spacing(1)} ${theme.spacing(1)} 0 ${theme.spacing(1)}`,
            borderRadius: theme.shape.borderRadius,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: color.light
        };
    });

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
            <CardActionArea onClick={handleRoomCardClick} sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'stretch' }}>

                <StyledRoomCardHeader roomType={room.type}>
                    {room.type && typeToIcon[room.type]}
                </StyledRoomCardHeader>

                <RoomCardContent name={room.name} description={room.description} />

            </CardActionArea>
        </RoomCardContainer>
    );

}