import { Box } from "@mui/material";
import TextMessage from "./TextMessage";
import { useEffect, useMemo, useRef } from "react";
import { useWebRTCMessagesContext } from "../../../../context/WebRTCMessagesContext";
import { fileMessage, textMessage } from "../../../../../../../components/AvailableRoomsContext";
import { isFileMessage, isTextMessage } from "../../../../../../../../types/message";
import FileMessage from "./FileMessage";

interface Messages {
    show: boolean;
    overlay: boolean;
}

export default function Messages({ show, overlay }: Messages) {

    const { messages, fileMessages } = useWebRTCMessagesContext();

    const combinedMessages: Array<textMessage | fileMessage> = useMemo(() => {
        let textIndex = 0;
        let fileIndex = 0;

        const combined: Array<textMessage | fileMessage> = [];

        while (textIndex < messages.length || fileIndex < fileMessages.length) {

            if (fileIndex >= fileMessages.length) {
                combined.push(messages[textIndex]);
                textIndex += 1;
            } else if (textIndex >= messages.length) {
                combined.push(fileMessages[fileIndex]);
                fileIndex += 1;
            } else {
                if (messages[textIndex].time < fileMessages[fileIndex].time) {
                    combined.push(messages[textIndex]);
                    textIndex += 1;
                } else {
                    combined.push(fileMessages[fileIndex]);
                    fileIndex += 1;
                }
            }
        }

        return combined;

    }, [messages, fileMessages]);


    // auto-scroll when new message appears
    const chatBottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // wait for the video/image load before scrolling
        const id = setTimeout(() => {
            chatBottomRef.current?.scrollIntoView();
        }, 300);

        return () => {
            clearTimeout(id);
        };

    }, [fileMessages]);

    useEffect(() => {
        chatBottomRef.current?.scrollIntoView();
    }, [messages]);


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
            {combinedMessages.map((message, index) => {
                if (isTextMessage(message)) {
                    return (
                        <TextMessage
                            key={`${message.userInfo.socketId}_text_${message.time}`}
                            username={message.userInfo.username}
                            userColor={message.userInfo.color}
                            message={message.message}
                            show={show}
                            overlay={overlay}
                            delay={200 * (combinedMessages.length - 1 - index)}
                        />
                    );
                } else if (isFileMessage(message)) {
                    return (
                        <FileMessage
                            key={`${message.userInfo.socketId}_file_${message.time}`}
                            username={message.userInfo.username}
                            userColor={message.userInfo.color}
                            file={message.file}
                            fileName={message.fileName}
                            type={message.type}
                            show={show}
                            overlay={overlay}
                            delay={200 * (combinedMessages.length - 1 - index)}
                        />
                    );


                }
            })}

            <div ref={chatBottomRef}></div>
        </Box>
    );
}