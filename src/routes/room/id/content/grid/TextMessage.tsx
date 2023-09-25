import { Box, Stack } from "@mui/material";

interface TextMessage {
    username: string;
    time: number;
    message: string;
}

export default function TextMessage({ username, time, message }: TextMessage) {
    return (
        <Stack>
            <Box>
                {username} at {time}
            </Box>
            <Box>
                {message}
            </Box>
        </Stack>
    );
}