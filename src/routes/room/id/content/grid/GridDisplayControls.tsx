import { Box, Button, Container, Tooltip } from "@mui/material";
import { combinedUserState, displayState } from "../../../../../types/user";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useEffect, useRef, useState } from "react";
import StreamDisplayControl from "./StreamDisplayControl";
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

interface GridDisplayControls {
    streams: Map<string, combinedUserState>;
    setHeight: (input: number) => void;
    height: number;
    toggle: () => void;
    show: boolean;
    changeUserDisplayState: (userId: string, state: displayState) => void;
}

export default function GridDisplayControls({ streams, setHeight, height, toggle, show, changeUserDisplayState }: GridDisplayControls) {

    const streamArray = Array.from(streams.values());
    //const [streamArray, setStreamArray] = useState<string[]>(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
    const [activeStream, setActiveStream] = useState<string>('');

    const containerRef = useRef<HTMLDivElement>();



    useEffect(() => {
        if (streamArray.length > 0 && activeStream === '') {
            setActiveStream(streamArray[0].socketId);
            //setActiveStream(streamArray[0]);
        }
    }, [streamArray]);


    useEffect(() => {
        if (containerRef && containerRef.current) {
            const containerHeight = containerRef.current.clientHeight;
            setHeight(containerHeight);
        }
    }, [setHeight]);

    function getUserDisplaySwitchFunction(userId: string) {
        return (state: displayState) => changeUserDisplayState(userId, state);
    }

    function handleActiveStreamChange(delta: number) {


        let activeIndex = streamArray.findIndex(stream => stream.socketId === activeStream);
        if (delta > 0) {
            activeIndex += 1;
            if (activeIndex >= streamArray.length) {
                activeIndex = 0;
            }
        } else if (delta < 0) {
            activeIndex -= 1;
            if (activeIndex < 0) {
                activeIndex = streamArray.length - 1;
            }
        }

        setActiveStream(streamArray[activeIndex].socketId);
    }






    return (
        <Box
            ref={containerRef}
            sx={{
                position: 'fixed',
                bottom: show ? '0' : `calc(-${height}px + 32px)`,
                left: 0,
                width: '100%',
                height: '20% ',
                minHeight: '240px',
                //minHeight: '200px',
                background: theme => `linear-gradient(0deg, ${theme.palette.background.secondaryDefault} 0%, ${theme.palette.background.default} 92%)`,
                backgroundRepeat: 'no-repeat',
                display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
                pointerEvents: 'none'
            }}>

            <Tooltip title="Stream Display Settings" placement="top">
                <Button sx={{ height: '32px', pointerEvents: 'auto' }} onClick={() => toggle()}>
                    <ExpandLessRoundedIcon fontSize="large" sx={{
                        transform: show ? 'rotate(180deg)' : 'none'
                    }} />
                </Button>
            </Tooltip>

            <Container sx={{ height: 'calc(100% - 32px)', pointerEvents: 'auto' }}>
                <Box

                    sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>


                    <Box sx={{
                        height: '100%',
                        width: '100%',
                        display: 'flex', justifyContent: 'start', alignItems: 'center',
                        overflow: 'hidden',
                        position: 'relative',
                        paddingTop: 2,
                        paddingBottom: 4
                    }}>
                        <Button sx={{
                            height: '100%',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            zIndex: 10
                        }}
                            onClick={() => handleActiveStreamChange(-1)}
                        >
                            <PlayArrowRoundedIcon fontSize="large" sx={{ transform: 'rotate(180deg)' }} />
                        </Button>

                        <Box sx={{
                            height: '100%',
                            width: '100%',
                            display: 'flex', justifyContent: 'start', alignItems: 'center',
                            overflow: 'visible',
                            transform: 'translateX(50%)'
                        }}>
                            {streamArray.map((stream) => {
                                const active = stream.socketId === activeStream;
                                const activeIndex = streamArray.findIndex(stream => stream.socketId === activeStream);
                                let transformValue = `translateX(${(-activeIndex - 0.5) * 100}%)`;
                                if (!active) {
                                    transformValue += ' scale(0.75)';
                                }

                                return (
                                    <Box
                                        key={`display_control_${stream.socketId}`}
                                        onClick={() => setActiveStream(stream.socketId)}
                                        sx={{
                                            height: '100%',
                                            minWidth: '320px',
                                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                                            //border: '5px solid black',
                                            //transform: active ? '' : 'scale(0.5)',
                                            //pointerEvents: active ? 'auto' : 'none',
                                            transform: transformValue,
                                            transition: theme => theme.transitions.create(['transform'], {
                                                duration: 500
                                            })
                                        }}
                                    >
                                        <StreamDisplayControl
                                            active={stream.socketId === activeStream}
                                            user={stream}
                                            displaySwitch={getUserDisplaySwitchFunction(stream.socketId)}
                                        />
                                    </Box>
                                );

                            })}
                        </Box>

                        <Button sx={{
                            height: '100%',
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            zIndex: 10
                        }}
                            onClick={() => handleActiveStreamChange(+1)}
                        >
                            <PlayArrowRoundedIcon fontSize="large" />
                        </Button>

                    </Box>



                </Box>
            </Container>
        </Box>
    );
}