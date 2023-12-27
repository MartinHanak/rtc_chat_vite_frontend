import { Box, BoxProps, Card, CardActionArea, Modal, PaletteColor, styled } from "@mui/material";
import { Room, RoomType } from "../../../types/room";
import RoomCardContainer from "./RoomCardContainer";

import ChatIcon from '@mui/icons-material/Chat';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import React, { useMemo, useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import RoomCardContent from "./RoomCardContent";
import RoomCardActions from "./RoomCardActions";
import { possibleColors } from "../../../types/mui";


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

const maxCharLimit = 90;

export default function RoomCard({ room }: RoomCard) {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const showMore = useMemo(() => {
        if (room.description.length > maxCharLimit) {
            return true;
        } else {
            return false;
        }
    }, [room]);

    function toggleModal() {
        setShowModal((prev) => !prev);
    }

    function handleCloseModal(e: MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setShowModal(false);
    }


    function handleRoomCardClick() {
        const encodedRoomName = encodeURIComponent(room.name);

        navigate(`/room/${encodedRoomName}`);
    }

    function getColor(type: RoomType) {
        let color: possibleColors = 'primary';
        switch (type) {
            case 'video':
                color = "primary";
                break;
            case 'audio':
                color = "secondary";
                break;
            case 'text':
                color = "tertiary";
                break;
        }
        return color;
    }

    return (
        <RoomCardContainer>
            <CardActionArea onClick={handleRoomCardClick} sx={{
                width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch'

            }} >

                <StyledRoomCardHeader roomType={room.type}>
                    {room.type && typeToIcon[room.type]}
                </StyledRoomCardHeader>

                <RoomCardContent name={room.name} description={room.description} maxCharLimit={maxCharLimit} />

                <RoomCardActions showMore={showMore} time={room.createdAt} toggleModal={toggleModal} color={getColor(room.type)} language={'test'} />

                <Modal
                    open={showModal}
                    onClose={handleCloseModal}
                >
                    <Box
                        component={Card}
                        onClick={handleCloseModal}
                        sx={{
                            width: '100%',
                            maxWidth: '320px',
                            height: 'min-content',
                            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}>
                        <StyledRoomCardHeader roomType={room.type}>
                            {room.type && typeToIcon[room.type]}
                        </StyledRoomCardHeader>

                        <RoomCardContent name={room.name} description={room.description} maxCharLimit={1000} />
                    </Box>
                </Modal>


            </CardActionArea>
        </RoomCardContainer >
    );

}