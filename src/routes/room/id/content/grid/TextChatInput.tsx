import { Button, Stack, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { useSocketContext } from "../../context/SocketContext";

export default function TextChatInput() {

    const [inputText, setInputText] = useState<string>('');

    const { socketRef } = useSocketContext();

    const handleSendMessage = () => {
        if (socketRef && socketRef.current) {
            socketRef.current.emit('message', socketRef.current.id, inputText, Date.now());
            setInputText('');
        }
    };

    return (
        <Stack direction={"row"} sx={{ position: 'relative' }}>
            <TextField id="text-message-input"
                label="Message"
                variant="outlined"
                multiline
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                sx={{
                    position: 'absolute', bottom: 0, left: 0,
                    width: '75%',
                    backgroundColor: theme => theme.palette.background.default
                }}
            />

            <Button variant="contained" endIcon={<SendIcon />}
                sx={{ position: 'relative', left: '75%', transform: 'translateX(-100%)' }}
                onClick={handleSendMessage}
            >
                Send
            </Button>
        </Stack>
    );
}