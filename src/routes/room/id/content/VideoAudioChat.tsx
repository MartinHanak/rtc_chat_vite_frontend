import { Box, Typography } from "@mui/material";
import { Room } from "../../../../types/room";
import { Video } from "./Video";
import { AudioFrequencyVisual } from "./AudioFrequencyVisual";

interface VideoAudioChat {
    username: string;
    room: Room;
    stream: MediaStream;
}

export default function VideoAudioChat({ username, room, stream }: VideoAudioChat) {
    return (
        <Box sx={{ resize: 'both', overflow: 'hidden' }}>
            <Typography variant="h4"> {username} </Typography>

            {room.type === 'video' && <Video stream={stream} />}

            {room.type === 'audio' && <AudioFrequencyVisual stream={stream} />}

        </Box>
    );
}