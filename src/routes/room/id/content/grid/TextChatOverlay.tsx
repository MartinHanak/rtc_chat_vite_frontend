import { Box, Button, Stack } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import TextChatInput from "./TextChatInput";
import TextMessages from "./TextMessages";
import { useState } from "react";

interface TextChatOverlay {
    offset: number;
}

export default function TextChatOverlay({ offset }: TextChatOverlay) {

    const [showChat, setShowChat] = useState(false);

    return (
        <Box
            sx={{
                position: 'fixed',
                right: theme => theme.spacing(2),
                bottom: `calc(${offset}px + 16px )`,
                height: `calc(100% - ${offset}px - 32px)`,
                width: '50%',
                pointerEvents: 'none'
            }}
        >

            <Stack direction={"column"} justifyContent={"flex-end"} gap={0} alignItems={'stretch'}
                sx={{
                    width: 1, height: '1',
                    pointerEvents: 'none',
                    gap: theme => theme.spacing(1)
                }}
            >
                <Box sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',

                }}>
                    <TextMessages show={showChat} />
                </Box>

                <Box sx={{}}>
                    <TextChatInput show={showChat} />
                </Box>
            </Stack >

            <Button
                onClick={() => setShowChat((prev) => !prev)}
                variant="contained"
                sx={{
                    pointerEvents: 'auto',
                    position: 'absolute', bottom: 0, right: 0, backgroundColor: theme => theme.palette.background.default, aspectRatio: 1, borderRadius: '100%',
                    '&:hover': {
                        backgroundColor: theme => theme.palette.background.default,

                    }
                }}>
                <ChatIcon fontSize="large" sx={{ color: theme => theme.palette.text.primary }} />
            </Button>


        </Box >
    );
}