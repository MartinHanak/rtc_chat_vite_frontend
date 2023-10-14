import { Button, Stack, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { useSocketContext } from "../../context/SocketContext";

interface TextChatInput {
    show: boolean;
}

export default function TextChatInput({ show }: TextChatInput) {

    const [inputText, setInputText] = useState<string>('');

    const { socketRef } = useSocketContext();

    const handleSendMessage = () => {
        if (socketRef && socketRef.current && inputText.trim() !== '') {
            socketRef.current.emit('message', socketRef.current.id, inputText, Date.now());
            setInputText('');
        }
    };

    return (
        <Stack direction={"row"} sx={{
            position: 'relative',
            pointerEvents: show ? 'auto' : 'none',
            opacity: show ? '1' : '0',
            backgroundColor: 'red',
            marginRight: '34px',
            marginBottom: '14px', // 34 - 40/2 where 40 = height of 1 line textarea
            height: '40px',
            transition: theme => theme.transitions.create(['opacity'], {
                duration: 200,
            }),
        }}>

            <TextField id="text-message-input"
                label="Message"
                variant="outlined"
                multiline
                size={'small'} // 23px per line
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                sx={{
                    position: 'absolute', bottom: 0, left: 0,
                    width: 'calc(100% - 141px)',
                    backgroundColor: theme => theme.palette.background.default,
                }}
                InputProps={{
                    sx: {
                        borderBottomRightRadius: 0,
                        borderTopRightRadius: 0
                    }
                }}
            />

            <Button variant="contained" endIcon={<SendIcon />}
                sx={{
                    position: 'absolute', right: '0', bottom: '0',
                    height: '100%',
                    borderRadius: 0,
                    paddingLeft: '32px',
                    paddingRight: 'calc(32px + 16px)',
                }}
                onClick={handleSendMessage}
            >
                Send
            </Button>
        </Stack>
    );
}