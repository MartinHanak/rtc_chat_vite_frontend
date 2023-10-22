import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSocketContext } from "./SocketContext";
import { useWebRTCContext } from "./WebRTCContext";
import { userInfo } from "../../../../types/user";
import { textMessage, fileMessage } from "../../../../types/message";


interface WebRTCMessagesContextValue {
    messages: textMessage[],
    fileMessages: fileMessage[],
    sendMessage: (input: string) => void,
    sendFileMessage: (file: Blob) => void,
}


const WebRTCMessagesContext = createContext<WebRTCMessagesContextValue>({ messages: [], fileMessages: [], sendMessage: () => { }, sendFileMessage: () => { } });

// eslint-disable-next-line react-refresh/only-export-components
export const useWebRTCMessagesContext = () => useContext(WebRTCMessagesContext);

interface WebRTCMessagesContextProvider {
    children: React.ReactNode,
}

type connection = {
    socketId: string,
    userInfo: userInfo,
    dataChannel: RTCDataChannel,
    fileDataChannel: RTCDataChannel;
    textMessageHandler?: (e: MessageEvent) => void;
    fileMessageHandler?: (e: MessageEvent) => void;
};

export function WebRTCMessagesContextProvider({ children }: WebRTCMessagesContextProvider) {

    const [connections, setConnections] = useState<Map<string, connection>>(new Map());

    const [messages, setMessages] = useState<textMessage[]>([]);
    const [fileMessages, setFileMessages] = useState<fileMessage[]>([]);

    const { users, socketRef } = useSocketContext();
    const { dataChannels, dataChannelReady, fileDataChannelReady, fileDataChannels } = useWebRTCContext();

    const localUserInfo = useMemo(() => {
        const id = socketRef?.current?.id ?? '';

        const localUser = users.find((user) => user.socketId === id);

        if (localUser) {
            return localUser;
        } else {
            const newUserInfo: userInfo = {
                socketId: '',
                color: '',
                username: ''
            };
            return newUserInfo;
        }
    }, [users, socketRef]);

    useEffect(() => {

        setConnections((prev) => {
            const newConnections = new Map<string, connection>();

            for (const user of users) {
                const existingConnection = prev.get(user.socketId);

                if (existingConnection) {
                    // keep previous connection
                    // only userInfo updated = local settings can change for the user
                    newConnections.set(user.socketId, { ...existingConnection, userInfo: user });
                } else {
                    // check if connection ready
                    if (dataChannels &&
                        fileDataChannels &&
                        user.socketId in dataChannels.current &&
                        user.socketId in fileDataChannels.current &&
                        dataChannelReady.includes(user.socketId) &&
                        fileDataChannelReady.includes(user.socketId)
                    ) {
                        // add only if ALL ready
                        newConnections.set(user.socketId, {
                            socketId: user.socketId,
                            userInfo: user,
                            dataChannel: dataChannels.current[user.socketId],
                            fileDataChannel: fileDataChannels.current[user.socketId]
                        });
                    }
                }
            }

            return newConnections;
        });

    }, [users, dataChannels, dataChannelReady, fileDataChannelReady, fileDataChannels]);

    useEffect(() => {
        function createTextMessageHandler(con: connection) {
            return (event: MessageEvent) => {
                const message = event.data as string;
                console.log('Incoming WebRTC message');
                console.log(message);
                insertTextMessage(message, Date.now(), con.userInfo);
            };
        }

        function createFileMessageHandler(con: connection) {
            return (event: MessageEvent) => {
                const data = event.data as Blob;
                console.log(data);
                insertFileMessage(data, Date.now(), con.userInfo);
            };
        }

        connections.forEach((con) => {
            const textHandler = createTextMessageHandler(con);
            con.textMessageHandler = textHandler;
            con.dataChannel.addEventListener('message', textHandler);

            const fileHandler = createFileMessageHandler(con);
            con.fileMessageHandler = fileHandler;
            con.fileDataChannel.addEventListener('message', fileHandler);
        });

        // connections cleanup
        return () => {
            connections.forEach((con) => {
                if (con.textMessageHandler)
                    con.dataChannel.removeEventListener('message', con.textMessageHandler);
                if (con.fileMessageHandler)
                    con.fileDataChannel.removeEventListener('message', con.fileMessageHandler);
            });
        };

    }, [connections]);

    const sendMessage = (inputString: string) => {

        insertTextMessage(inputString, Date.now(), localUserInfo);

        connections.forEach((con) => {
            con.dataChannel.send(inputString);
        });
    };

    const sendFileMessage = (input: Blob) => {

        insertFileMessage(input, Date.now(), localUserInfo);

        connections.forEach((con) => {
            con.fileDataChannel.send(input);
        });

    };

    function insertTextMessage(message: string, time: number, userInfo: userInfo) {
        setMessages((prev) => [...prev,
        {
            time: time,
            userInfo: userInfo,
            message: message
        }
        ]);
    }

    function insertFileMessage(file: Blob, time: number, userInfo: userInfo) {
        setFileMessages((prev) => [...prev,
        {
            time: time,
            userInfo: userInfo,
            file: file
        }
        ]);
    }

    return (
        <WebRTCMessagesContext.Provider value={{
            messages: messages,
            fileMessages: fileMessages,
            sendMessage: sendMessage,
            sendFileMessage: sendFileMessage,
        }}>
            {children}
        </WebRTCMessagesContext.Provider>
    );
}
