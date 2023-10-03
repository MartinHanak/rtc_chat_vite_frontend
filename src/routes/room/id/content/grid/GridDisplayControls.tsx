import { Box, Button, Container, Tooltip } from "@mui/material";
import { combinedUserState, displayState } from "../../../../../types/user";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useEffect, useMemo, useRef, useState } from "react";
//import StreamDisplayControl from "./StreamDisplayControl";
import { grey } from "@mui/material/colors";

interface GridDisplayControls {
    streams: Map<string, combinedUserState>;
    setHeight: (input: number) => void;
    toggle: () => void;
    show: boolean;
    changeUserDisplayState: (userId: string, state: displayState) => void;
}

export default function GridDisplayControls({ streams, setHeight, toggle, show, changeUserDisplayState }: GridDisplayControls) {

    //const streamArray = Array.from(streams.values());
    const [streamArray, setStreamArray] = useState<string[]>(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
    const [activeStream, setActiveStream] = useState<string>('9');

    const containerRef = useRef<HTMLDivElement>();

    /*
    useEffect(() => {
        if (streamArray.length > 0 && activeStream === '') {
            //setActiveStream(streamArray[0].socketId);
            setActiveStream(streamArray[0]);
        }
    }, [streamArray]);
    */

    const displayedArray = useMemo(() => {
        const activeIndex = streamArray.indexOf(activeStream);
        if (activeIndex === -1) {
            return streamArray;
        }
        const partBeforeActive = streamArray.slice(0, activeIndex);

        const partAfterActive = streamArray.slice(activeIndex + 1, streamArray.length);

        return [...partAfterActive, ...partBeforeActive, activeStream, ...partAfterActive, ...partBeforeActive];

    }, [streamArray, activeStream]);

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

            <Tooltip title="Stream Display Settings" placement="top">
                <Button sx={{ width: '100%', height: '32px' }} onClick={() => toggle()}>
                    Toggle
                </Button>
            </Tooltip>

            <Container sx={{ height: 'calc(100% - 32px)' }}>
                <Box
                    ref={containerRef}
                    sx={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>

                    <Button sx={{ height: '100%' }} >
                        <PlayArrowRoundedIcon fontSize="large" sx={{ transform: 'rotate(180deg)' }} />
                    </Button>

                    <Box sx={{
                        height: '100%',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        overflow: 'hidden',
                    }}>
                        {displayedArray.map((stream, index) => {
                            console.log(`active stream is ${activeStream}`);

                            const active = stream === activeStream;
                            const halfLength = Math.floor(displayedArray.length / 2) - 1.5;

                            return (
                                <Box sx={{
                                    height: '100%',
                                    minWidth: '320px',
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                                    border: '5px solid black',
                                    //transform: active ? '' : 'scale(0.5)',
                                    pointerEvents: active ? 'auto' : 'none',
                                    backgroundColor: active ? '' : grey[400],
                                    transform: `translateX(-100%)`,
                                }}>
                                    {stream}
                                </Box>
                            );
                            /*
                            return (
                                <StreamDisplayControl key={`display_control_${stream.socketId}`}
                                    active={stream.socketId === activeStream}
                                    user={stream}
                                    displaySwitch={getUserDisplaySwitchFunction(stream.socketId)}
                                />
                            );
                            */

                        })}
                    </Box>


                    <Button sx={{ height: '100%' }}>
                        <PlayArrowRoundedIcon fontSize="large" />
                    </Button>

                </Box>
            </Container>
        </Box>
    );
}