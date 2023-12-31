import { MutableRefObject, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useSocketContext } from "./SocketContext";
import { useLocalStreamContext } from "./LocalStreamProvider";
import { ICE_SERVERS } from "../../../../../util/config";


interface WebRTCContextValue {
    connections: MutableRefObject<Record<string, RTCPeerConnection>> | null,
    streams: MutableRefObject<Record<string, MediaStream>> | null,
    peerStreamReady: string[],
    dataChannels: MutableRefObject<Record<string, RTCDataChannel>> | null,
    dataChannelReady: string[],
    fileDataChannels: MutableRefObject<Record<string, RTCDataChannel>> | null,
    fileDataChannelReady: string[],
    gainNodes: MutableRefObject<Record<string, GainNode>> | null;
}

const WebRTCContext = createContext<WebRTCContextValue>({ connections: null, streams: null, dataChannels: null, fileDataChannels: null, peerStreamReady: [], dataChannelReady: [], fileDataChannelReady: [], gainNodes: null });

// eslint-disable-next-line react-refresh/only-export-components
export const useWebRTCContext = () => useContext(WebRTCContext);

interface WebRTCContextProvider {
    children: React.ReactNode,
}

export function WebRTCContextProvider({ children }: WebRTCContextProvider) {

    const peerConnectionRef = useRef<Record<string, RTCPeerConnection>>({});
    const peerStreamRef = useRef<Record<string, MediaStream>>({});
    const dataChannelRef = useRef<Record<string, RTCDataChannel>>({});
    const fileDataChannelRef = useRef<Record<string, RTCDataChannel>>({});
    const gainNodeRef = useRef<Record<string, GainNode>>({});

    const [peerStreamReady, setPeerStreamReady] = useState<string[]>([]);
    const [dataChannelReady, setDataChannelReady] = useState<string[]>([]);
    const [fileDataChannelReady, setFileDataChannelReady] = useState<string[]>([]);

    const { room, socketRef, users, offers, answers, iceCandidates } = useSocketContext();

    const { streamRef: localStreamRef } = useLocalStreamContext();

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


    // connection is limited to 1-to-1 connection
    const createPeerConnection = useCallback((toSocketId: string) => {
        const connection = new RTCPeerConnection(ICE_SERVERS);

        peerConnectionRef.current[toSocketId] = connection;

        // data channels have to be created BEFORE answer/offer
        // https://stackoverflow.com/questions/43788872/how-are-data-channels-negotiated-between-two-peers-with-webrtc/43788873#43788873

        const dataChannel = connection.createDataChannel(toSocketId, { negotiated: true, id: 0, ordered: true });
        const fileDataChannel = connection.createDataChannel(toSocketId, { negotiated: true, id: 1, ordered: true });

        dataChannelRef.current[toSocketId] = dataChannel;
        fileDataChannelRef.current[toSocketId] = fileDataChannel;

        dataChannel.binaryType = 'arraybuffer';
        // Blob is not supported in Chrome, date: 11.4.2023
        fileDataChannel.binaryType = 'arraybuffer';

        // data channel events 

        dataChannel.addEventListener('open', (event) => {
            console.log(`Data channel opened`);
            console.log(event);
            setDataChannelReady((previous) => [...previous, toSocketId]);
        });
        fileDataChannel.addEventListener('open', (event) => {
            console.log(`File data channel opened`);
            console.log(event);
            setFileDataChannelReady((previous) => [...previous, toSocketId]);
        });

        dataChannel.addEventListener('close', (event) => {
            console.log(`Data channel closed`);
            console.log(event);
        });
        fileDataChannel.addEventListener('close', (event) => {
            console.log(`File data channel closed`);
            console.log(event);
        });

        dataChannel.addEventListener('error', (event) => {
            console.error(`Text data channel error: `, event);
        });
        fileDataChannel.addEventListener('error', (event) => {
            console.error(`File data channel error: `, event);
        });

        dataChannel.addEventListener('message', (event) => {
            console.log(`Data channel message received`);
            console.log(event.data);
        });
        fileDataChannel.addEventListener('message', (event) => {
            console.log(`File data channel message received`);
            console.log(event.data);
        });



        // connection events

        connection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {

            if (event.candidate) {

                if (socketRef && socketRef.current) {
                    socketRef.current.emit("ice-candidate", socketRef.current.id, toSocketId, event.candidate);
                } else {
                    console.log(`Socket not ready when ice-candidate event triggered.`);
                }

            }
        };

        connection.ontrack = (event: RTCTrackEvent) => {

            // only add if it does not exist yet
            if (!(toSocketId in peerStreamRef.current)) {
                console.log(`Adding a peer stream`);

                const audioTrack = event.streams[0].getAudioTracks()[0];

                const audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(new MediaStream([audioTrack]));
                const destination = audioContext.createMediaStreamDestination();

                const gainNode = audioContext.createGain();
                gainNode.gain.value = 10;
                source.connect(gainNode);
                gainNode.connect(destination);

                const modifiedAudioTrack = destination.stream.getAudioTracks()[0];

                let modifiedMediaStream: MediaStream;

                if (video) {
                    const videoTrack = event.streams[0].getVideoTracks()[0];
                    modifiedMediaStream = new MediaStream([videoTrack, modifiedAudioTrack]);
                } else {
                    modifiedMediaStream = new MediaStream([modifiedAudioTrack]);
                }

                gainNodeRef.current[toSocketId] = gainNode;
                peerStreamRef.current[toSocketId] = modifiedMediaStream;
                setPeerStreamReady((previous) => [...previous, toSocketId]);
            }

        };

        return connection;
    }, [socketRef, video]);


    // creating a WebRTC offer = calling
    useEffect(() => {
        // only one side calls, other side sends an answer
        const handleCall = (toSocketId: string) => {
            console.log(`Initializing WebRTC call to the socket ${toSocketId}.`);

            const connection = createPeerConnection(toSocketId);

            if ((audio || video) && localStreamRef && localStreamRef.current) {

                if (audio) {
                    connection.addTrack(
                        localStreamRef.current.getAudioTracks()[0],
                        localStreamRef.current
                    );
                }

                if (video) {
                    connection.addTrack(
                        localStreamRef.current.getVideoTracks()[0],
                        localStreamRef.current
                    );
                }
            } else if (!video && !audio) {
                console.log('Creating offer for text based room');
            } else {
                console.log(`Local stream not ready while initiating WebRTC call.`);
                return;
            }

            // send WebRTC connection offer
            (async () => {
                try {
                    const offer = await connection.createOffer();

                    connection.setLocalDescription(offer);

                    if (socketRef && socketRef.current) {
                        console.log('Sending WebRTC offer');
                        socketRef.current.emit('offer', socketRef.current.id, toSocketId, offer);
                    } else {
                        throw new Error(`Socket not ready while emitting offer.`);
                    }

                } catch (error) {
                    console.log(error);
                }
            })();
        };

        // handle call when new user connects
        // userIds given in insertion order (guaranteed by the server)
        // only create offers for ids from 'current id' up to the end of the array
        let startMakingOffers = false;
        for (const user of users) {
            // caller cannot call himself
            if (user.socketId === socketRef?.current?.id) {
                startMakingOffers = true;
                continue;
            }

            // do not send offers to ids joined before you, only ids joined after you
            if (!startMakingOffers) {
                continue;
            }

            // new call only if connection not already created
            if (!(user.socketId in peerConnectionRef.current)) {
                console.log(`Making WebRTC call from ${socketRef?.current?.id} to ${user.socketId}.`);
                handleCall(user.socketId);
            }
        }

    }, [users, audio, video, createPeerConnection, localStreamRef, socketRef]);


    // handle received offers by sending an answer
    useEffect(() => {
        const handleOffer = (fromSocketId: string, offer: RTCSessionDescriptionInit) => {
            const connection = createPeerConnection(fromSocketId);

            if ((audio || video) && localStreamRef && localStreamRef.current) {

                if (audio) {
                    connection.addTrack(
                        localStreamRef.current.getAudioTracks()[0],
                        localStreamRef.current
                    );
                }

                if (video) {
                    connection.addTrack(
                        localStreamRef.current.getVideoTracks()[0],
                        localStreamRef.current
                    );
                }
            } else if (!audio && !video) {
                console.log('Creating answer for text based room.');
            } else {
                console.log(`Local stream not ready while initiating WebRTC call.`);
                return;
            }

            connection.setRemoteDescription(offer);

            // send an answer
            (async () => {
                try {
                    const answer = await connection.createAnswer();
                    connection.setLocalDescription(answer);

                    if (socketRef && socketRef.current) {
                        console.log(`Sending WebRTC answer`);
                        socketRef.current.emit("answer", socketRef.current.id, fromSocketId, answer);
                    } else {
                        throw new Error(`Socket not ready when sending WebRTC answer`);
                    }
                } catch (error) {
                    console.log(error);
                }
            })();
        };

        // react to new offers
        for (const offerUserId in offers) {

            if (!(offerUserId in peerConnectionRef.current)) {
                console.log(`Reacting to an offer by creating an answer.`);
                handleOffer(offerUserId, offers[offerUserId]);
            }
        }

    }, [offers, audio, video, createPeerConnection, localStreamRef, socketRef]);


    // handle received answers
    useEffect(() => {

        for (const answerUserId in answers) {

            if (!(answerUserId in peerConnectionRef.current)) {
                console.log(`No connection with socketId: ${answerUserId} found when answer received`);
                continue;
            }

            const existingConnection = peerConnectionRef.current[answerUserId];

            if (!existingConnection.remoteDescription) {
                existingConnection.setRemoteDescription(answers[answerUserId])
                    .then(() => console.log(`Answer successfully set as remote description.`))
                    .catch((err) => console.log(err));
            }
        }

    }, [answers]);

    // handle incoming ICE candidates
    useEffect(() => {

        for (const iceCandidateUserId in iceCandidates) {

            if (!(iceCandidateUserId in peerConnectionRef.current)) {
                console.log(`No connection with socketId: ${iceCandidateUserId} found when ice-candidate received.`);
                continue;
            }

            const existingConnection = peerConnectionRef.current[iceCandidateUserId];

            for (const candidate of iceCandidates[iceCandidateUserId]) {
                const newIceCandidate = new RTCIceCandidate(candidate);

                existingConnection.addIceCandidate(newIceCandidate)
                    .then(() => console.log(`ICE candidate added successfully`))
                    .catch((err) => console.log(err));
            }
        }
    }, [iceCandidates]);

    // combined WebRTC context cleanup
    useEffect(() => {
        return () => {
            console.log('WebRTC context cleanup');

            for (const streamUserId in peerStreamRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                peerStreamRef.current[streamUserId]
                    .getTracks()
                    .forEach((track) => track.stop());
            }

            for (const connectionUserId in peerConnectionRef.current) {
                const connection = peerConnectionRef.current[connectionUserId];
                connection.ontrack = null;
                connection.onicecandidate = null;
                connection.close();
            }
            peerConnectionRef.current = {};
        };
    }, []);

    return (
        <WebRTCContext.Provider value={{
            connections: peerConnectionRef,
            streams: peerStreamRef,
            dataChannels: dataChannelRef,
            fileDataChannels: fileDataChannelRef,
            gainNodes: gainNodeRef,
            peerStreamReady,
            dataChannelReady,
            fileDataChannelReady,
        }}>
            {children}
        </WebRTCContext.Provider>
    );
}