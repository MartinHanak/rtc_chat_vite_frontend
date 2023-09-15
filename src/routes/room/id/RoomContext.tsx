import React from "react";
import { RequiredSettingsProvider } from "./context/RequiredSettingsContext";
import { Room } from "../../../types/room";
import { SocketContextProvider } from "./context/SocketContext";

interface RoomContext {
    children: React.ReactNode,
    room: Room;
}

export default function RoomContext({ children, room }: RoomContext) {
    return (
        <RequiredSettingsProvider>
            <SocketContextProvider room={room}>
                {children}
            </SocketContextProvider>
        </RequiredSettingsProvider>
    );
}