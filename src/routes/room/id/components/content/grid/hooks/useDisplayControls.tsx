import { useRef, useState } from "react";

export default function useDisplayControls() {
    const [show, setShow] = useState(false);

    const controlsHeightRef = useRef(1);
    //const controlsToggleHeight = useRef(1);


    const toggleDisplayControls = () => {
        setShow((prev) => !prev);
    };

    const setHeight = (input: number) => {
        controlsHeightRef.current = input;
    };


    return {
        show,
        height: controlsHeightRef.current,
        setHeight: setHeight,
        toggle: toggleDisplayControls
    };
}