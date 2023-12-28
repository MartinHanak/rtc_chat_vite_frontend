import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

interface Video {
    stream: MediaStream;
    muted?: boolean;
}

export function Video({ stream, muted }: Video) {

    const localRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (localRef && localRef.current) {
            localRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <Box component='video' muted={muted} ref={localRef} autoPlay width='100%' height='100%' ></Box>
    );
}