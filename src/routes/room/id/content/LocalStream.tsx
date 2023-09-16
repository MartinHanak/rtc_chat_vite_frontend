import { useEffect, useState } from "react";
import { useLocalStreamContext } from "../context/LocalStreamProvider";
import VideoAudioChat from "./VideoAudioChat";
import { useSocketContext } from "../context/SocketContext";
import { useLocalSettingsContext } from "../../../components/LocalSettingsContext";

export default function LocalStream() {

    const { username } = useLocalSettingsContext();
    const { room } = useSocketContext();
    const { streamRef, streamReady } = useLocalStreamContext();

    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {

        if (streamReady && streamRef && streamRef.current) {
            setStream(streamRef.current);
        }

    }, [streamReady, streamRef]);

    return (
        <>
            {stream && <VideoAudioChat username={username} stream={stream} room={room} />}
        </>
    );
}