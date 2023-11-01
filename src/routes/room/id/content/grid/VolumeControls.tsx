import { useEffect, useState } from "react";
import { useWebRTCContext } from "../../context/WebRTCContext";
import { Slider, Stack } from "@mui/material";
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

interface VolumeControls {
    socketId: string;
}

export default function VolumeControls({ socketId }: VolumeControls) {

    const { gainNodes } = useWebRTCContext();

    const [gainExponent, setGainExponent] = useState<number>(() => {
        if (gainNodes && gainNodes.current && socketId in gainNodes.current) {
            return Math.log10(gainNodes.current[socketId].gain.value);
        } else {
            return 1;
        }
    });

    useEffect(() => {
        console.log(socketId);
        if (gainNodes && gainNodes.current && socketId in gainNodes.current) {
            gainNodes.current[socketId].gain.value = 10 ** gainExponent;
        }
    }, [gainExponent, gainNodes, socketId]);

    const handleChange = (_event: Event, newValue: number | number[]) => {
        setGainExponent(newValue as number);
    };

    return (<Stack spacing={2} direction="row" alignItems={"center"}>
        <VolumeDown />
        <Slider aria-label="Volume" min={0} step={0.05} max={2} value={gainExponent} onChange={handleChange} />
        <VolumeUp />
    </Stack>);
}