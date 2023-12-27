import { Box, Button, CardActions, Typography } from "@mui/material";
import { MouseEvent, useMemo } from "react";
import { possibleColors } from "../../../types/mui";

interface RoomCardActions {
    showMore: boolean;
    time: number;
    language: string | null;
    toggleModal: () => void;
    color: possibleColors;
}


export default function RoomCardActions({ showMore, time, language, toggleModal, color }: RoomCardActions) {

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

        return `${hours}:${minutes}`;

    }, [time]);


    return (
        <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingX: 2, minHeight: '53px' }}>
            <Box>
                <Typography variant="subtitle2" component={"div"} color="text.disabled">
                    {formattedDate}
                    {language && <Typography variant="subtitle2" component="span" color="text.disabled" sx={{ marginLeft: 1 }}>
                        {language}
                    </Typography>}
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