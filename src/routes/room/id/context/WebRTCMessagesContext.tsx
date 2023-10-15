import { createContext, useContext, useEffect, useState } from "react";
import { useSocketContext } from "./SocketContext";
import { useWebRTCContext } from "./WebRTCContext";
import { userInfo } from "../../../../types/user";


interface WebRTCMessagesContextValue {
    messages: [],
    fileMessages: [],
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
};

export function WebRTCMessagesContextProvider({ children }: WebRTCMessagesContextProvider) {

    const [connections, setConnections] = useState<Map<string, connection>>(new Map());

    const [messages, setMessages] = useState([]);
    const [fileMessages, setFileMessages] = useState([]);

    const { users } = useSocketContext();
    const { dataChannels, dataChannelReady, fileDataChannelReady, fileDataChannels } = useWebRTCContext();

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
                        // TODO: start listening for messages on BOTH datachannels

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


    const sendMessage = (input: string) => {

    };

    const sendFileMessage = (input: Blob) => {

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
