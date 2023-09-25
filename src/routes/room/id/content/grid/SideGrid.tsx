import { Stack } from "@mui/material";
import { combinedUserState } from "../../../../../types/user";
import VideoAudioChat from "../VideoAudioChat";

interface SideGrid {
    streams: Map<string, combinedUserState>;
    offset: number;
}

export default function SideGrid({ streams, offset }: SideGrid) {

    return (
        <Stack sx={{
            position: "fixed",
            zIndex: 9999,
            bottom: `calc(${offset}px + 16px )`,
            left: theme => theme.spacing(2),
            height: "auto", width: '20%',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            gap: theme => theme.spacing(2),
            backgroundColor: theme => theme.palette.action.focus
        }}>
            {Array.from(streams.values()).map((streamInfo) => {
                return (
                    <VideoAudioChat key={streamInfo.socketId} username={streamInfo.username} stream={streamInfo.stream} />
                );
            })}
        </Stack>
    );
}