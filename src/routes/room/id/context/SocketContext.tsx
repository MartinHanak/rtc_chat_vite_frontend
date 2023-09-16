import { MutableRefObject, createContext, useContext, useEffect, useRef, useState } from "react";
import { Room } from "../../../../types/room";
import { Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents, userInfo } from "../../../../types/socketTypes";
import { useLocalSettingsContext } from "../../../components/LocalSettingsContext";
import { initializeSocket } from "../../../../util/initializeSocket";
import Loader from "../../../../components/Loader";

interface SocketContextProvider {
    children: React.ReactNode,
    room: Room;
}

type messageData = {
    fromSocketId: string,
    username: string,
    message: string,
    time: number;
};

interface SocketContextValue {
    room: Room,
    socketRef: MutableRefObject<Socket<ServerToClientEvents, ClientToServerEvents> | null> | null,
    users: userInfo[],

    offers: Record<string, RTCSessionDescriptionInit>,
    answers: Record<string, RTCSessionDescriptionInit>,
    iceCandidates: Record<string, RTCIceCandidate[]>,

    messages: messageData[];
}


const SocketContext = createContext<SocketContextValue>({ room: { name: 'loading', type: 'video', createdAt: 0 }, socketRef: null, users: [], offers: {}, answers: {}, iceCandidates: {}, messages: [] });

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => useContext(SocketContext);

export function SocketContextProvider({ children, room }: SocketContextProvider) {

    const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

    // websocket state
    const [connectedUsers, setConnectedUsers] = useState<userInfo[]>([]);

    // state for WebRTC offers, answers, ICE-candidates
    const [offers, setOffers] = useState<Record<string, RTCSessionDescriptionInit>>({});
    const [answers, setAnswers] = useState<Record<string, RTCSessionDescriptionInit>>({});
    const [iceCandidates, setIceCandidates] = useState<Record<string, RTCIceCandidate[]>>({});

    // chat
    const [messages, setMessages] = useState<messageData[]>([]);

    // username
    const { username } = useLocalSettingsContext();


    // only one socket is active for one room
    useEffect(() => {
        console.log(`Initializing the socket for the room ${room.name} with the username ${username}`);

        socketRef.current = initializeSocket(room.name, username);


        // room events
        socketRef.current.on("room-users", (users: userInfo[]) => {
            console.log(users);
            setConnectedUsers(users);
        });

        // webRTC events
        socketRef.current.on("offer", (fromSocketId: string, _toSocketId: string, offer) => {

            console.log(`Received WebRTC offer`);

            setOffers((oldOffers) => {
                return {
                    ...oldOffers,
                    [fromSocketId]: offer
                };
            });

        });

        socketRef.current.on("answer", (fromSocketId: string, _toSocketId: string, answer) => {

            console.log(`Received WebRTC answer`);
            setAnswers((oldAnswers) => {
                return {
                    ...oldAnswers,
                    [fromSocketId]: answer
                };
            });

        });

        socketRef.current.on("ice-candidate", (fromSocketId: string, _toSocketId: string, candidate) => {

            console.log(`Received WebRTC ICE candidate`);
            setIceCandidates((oldCandidates) => {
                if (!oldCandidates[fromSocketId]) {
                    return {
                        ...oldCandidates,
                        [fromSocketId]: [candidate]
                    };
                } else {
                    return {
                        ...oldCandidates,
                        [fromSocketId]: [...oldCandidates[fromSocketId], candidate]
                    };
                }
            });

        });


        // socket cleanup
        return () => {
            console.log(`SOCKET DISCONNECTING`);

            socketRef.current?.disconnect();
        };


    }, [room, username]);

    // chat events separate: depend on connectedUsers state
    // changes when new users are connected
    // but socket connection should stay the same
    useEffect(() => {
        if (!socketRef || !socketRef.current) {
            return;
        }

        const socketIdToUsername = new Map<string, string>();

        connectedUsers.forEach((userInfo) => {
            socketIdToUsername.set(userInfo.socketId, userInfo.username);
        });

        // chat events
        socketRef.current.on("message", (fromSocketId: string, message: string, time) => {

            const fromUsername = socketIdToUsername.get(fromSocketId);

            if (fromUsername) {
                setMessages((previous) => [...previous,
                {
                    fromSocketId,
                    username: fromUsername,
                    message,
                    time
                }]);
            } else {
                console.log(`No username found for the socketId ${fromSocketId}`);
            }


        });

        return () => {
            // remove listeners for old connectedUsers list
            socketRef.current?.removeAllListeners('message');
        };

    }, [connectedUsers]);

    return (
        <>{connectedUsers.length > 0 ?
            <SocketContext.Provider value={{ room, socketRef, users: connectedUsers, offers, answers, iceCandidates, messages }}>
                {children}
            </SocketContext.Provider>

            :
            <Loader />
        }</>
    );

}
