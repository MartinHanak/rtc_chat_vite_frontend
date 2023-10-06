import { CardActions } from "@mui/material";

interface RoomCardActions {
    showMore: boolean;
}


export default function RoomCardActions({ showMore }: RoomCardActions) {
    return (
        <CardActions sx={{ alignSelf: 'end', justifySelf: 'end' }}>
            hello
        </CardActions>
    );
}