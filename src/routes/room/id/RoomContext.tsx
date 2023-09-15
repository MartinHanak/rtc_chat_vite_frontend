import React from "react";
import { RequiredSettingsProvider } from "./context/RequiredSettingsContext";
import { Room } from "../../../types/room";

interface RoomContext {
    children: React.ReactNode,
    room: Room;
}

export default function RoomContext({ children, room }: RoomContext) {
    return (
        <RequiredSettingsProvider>
            {children}
        </RequiredSettingsProvider>
    );
}