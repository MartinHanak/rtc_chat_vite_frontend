import { Box } from "@mui/material";
import { Video } from "./Video";
import { AudioFrequencyVisual } from "./AudioFrequencyVisual";
import { useSocketContext } from "../../context/SocketContext";
import { VideoAudioOverlay } from "./overlay/VideoAudioOverlay";

interface VideoAudioChat {
    username: string;
    socketId: string;
    stream: MediaStream;
    muted?: boolean;
}

export default function VideoAudioChat({ username, socketId, stream, muted }: VideoAudioChat) {

    const { room } = useSocketContext();

    return (
        <Box sx={{ aspectRatio: '16 / 9', position: 'relative' }}
        >
            <VideoAudioOverlay username={username} socketId={socketId} />

            {room.type === 'video' && <Video muted={muted} stream={stream} />}

            {room.type === 'audio' && <AudioFrequencyVisual muted={muted} stream={stream} />}

        </Box>
    );
}