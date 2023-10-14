import { Box } from "@mui/material";
import { useSocketContext } from "../../context/SocketContext";
import TextMessage from "./TextMessage";
import { useEffect, useRef } from "react";

interface TextMessages {
    show: boolean;
}

export default function TextMessages({ show }: TextMessages) {

    const { messages, socketRef } = useSocketContext();


    // auto-scroll when new message appears
    const chatBottomRef = useRef<HTMLDivElement>(null);

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
        </Box>
    );
}