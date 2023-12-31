import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

interface Audio {
    stream: MediaStream;
    muted?: boolean;
}

export function Audio({ stream, muted }: Audio) {
    const localRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (localRef && localRef.current) {
            localRef.current.srcObject = stream;
        }
    }, [stream]);

    return <Box component='audio' muted={muted} ref={localRef} autoPlay ></Box>;
}