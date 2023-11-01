import { Box, Typography } from "@mui/material";
import { Video } from "./Video";
import { AudioFrequencyVisual } from "./AudioFrequencyVisual";
import { useSocketContext } from "../context/SocketContext";
import VolumeControls from "./grid/VolumeControls";

interface VideoAudioChat {
    username: string;
    socketId: string;
    stream: MediaStream;
}

export default function VideoAudioChat({ username, socketId, stream }: VideoAudioChat) {

    const { room } = useSocketContext();

    return (
        <Box sx={{ aspectRatio: '16 / 9', position: 'relative' }}
        >
            <Typography variant="h4" sx={{ position: 'absolute', top: '0', right: '0' }}>
                {username}
                <VolumeControls socketId={socketId} />
            </Typography>

            {room.type === 'video' && <Video stream={stream} />}

            {room.type === 'audio' && <AudioFrequencyVisual stream={stream} />}

        </Box>
    );
}