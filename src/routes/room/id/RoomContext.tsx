import React from "react";
import { RequiredSettingsProvider } from "./context/RequiredSettingsContext";
import { Room } from "../../../types/room";
import { SocketContextProvider } from "./context/SocketContext";
import { LocalStreamProvider } from "./context/LocalStreamProvider";
import { WebRTCContextProvider } from "./context/WebRTCContext";

interface RoomContext {
    children: React.ReactNode,
    room: Room;
}

export default function RoomContext({ children, room }: RoomContext) {
    return (
        <RequiredSettingsProvider>
            <SocketContextProvider room={room}>
                <LocalStreamProvider room={room}>
                    <WebRTCContextProvider room={room}>
                        {children}
                    </WebRTCContextProvider>
                </LocalStreamProvider>
            </SocketContextProvider>
        </RequiredSettingsProvider>
    );
}