import { FormEvent, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import { Box, Button, Stack, TextField } from "@mui/material";

export function TextChat() {

    const { messages, socketRef } = useSocketContext();

    const [input, setInput] = useState('');

    function handleSendMessage(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (socketRef && socketRef.current) {
            socketRef.current.emit('message', socketRef.current.id, input, Date.now());
            setInput('');
        } else {
            console.log(`Websocket not connected`);
        }

    }

    return (
        <Box>
            {messages.map((messageInfo) => {

                return (
                    <Stack direction="row" key={`${messageInfo.fromSocketId}_${messageInfo.time}`}>
                        <Box>{messageInfo.username}</Box>
                        <Box>{messageInfo.message}</Box>
                    </Stack>
                );
            })}

            <Box component="form" onSubmit={handleSendMessage}>
                <TextField id="text-message-input" label="Message" variant="outlined"
                    multiline rows={2}
                    value={input} onChange={(e) => setInput(e.target.value)} />

                <Button type="submit"> Send </Button>
            </Box>
        </Box>
    );
}