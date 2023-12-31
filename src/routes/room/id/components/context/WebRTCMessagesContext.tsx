import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSocketContext } from "./SocketContext";
import { useWebRTCContext } from "./WebRTCContext";
import { userInfo } from "../../../../../types/user";
import { textMessage, fileMessage } from "../../../../../types/message";
import FileSender from "../../../../../util/fileChunking/FileSender";
import FileReceiver from "../../../../../util/fileChunking/FileReceiver";


interface WebRTCMessagesContextValue {
    messages: textMessage[],
    fileMessages: fileMessage[],
    sendMessage: (input: string) => void,
    sendFileMessage: (file: File) => void,
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
    fileMessageReceiver?: FileReceiver;
};

export function WebRTCMessagesContextProvider({ children }: WebRTCMessagesContextProvider) {

    const [connections, setConnections] = useState<Map<string, connection>>(new Map());

    const [messages, setMessages] = useState<textMessage[]>([]);
    const [fileMessages, setFileMessages] = useState<fileMessage[]>([]);

    const { users, socketRef } = useSocketContext();
    const { dataChannels, dataChannelReady, fileDataChannelReady, fileDataChannels } = useWebRTCContext();
    const fileSender = useRef<FileSender>(new FileSender());


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

    // file sender dc update
    useEffect(() => {
        const fileDCs: RTCDataChannel[] = [];

        connections.forEach((con) => {
            fileDCs.push(con.fileDataChannel);
        });

        fileSender.current.updateDataChannels(fileDCs);

    }, [connections, fileSender]);

    useEffect(() => {
        function createTextMessageHandler(con: connection) {
            return (event: MessageEvent) => {
                const message = event.data as string;
                console.log('Incoming WebRTC message');
                console.log(message);
                insertTextMessage(message, Date.now(), con.userInfo);
            };
        }


        connections.forEach((con) => {
            const textHandler = createTextMessageHandler(con);
            con.textMessageHandler = textHandler;
            con.dataChannel.addEventListener('message', textHandler);

            const fileHandler = (file: File) => insertFileMessage(file, file.name, file.type, Date.now(), con.userInfo);
            con.fileMessageReceiver = new FileReceiver(con.fileDataChannel, fileHandler);
            con.fileMessageReceiver.start();
        });

        // connections cleanup
        return () => {
            connections.forEach((con) => {
                if (con.textMessageHandler)
                    con.dataChannel.removeEventListener('message', con.textMessageHandler);
                if (con.fileMessageReceiver)
                    con.fileMessageReceiver.stop();
            });
        };

    }, [connections]);

    const sendMessage = (inputString: string) => {

        insertTextMessage(inputString, Date.now(), localUserInfo);

        connections.forEach((con) => {
            con.dataChannel.send(inputString);
        });
    };

    const sendFileMessage = async (input: File) => {
        console.log('sending file');
        console.log(input);

        insertFileMessage(input, input.name, input.type, Date.now(), localUserInfo);

        fileSender.current.sendFiles([input]);
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

    function insertFileMessage(file: File, fileName: string, type: string, time: number, userInfo: userInfo) {
        setFileMessages((prev) => [...prev,
        {
            time: time,
            userInfo: userInfo,
            file: file,
            fileName: fileName,
            type: type
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
