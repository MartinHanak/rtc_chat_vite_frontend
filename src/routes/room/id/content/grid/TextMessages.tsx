import { Box } from "@mui/material";
import { useSocketContext } from "../../context/SocketContext";
import TextMessage from "./TextMessage";
import { useEffect, useRef } from "react";
import { useWebRTCMessagesContext } from "../../context/WebRTCMessagesContext";

interface TextMessages {
    show: boolean;
}

export default function TextMessages({ show }: TextMessages) {

    const { messages, socketRef } = useSocketContext();

    const { fileMessages } = useWebRTCMessagesContext();


    // auto-scroll when new message appears
    const chatBottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatBottomRef.current?.scrollIntoView();
    }, [messages]);



    const handleDownload = (inputBlob: Blob) => {
        const blobUrl = URL.createObjectURL(inputBlob);

        // Directly set the anchor's href and download attributes
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = `example.png`; // Set the file name

        downloadLink.click();

        // Release the Blob URL
        URL.revokeObjectURL(blobUrl);
    };

    return (
        <Box sx={{
            // for scrollable container
            flex: '1 1 auto',
            overflowY: 'auto',
            minHeight: '0px',

            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            gap: 2,
            // DO NOT USE
            // issue with this: https://stackoverflow.com/questions/36130760/use-justify-content-flex-end-and-to-have-vertical-scrollbar
            //
            // justifyContent: 'flex-end',
            // USE THIS INSTEAD for the 1st child
            //marginTop: 'auto',

        }}>
            {messages.map((message, index) => {
                return (
                    <TextMessage
                        key={`${message.fromSocketId}_${message.time}`}
                        username={message.username}
                        userColor={message.userColor}
                        message={message.message}
                        time={message.time}
                        show={show}
                        delay={200 * (messages.length - 1 - index)}
                        shift={message.fromSocketId === socketRef?.current?.id}
                    />
                );
            })}

            <div ref={chatBottomRef}></div>
            <Box sx={{ pointerEvents: 'auto' }}>
                {fileMessages.map((msg, index) => {
                    return (
                        <a key={`file_msg_${index}`} href={"#"}
                            onClick={() => handleDownload(msg.file)}
                        >{'FILE DOWNLOAD'}</a>
                    );
                })}
            </Box>
        </Box>
    );
}