import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

interface Video {
    stream: MediaStream;
}

export function Video({ stream }: Video) {

    const localRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (localRef && localRef.current) {
            localRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <Box component='video' ref={localRef} autoPlay muted width='100%' height='100%' ></Box>
    );
}