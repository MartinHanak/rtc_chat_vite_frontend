import { createContext, useContext, useEffect, useState } from "react";
import { useSocketContext } from "./SocketContext";
import { useWebRTCContext } from "./WebRTCContext";
import { userInfo } from "../../../../types/user";


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

type textMessage = {
    time: number;
    userInfo: userInfo;
    message: string;
};

type fileMessage = {
    time: number;
    userInfo: userInfo;
    file: Blob;
};

export function WebRTCMessagesContextProvider({ children }: WebRTCMessagesContextProvider) {

    const [connections, setConnections] = useState<Map<string, connection>>(new Map());

    const [messages, setMessages] = useState<textMessage[]>([]);
    const [fileMessages, setFileMessages] = useState<fileMessage[]>([]);

    const { users } = useSocketContext();
    const { dataChannels, dataChannelReady, fileDataChannelReady, fileDataChannels } = useWebRTCContext();

    // const localUserInfo = useMemo(() => {
    //     const id = socketRef?.current?.id ?? '';

    //     const localUser = users.find((user) => user.socketId === id);

    //     if (localUser) {
    //         return localUser;
    //     } else {
    //         const newUserInfo: userInfo = {
    //             socketId: '',
    //             color: '',
    //             username: ''
    //         };
    //         return newUserInfo;
    //     }
    // }, []);


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

    function createTextMessageHandler(con: connection) {
        return (event: MessageEvent) => {
            const message = event.data as string;
            console.log('Incoming WebRTC message');
            console.log(message);
            setMessages((prev) => [...prev,
            {
                time: Date.now(),
                userInfo: con.userInfo,
                message: message
            }
            ]);
        };
    }

    function createFileMessageHandler(con: connection) {
        return (event: MessageEvent) => {
            const data = event.data as Blob;
            console.log(data);
            setFileMessages((prev) => [...prev,
            {
                time: Date.now(),
                userInfo: con.userInfo,
                file: data
            }
            ]);
        };
    }

    const sendMessage = (inputString: string) => {

        connections.forEach((con) => {
            con.dataChannel.send(inputString);
        });
    };

    const sendFileMessage = (input: Blob) => {
        connections.forEach((con) => {
            con.fileDataChannel.send(input);
        });

    };

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
