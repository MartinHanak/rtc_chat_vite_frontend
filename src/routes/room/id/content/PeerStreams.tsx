import { useEffect, useState } from "react";
import { useWebRTCContext } from "../context/WebRTCContext";
import { useSocketContext } from "../context/SocketContext";
import { userInfo } from "../../../../types/user";
import VideoAudioChat from "./VideoAudioChat";

export default function PeerStreams() {


    const { users, room } = useSocketContext();
    const { streams, peerStreamReady } = useWebRTCContext();

    const [userInfo, setUserInfo] = useState<Record<string, userInfo>>({});
    const [peerStreams, setPeerStreams] = useState<Record<string, MediaStream>>({});

    // transform array to hashmap for easy access
    useEffect(() => {
        const newUserInfo: Record<string, userInfo> = {};

        for (const user of users) {
            newUserInfo[user.socketId] = user;
        }

        setUserInfo(newUserInfo);

    }, [users]);

    useEffect(() => {

        if (!streams || !streams.current) {
            return;
        }

        const newStreamsReady: Record<string, MediaStream> = {};
        for (const peerId in streams.current) {
            // check for disconnect
            if (users.filter((user) => user.socketId === peerId).length === 1) {
                newStreamsReady[peerId] = streams.current[peerId];
            }
        }

        setPeerStreams(newStreamsReady);

    }, [peerStreamReady, streams, users]);

    return (
        <>
            {Object.entries(peerStreams).map(([peerId, stream]) => {

                const username = peerId in userInfo ? userInfo[peerId].username : peerId;

                return (
                    <VideoAudioChat key={peerId} username={username} room={room} stream={stream} />
                );
            })}
        </>
    );
}