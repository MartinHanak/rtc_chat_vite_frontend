import { useEffect, useState } from "react";
import { useWebRTCContext } from "../../../context/WebRTCContext";
import { useLocalStreamContext } from "../../../context/LocalStreamProvider";
import { useSocketContext } from "../../../context/SocketContext";

export default function useReadyStreams() {
    // streamReady variables are not updated when user disconnects, users variable is
    const { users, socketRef } = useSocketContext();
    const { streams: peerStreams, peerStreamReady } = useWebRTCContext();
    const { streamRef, streamReady } = useLocalStreamContext();
    const [streams, setStreams] = useState<Map<string, MediaStream>>(new Map());

    useEffect(() => {
        const newStreams = new Map();

        users.forEach((user) => {

            if (peerStreamReady.includes(user.socketId) && peerStreams) {

                newStreams.set(user.socketId, peerStreams.current[user.socketId]);

            } else if (user.socketId === socketRef?.current?.id && streamReady && streamRef) {

                newStreams.set(user.socketId, streamRef.current);

            } else {
                console.log(`No stream found for the user socket id: ${user.socketId}`);
            }

        });

        setStreams(newStreams);


    }, [streamReady, peerStreamReady, users, socketRef, streamRef, peerStreams]);
    // only streamReady, peerStreamReady, users are expected to change
    // references should remain unchanged during one connection

    return {
        streams
    };
}