import { useEffect, useRef } from "react";
import { useLocalSettingsContext } from "../../../components/LocalSettingsContext";

interface AudioFrequencyVisual {
    stream: MediaStream;
}

export function AudioFrequencyVisual({ stream }: AudioFrequencyVisual) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { mode } = useLocalSettingsContext();

    // scale canvas width
    useEffect(() => {
        if (!canvasRef || !canvasRef.current || !canvasRef.current.parentElement) {
            return;
        }

        const containerWidth = canvasRef.current.parentElement.clientWidth;
        canvasRef.current.width = containerWidth;

        const aspectRatio = 16 / 9;
        canvasRef.current.height = containerWidth / aspectRatio;


    }, []);

    useEffect(() => {
        if (!canvasRef || !canvasRef.current) {
            return;
        }

        if (!(stream instanceof MediaStream)) {
            console.error('STREAM IS NOT A MEDIASTREAM');
            console.log(typeof stream);
            console.log(stream);
            return;
        }

        // setup audio analyser
        const audioCtx = new AudioContext();
        const analyser = audioCtx.createAnalyser();

        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        analyser.minDecibels = -90;
        analyser.maxDecibels = -10;
        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.85;

        const bufferLength = analyser.frequencyBinCount; // half the fftSize
        const dataArray = new Float32Array(bufferLength);


        // start requestAnimationFrame loop
        const canvasCtx = canvasRef.current.getContext("2d");
        const WIDTH = canvasRef.current.width;
        const HEIGHT = canvasRef.current.height;

        let requestFrameId = 0;
        let minDb = -140;
        let maxDb = -120;
        //let noiseAverage = -90;

        function draw() {
            requestFrameId = window.requestAnimationFrame(draw);

            if (!canvasCtx) {
                throw new Error(`2D canvas context could not be created`);
            }

            // reset previous frame 
            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);


            // load new data into dataArray
            analyser.getFloatFrequencyData(dataArray);

            const barWidth = (WIDTH / bufferLength) * 1;
            const spaceBetweenBars = barWidth * 0.5;
            let barHeight;
            let x = WIDTH / 2 - barWidth / 2;


            // minimum is continuously reset (for noise)
            // maximum is set as an overall maximum
            let newMinDb = 100;
            let newMaxDb = maxDb;
            //let newNoiseAverage = 0;
            //let newNoiseAverageCount = 0;

            for (let i = 0; i < bufferLength; i++) {
                // update range for the next frame
                // minimum taken only around the center (low Db values)
                if (dataArray[i] < newMinDb && i < bufferLength / 3) {
                    newMinDb = dataArray[i];
                }
                if (dataArray[i] > newMaxDb) {
                    newMaxDb = dataArray[i];
                }
                /*
                if (i > bufferLength / 4 && i < bufferLength / 2) {
                    newNoiseAverage += dataArray[i];
                    newNoiseAverageCount += 1;
                }
                */

                //console.log(dataArray[i]);
                // values are in dB, low volume = approx - 140 dB
                // scaled value between 0 and 1 * HEIGHT
                barHeight = Math.min(1, Math.max(0,
                    (dataArray[i] - (- 90)) / (maxDb - minDb)
                )) * HEIGHT;

                const barColor = mode === 'light' ?
                    `rgb(${Math.floor(barHeight)},0,0)`
                    :
                    `rgb(${255 - Math.floor(barHeight) * 2},255,255)`;

                canvasCtx.strokeStyle = barColor;
                canvasCtx.fillStyle = barColor;
                canvasCtx.beginPath();
                canvasCtx.roundRect(x, (HEIGHT - barHeight) / 2, barWidth, barHeight, 50);
                canvasCtx.stroke();
                canvasCtx.fill();
                if (i > 0) {
                    canvasCtx.beginPath();
                    canvasCtx.roundRect(WIDTH - x - barWidth, (HEIGHT - barHeight) / 2, barWidth, barHeight, 50);
                    canvasCtx.stroke();
                    canvasCtx.fill();
                }

                /*
                canvasCtx.fillStyle = "rgb(" + Math.floor(barHeight) + ",50,50)";
                canvasCtx.fillRect(x, (HEIGHT - barHeight) / 2, barWidth, barHeight);
                if (i > 0) {
                    canvasCtx.fillRect(WIDTH - x, (HEIGHT - barHeight) / 2, barWidth, barHeight);
                }

                */

                x += barWidth + spaceBetweenBars;
            }

            //newNoiseAverage = newNoiseAverage / newNoiseAverageCount;

            //noiseAverage = newNoiseAverage;
            minDb = newMinDb;
            maxDb = newMaxDb;

        }

        requestFrameId = window.requestAnimationFrame(draw);

        return () => {
            window.cancelAnimationFrame(requestFrameId);
        };

    }, [stream, mode]);


    return (
        <canvas ref={canvasRef} width={500} height={200} />
    );
}
