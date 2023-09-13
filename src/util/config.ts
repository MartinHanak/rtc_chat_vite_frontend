export const BACKEND_URL = import.meta.env.DEV
  ? "http://localhost:5000"
  : "CHANGE TO PRODUCTION URL";

interface RTCPeerConnectionConfig {
  iceServers: RTCIceServer[];
}

export const ICE_SERVERS: RTCPeerConnectionConfig = {
  iceServers: [
    {
      urls: [
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        //'stun:stun3.l.google.com:19302',
        //'stun:stun4.l.google.com:19302'
      ],
    },
  ],
};
