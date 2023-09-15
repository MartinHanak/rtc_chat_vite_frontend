import { MutableRefObject, createContext, useContext, useEffect, useRef, useState } from "react";
import Loader from "../../../../components/Loader";
import { Room } from "../../../../types/room";

interface LocalStreamContextValue {
    streamRef: MutableRefObject<MediaStream | null> | null;
}

const LocalStreamContext = createContext<LocalStreamContextValue>({ streamRef: null });

// eslint-disable-next-line react-refresh/only-export-components
export const useLocalStreamContext = () => useContext(LocalStreamContext);

interface LocalStreamContext {
    children: React.ReactNode,
    room: Room;
}

export function LocalStreamProvider({ children, room }: LocalStreamContext) {

    const streamRef = useRef<MediaStream | null>(null);
    const [streamReady, setStreamReady] = useState(false);

    let video = false;
    let audio = false;

    switch (room.type) {
        case 'video':
            video = true;
            audio = true;
            break;
        case 'audio':
            audio = true;
            break;
        case 'text':
            break;
    }


    useEffect(() => {
        console.log('Preparing local stream');

        const getMediaStream = async () => {
            try {
                console.log(`Setting local stream`);

                // check if stream already set
                // otherwise issues with double-render react strict mode
                if (streamRef && streamRef.current) {
                    console.log(`Local stream already set`);
                } else {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: audio, video: video });
                    streamRef.current = stream;
                    setStreamReady(true);
                }

            } catch (error) {
                console.log(error);
            }
        };

        // no stream for text-based chat
        if (video || audio) {
            getMediaStream();
        } else {
            setStreamReady(true);
        }

        const cleanup = () => {
            console.log(`Local stream cleanup.`);
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            } else {
                console.log(`No stream or stream.current when local stream cleanup happened.`);
            }
        };

        // Cleanup when the component unmounts or when audio/video dependencies change
        return cleanup;

    }, [audio, video]);


    // WebRTC context needs data from the local stream
    return (
        <LocalStreamContext.Provider value={{ streamRef }}>
            {streamReady ? children : <Loader />}
        </LocalStreamContext.Provider>
    );
}