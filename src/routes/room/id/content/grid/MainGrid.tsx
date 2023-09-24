import { Grid } from "@mui/material";
import { combinedUserState } from "../../../../../types/user";
import VideoAudioChat from "../VideoAudioChat";

interface MainGrid {
    rows: number;
    columns: number;
    streams: Map<string, combinedUserState>;
}

export default function MainGrid({ rows, columns, streams }: MainGrid) {

    const gridItemWidth = Math.max(1, Math.floor(12 / columns));
    const maxGridItems = rows * columns;

    return (
        <Grid container spacing={2} >
            {Array.from(streams.values()).map((streamInfo, index) => {

                if (index >= maxGridItems) {
                    return null;
                }

                // key forces rerender when columns or rows change
                return (
                    <Grid item xs={gridItemWidth} key={`mainGrid_${columns}x${rows}_${streamInfo.socketId}`}
                    >
                        <VideoAudioChat username={streamInfo.username} stream={streamInfo.stream} />
                    </Grid>
                );
            })}
        </Grid>
    );
}