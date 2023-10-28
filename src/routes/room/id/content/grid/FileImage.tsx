import { useEffect, useRef } from "react";

interface FileImage {
    file: File;
}

export default function FileImage({ file }: FileImage) {

    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (imageRef.current) {
            const blobURL = URL.createObjectURL(file);
            imageRef.current.src = blobURL;
        }
    }, [file]);

    return (
        <>
            <br />
            <img ref={imageRef} alt={file.name} width={'100%'} />
        </>
    );
}