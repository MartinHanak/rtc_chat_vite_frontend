import { Box, Button, Container } from "@mui/material";
import { combinedUserState } from "../../../../../types/user";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useEffect, useRef } from "react";

interface GridDisplayControls {
    streams: Map<string, combinedUserState>;
    setHeight: (input: number) => void;
    toggle: () => void;
    show: boolean;
}

export default function GridDisplayControls({ streams, setHeight, toggle, show }: GridDisplayControls) {

    const containerRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (containerRef && containerRef.current) {
            const containerHeight = containerRef.current.clientHeight;
            setHeight(containerHeight);
        }
    }, [setHeight]);

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: show ? '0' : 'calc(-20%  + 32px)',
                left: 0,
                width: '100%',
                height: '20% ',
                backgroundColor: 'red',
            }}>

            <Button sx={{ width: '100%', height: '32px' }} onClick={() => toggle()}>
                Toggle
            </Button>

            <Container
                sx={{ height: 'calc(100% - 32px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>

                <Button sx={{ height: '100%' }}>
                    <PlayArrowRoundedIcon fontSize="large" sx={{ transform: 'rotate(180deg)' }} />
                </Button>

                <Box ref={containerRef} sx={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                    hello
                </Box>

                <Button sx={{ height: '100%' }}>
                    <PlayArrowRoundedIcon fontSize="large" />
                </Button>

            </Container>
        </Box>
    );
}