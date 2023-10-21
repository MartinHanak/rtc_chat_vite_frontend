import { Box, Button, Stack, TextField } from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import { useWebRTCMessagesContext } from "../../context/WebRTCMessagesContext";

import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FileChip from "./FileChip";

interface TextChatInput {
    show: boolean;
}

export default function TextChatInput({ show }: TextChatInput) {

    const [inputText, setInputText] = useState<string>('');
    const [inputFiles, setInputFiles] = useState<File[]>([]);

    const { socketRef } = useSocketContext();

    const { sendMessage, sendFileMessage } = useWebRTCMessagesContext();

    const handleSendMessage = () => {
        // send text message
        if (socketRef && socketRef.current && inputText.trim() !== '') {
            socketRef.current.emit('message', socketRef.current.id, inputText, Date.now());
            sendMessage(inputText);
            setInputText('');
        }

        // TODO:  send file message
        inputFiles.forEach((file) => {
            sendFileMessage(file);
        });

        setInputFiles([]);
    };

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
            </Stack>
        );
    }, [inputFiles]);

    return (
        <Stack direction={"row"} sx={{
            position: 'relative',
            pointerEvents: show ? 'auto' : 'none',
            opacity: show ? '1' : '0',
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
                onKeyDown={handleKeyDown}
                sx={{
                    position: 'absolute', bottom: 0, left: 0,
                    width: 'calc(100% - 80px)',
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


            <Button component="div" variant="contained" endIcon={<NoteAddIcon />}
                sx={{
                    position: 'absolute', right: '0', bottom: '0',
                    height: '100%',
                    borderRadius: 0,
                    paddingLeft: '8px',
                    paddingRight: 'calc(32px + 16px)',
                    paddingY: 0
                }}
            >
                <Box sx={{ position: 'relative', width: 1, height: 1, margin: 0, padding: 0, backgroundColor: 'yellow' }} >
                    <input
                        multiple
                        type="file"
                        onChange={handleFileChange}
                        style={{
                            opacity: 0,
                            cursor: 'pointer',
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'red', position: 'absolute', lineHeight: '100%', display: 'block'
                        }} />
                </Box>

            </Button>
        </Stack>
    );
}