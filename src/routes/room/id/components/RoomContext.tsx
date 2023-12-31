import React from "react";
import { RequiredSettingsProvider } from "./context/RequiredSettingsContext";
import { Room } from "../../../../types/room";
import { SocketContextProvider } from "./context/SocketContext";
import { LocalStreamProvider } from "./context/LocalStreamProvider";
import { WebRTCContextProvider } from "./context/WebRTCContext";
import { WebRTCMessagesContextProvider } from "./context/WebRTCMessagesContext";

interface RoomContext {
    children: React.ReactNode,
    room: Room;
}

export default function RoomContext({ children, room }: RoomContext) {
    return (
        <RequiredSettingsProvider>
            <SocketContextProvider room={room}>
                <LocalStreamProvider >
                    <WebRTCContextProvider>
                        <WebRTCMessagesContextProvider>
                            {children}
                        </WebRTCMessagesContextProvider>
                    </WebRTCContextProvider>
                </LocalStreamProvider>
            </SocketContextProvider>
        </RequiredSettingsProvider>
    );
}