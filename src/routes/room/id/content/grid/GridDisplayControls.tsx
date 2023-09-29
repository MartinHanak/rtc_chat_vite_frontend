import { Box, Button, Container } from "@mui/material";
import { combinedUserState, displayState } from "../../../../../types/user";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useEffect, useRef } from "react";
import StreamDisplayControl from "./StreamDisplayControl";

interface GridDisplayControls {
    streams: Map<string, combinedUserState>;
    setHeight: (input: number) => void;
    toggle: () => void;
    show: boolean;
    changeUserDisplayState: (userId: string, state: displayState) => void;
}

export default function GridDisplayControls({ streams, setHeight, toggle, show, changeUserDisplayState }: GridDisplayControls) {

    const containerRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (containerRef && containerRef.current) {
            const containerHeight = containerRef.current.clientHeight;
            setHeight(containerHeight);
        }
    }, [setHeight]);

    function getUserDisplaySwitchFunction(userId: string) {
        return (state: displayState) => changeUserDisplayState(userId, state);
    }


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

            <Container sx={{ height: 'calc(100% - 32px)' }}>
                <Box
                    ref={containerRef}
                    sx={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>

                    <Button sx={{ height: '100%' }} >
                        <PlayArrowRoundedIcon fontSize="large" sx={{ transform: 'rotate(180deg)' }} />
                    </Button>


                    {Array.from(streams.values()).map((stream) => {
                        return (
                            <StreamDisplayControl key={`display_control_${stream.socketId}`} user={stream} displaySwitch={getUserDisplaySwitchFunction(stream.socketId)} />
                        );

                    })}


                    <Button sx={{ height: '100%' }}>
                        <PlayArrowRoundedIcon fontSize="large" />
                    </Button>

                </Box>
            </Container>
        </Box>
    );
}