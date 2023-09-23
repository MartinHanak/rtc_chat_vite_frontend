import { Grid } from "@mui/material";
import { combinedUserState } from "../../../../../types/user";

interface MainGrid {
    rows: number;
    columns: number;
    streams: Map<string, combinedUserState>;
}

export default function MainGrid({ rows, columns, streams }: MainGrid) {
    return (
        <Grid>
            {Array.from(streams.values()).map((streamInfo, index) => {
                return (
                    <div id={streamInfo.socketId}>{streamInfo.username}</div>
                );
            })}
        </Grid>
    );
}