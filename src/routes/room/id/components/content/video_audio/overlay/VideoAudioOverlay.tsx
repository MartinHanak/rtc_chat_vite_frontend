import { Box, Typography } from "@mui/material";
import VolumeControls from "./VolumeControls";


interface VideoAudioOverlay {
    username: string;
    socketId: string;
}

export function VideoAudioOverlay({ username, socketId }: VideoAudioOverlay) {
    return <Box sx={{ position: 'absolute', top: '0', right: '0' }}>
        <Typography variant="h4" >
            {username}
        </Typography>
        <VolumeControls socketId={socketId} />
    </Box>;
}