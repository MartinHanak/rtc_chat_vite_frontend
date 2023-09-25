import { Box, Button, Stack } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import TextChatInput from "./TextChatInput";
import TextMessages from "./TextMessages";

interface TextChatOverlay {
    offset: number;
}

export default function TextChatOverlay({ offset }: TextChatOverlay) {

    return (
        <Box
            sx={{
                position: 'fixed',
                right: theme => theme.spacing(2),
                bottom: `calc(${offset}px + 16px )`,
                height: `calc(100% - ${offset}px - 32px)`,
                width: '50%',
            }}
        >

            <Stack direction={"column"} justifyContent={"space-between"} gap={0} alignItems={'stretch'}
                sx={{ width: 1, height: 1 }}
            >
                <Box sx={{ backgroundColor: 'red', height: '100%' }}>
                    <TextMessages />
                </Box>

                <Box sx={{ backgroundColor: 'green' }}>
                    <TextChatInput />
                </Box>
            </Stack>

            <Button
                variant="contained"
                sx={{
                    position: 'absolute', bottom: 0, right: 0, backgroundColor: theme => theme.palette.background.default, aspectRatio: 1, borderRadius: '100%',
                    '&:hover': {
                        backgroundColor: theme => theme.palette.background.default,

                    }
                }}>
                <ChatIcon fontSize="large" sx={{ color: theme => theme.palette.text.primary }} />
            </Button>


        </Box>
    );
}