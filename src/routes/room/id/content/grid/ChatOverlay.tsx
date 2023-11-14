import { Box, Button, Stack, Tooltip } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { useState } from "react";

interface ChatOverlay {
    offset: number;
    overlay: boolean;
}

export default function ChatOverlay({ offset, overlay }: ChatOverlay) {

    const [showChat, setShowChat] = useState(overlay ? false : true);

    return (
        <Box
            sx={{
                position: 'fixed',
                display: 'block',
                right: theme => overlay ? theme.spacing(2) : '50%',
                transform: overlay ? 'none' : 'translateX(50%)',
                bottom: `calc(${offset}px + 16px )`,
                height: overlay ? `calc(100% - ${offset}px - 32px)` : `calc(100% - 80px - 32px)`,
                maxWidth: overlay ? '480px' : '720px',
                width: {
                    xs: '100%',
                    lg: overlay ? '33%' : '100%',
                },
                pointerEvents: overlay ? 'none' : 'auto'
            }}
        >

            <Stack direction={"column"} justifyContent={"flex-end"} gap={0} alignItems={'stretch'}
                sx={{
                    width: 1, height: '1',
                    pointerEvents: overlay ? 'none' : 'auto',
                    gap: theme => theme.spacing(1)
                }}
            >
                <Box sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',

                }}>
                    <Messages show={showChat} overlay={overlay} />
                </Box>

                <Box sx={{}}>
                    <ChatInput show={showChat} overlay={overlay} />
                </Box>
            </Stack >


            {overlay &&
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
                    <Tooltip title="Chat" placement={"top"}>
                        <ChatIcon fontSize="large" sx={{ color: theme => theme.palette.text.primary }} />
                    </Tooltip>
                </Button>
            }


        </Box >
    );
}