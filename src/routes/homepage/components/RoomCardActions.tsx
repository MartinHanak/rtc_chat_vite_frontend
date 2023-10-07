import { Box, Button, CardActions, Typography } from "@mui/material";
import { MouseEvent, useMemo } from "react";
import { possibleColors } from "../../../types/mui";

interface RoomCardActions {
    showMore: boolean;
    time: number;
    toggleModal: () => void;
    color: possibleColors;
}


export default function RoomCardActions({ showMore, time, toggleModal, color }: RoomCardActions) {

    const toggleModalWithoutPropagation = (e: MouseEvent<HTMLDivElement>) => {
        console.log('Toggle modal');
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        toggleModal();
    };

    const formattedDate = useMemo(() => {
        const timeInMs = time * 1000;

        const date = new Date(timeInMs);

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');



        return `${hours}:${minutes}:${seconds}`;

    }, [time]);


    return (
        <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingX: 2 }}>
            <Box>
                <Typography variant="subtitle2" component={"div"} color="text.disabled">
                    {formattedDate}
                </Typography>
            </Box>

            <Box>
                {showMore && <Button
                    component="div"
                    onClick={toggleModalWithoutPropagation}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    color={color}
                >
                    Learn more
                </Button>}
            </Box>

        </CardActions>
    );
}