import { useEffect, useRef } from "react";

interface FileVideo {
    file: File;
}

export default function FileVideo({ file }: FileVideo) {

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            const blobURL = URL.createObjectURL(file);
            videoRef.current.src = blobURL;
        }
    }, [file]);

    return (
        <>
            <br />
            <video ref={videoRef} controls width={'100%'} />
        </>
    );
}