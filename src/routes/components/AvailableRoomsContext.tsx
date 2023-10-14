import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Room, isRoom } from "../../types/room";
import { BACKEND_URL } from "../../util/config";

type AvailableRoomsContextStatus = 'loading' | 'listening' | 'error';

interface AvailableRoomsContextValue {
    rooms: Room[];
    publicRooms: Room[];
    status: AvailableRoomsContextStatus;
}

const AvailableRoomsContext = createContext<AvailableRoomsContextValue>({ rooms: [], publicRooms: [], status: 'loading' });

// eslint-disable-next-line react-refresh/only-export-components
export const useAvailableRoomsContext = () => useContext(AvailableRoomsContext);

interface AvailableRoomsContextProvider {
    children: React.ReactNode,
}

export function AvailableRoomsContextProvider({ children }: AvailableRoomsContextProvider) {

    const EventSourceRef = useRef<EventSource | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [status, setStatus] = useState<AvailableRoomsContextStatus>('loading');

    const publicRooms = useMemo(() => {
        return rooms.filter((room) => room.privateRoom !== true);
    }, [rooms]);

    useEffect(() => {

        EventSourceRef.current = new EventSource(`${BACKEND_URL}/api/roomSSE`);


        EventSourceRef.current.onopen = () => {
            console.log(`EventSource opened`);
            setStatus('listening');
        };

        EventSourceRef.current.onmessage = (e) => {
            const jsonData = JSON.parse(e.data);

            if (!Array.isArray(jsonData)) {
                console.log(`Incoming EventSource data is not an array`);
                return;
            }

            const rooms: Room[] = [];

            for (const roomData of jsonData) {
                if (isRoom(roomData)) {
                    rooms.push(roomData);
                } else {
                    console.log('Incoming data are not a valid room', roomData);
                }
            }

            console.log(rooms);
            setRooms(rooms);
        };

        EventSourceRef.current.onerror = () => {
            console.log(`Error occurred while attempting to connect the EventSource.`);
            setStatus('error');
        };

        return () => {
            EventSourceRef.current?.close();
            EventSourceRef.current = null;
        };

    }, []);

    return (
        <AvailableRoomsContext.Provider value={{ rooms, publicRooms, status }}>
            {children}
        </AvailableRoomsContext.Provider>
    );
}