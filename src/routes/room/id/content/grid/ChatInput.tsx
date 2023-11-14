import { Box, Button, Stack, TextField } from "@mui/material";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import { useWebRTCMessagesContext } from "../../context/WebRTCMessagesContext";

import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FileChip from "./FileChip";

interface ChatInput {
    show: boolean;
    overlay: boolean;
}

export default function ChatInput({ show, overlay }: ChatInput) {

    const [inputText, setInputText] = useState<string>('');
    const [inputFiles, setInputFiles] = useState<File[]>([]);

    const { socketRef } = useSocketContext();

    const { sendMessage, sendFileMessage } = useWebRTCMessagesContext();

    const handleSendMessage = useCallback(() => {
        // send text message
        if (socketRef && socketRef.current && inputText.trim() !== '') {
            sendMessage(inputText);
            setInputText('');
        }

        //  send file message
        inputFiles.forEach((file) => {
            sendFileMessage(file);
        });

        setInputFiles([]);
    }, [inputFiles, inputText, sendFileMessage, sendMessage, socketRef]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const selectedFilesArray: File[] = Array.from(files);
            setInputFiles((prev) => [...prev, ...selectedFilesArray]);
        }
    };

    const FileChips = useMemo(() => {
        return (
            <Stack direction="column" width={1} sx={{
                paddingTop: 2, gap: 1, padding: 0.5,
            }}>
                {inputFiles.map((file, index) => <FileChip
                    key={`${file.name}_${index}`}
                    fileName={file.name}
                    fileSize={file.size}
                    onDelete={() => setInputFiles((prev) => prev.filter((a) => a !== file))}
                />)}

                <Button
                    variant="contained"
                    sx={{
                        width: '100%',
                        marginTop: 2,
                    }}
                    onClick={() => handleSendMessage()}
                >
                    Send message
                </Button>
            </Stack>
        );
    }, [inputFiles, handleSendMessage]);

    return (
        <Stack direction={"row"} sx={{
            position: 'relative',
            pointerEvents: show ? 'auto' : 'none',
            opacity: show ? '1' : '0',
            marginRight: overlay ? '34px' : 0,
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
                onKeyDown={handleKeyDown}
                sx={{
                    position: 'absolute', bottom: 0, left: 0,
                    width: overlay ? 'calc(100% - 80px)' : 'calc(100% - 88px)',
                    backgroundColor: theme => theme.palette.background.default,
                    maxHeight: '80vh',
                    '& .MuiInputBase-root': {
                        position: 'relative',
                        overflow: 'hidden',
                        '& textarea': {
                            overflowY: 'auto !important',
                            maxHeight: inputFiles.length === 0 ? '80vh' : '40vh'
                        },
                        '& > .MuiStack-root': {
                            overflowY: 'auto',
                            maxHeight: inputText.length === 0 ? '80vh' : '40vh'
                        }
                    },

                }}
                InputProps={{
                    endAdornment: inputFiles.length === 0 ? null : FileChips,
                    sx: {
                        borderBottomRightRadius: 0,
                        borderTopRightRadius: 0,
                        flexDirection: 'column'
                    }
                }}
            />


            <Button component="div" variant="contained"
                sx={{
                    position: 'absolute', right: '0', bottom: '0',
                    height: '100%',
                    borderRadius: overlay ? 0 : '0 4px 4px 0',
                    paddingLeft: overlay ? '8px' : '32px',
                    paddingRight: overlay ? 'calc(32px + 16px)' : '32px',
                    paddingY: 0
                }}
            >
                <NoteAddIcon />

                <Box sx={{ position: 'absolute', width: 1, height: 1, margin: 0, padding: 0 }} >
                    <input
                        multiple
                        type="file"
                        onChange={handleFileChange}
                        style={{
                            opacity: 0,
                            cursor: 'pointer',
                            width: '100%',
                            height: '40px',
                            backgroundColor: 'red', position: 'absolute', lineHeight: '100%', display: 'block'
                        }} />
                </Box>

            </Button>
        </Stack>
    );
}