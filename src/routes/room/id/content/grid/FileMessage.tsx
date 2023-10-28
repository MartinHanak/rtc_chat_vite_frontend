import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";

interface FileMessage {
    username: string;
    userColor: string;
    file: File;
    fileName: string;
    type: string;
    show: boolean;
    delay: number;
}


export default function FileMessage({ username, userColor, file, fileName, show, delay }: FileMessage) {

    const [localTempShowMessage, setLocalTempShowMessage] = useState(true);

    useEffect(() => {
        const showDuration = 3000; // in ms

        const timeoutId = setTimeout(() => {
            setLocalTempShowMessage(false);
        }, showDuration);


        return () => {
            clearTimeout(timeoutId);
        };

    }, []);

    // const handleDownload = (inputBlob: Blob) => {
    //     const blobUrl = URL.createObjectURL(inputBlob);

    //     // Directly set the anchor's href and download attributes
    //     const downloadLink = document.createElement('a');
    //     downloadLink.href = blobUrl;
    //     downloadLink.download = `example.png`; // Set the file name

    //     downloadLink.click();

    //     // Release the Blob URL
    //     URL.revokeObjectURL(blobUrl);
    // };

    const getDownloadLink = (file: File) => {
        return URL.createObjectURL(file);
    };


    return (
        <Stack sx={{
            backgroundColor: theme => theme.palette.background.default,
            boxShadow: theme => theme.shadows[4],
            pointerEvents: (show || localTempShowMessage) ? 'auto' : 'none',
            opacity: (show || localTempShowMessage) ? '1' : '0',
            transition: theme => theme.transitions.create(['opacity'], {
                duration: 1000,
                delay: (show || localTempShowMessage) ? delay : 0
            }),
            // used instead of justifyContent: flex-end because of a bug:
            // https://stackoverflow.com/questions/36130760/use-justify-content-flex-end-and-to-have-vertical-scrollbar
            '&:first-of-type': {
                marginTop: 'auto !important'
            },
            alignSelf: 'end',
            paddingY: 1,
            paddingX: 2,
            borderRadius: '5px'
        }}>

            <Box sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
                <Box sx={{ color: userColor, fontWeight: 700 }} component={"span"}>{username}</Box>:&nbsp;
                <a href={getDownloadLink(file)} download={fileName}>{fileName}</a>
            </Box>
        </Stack>
    );
}