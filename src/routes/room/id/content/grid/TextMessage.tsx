import { Box, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

interface TextMessage {
    username: string;
    time: number;
    message: string;
    show: boolean;
    delay: number;
    shift?: boolean;
}

export default function TextMessage({ username, time, message, show, delay, shift }: TextMessage) {

    const [localTempShowMessage, setLocalTempShowMessage] = useState(true);

    useEffect(() => {
        const showDuration = 3000; // in ms

        const timeoutId = setTimeout(() => {
            setLocalTempShowMessage(false);
        }, showDuration);


        return () => {
            clearTimeout(timeoutId);
        };

    }, []);

    const displayedTime = useMemo<string>(() => {
        const messageDate = new Date(time);

        const hours = messageDate.getHours().toString().padStart(2, '0');
        const minutes = messageDate.getMinutes().toString().padStart(2, '0');
        const seconds = messageDate.getSeconds().toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }, [time]);

    return (
        <Stack sx={{
            backgroundColor: theme => theme.palette.background.default,
            boxShadow: theme => theme.shadows[4],
            pointerEvents: (show || localTempShowMessage) ? 'auto' : 'none',
            opacity: (show || localTempShowMessage) ? '1' : '0',
            transition: theme => theme.transitions.create(['opacity'], {
                duration: 1000,
                delay: (show || localTempShowMessage) ? delay : 0
            }),
            // used instead of justifyContent: flex-end because of a bug:
            // https://stackoverflow.com/questions/36130760/use-justify-content-flex-end-and-to-have-vertical-scrollbar
            '&:first-of-type': {
                marginTop: 'auto !important'
            },
            alignSelf: shift ? 'end' : 'auto'
        }}>
            <Box>
                {username} at {displayedTime}
            </Box>
            <Box sx={{ whiteSpace: 'pre-line' }}>
                {message}
            </Box>
        </Stack>
    );
}