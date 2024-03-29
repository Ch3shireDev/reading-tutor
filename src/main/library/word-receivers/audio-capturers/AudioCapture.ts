import * as recorder from "node-record-lpcm16";
import * as stream from "stream";
import {IAudioCapture} from "./IAudioCapture";

export class AudioCapture implements IAudioCapture {
    sampleRateHertz;

    constructor() {
        this.sampleRateHertz = 16000;
    }

    capture(): stream.Readable {
        const capturer = recorder
            .record({
                sampleRateHertz: this.sampleRateHertz,
                threshold: 0, //silence threshold
                recordProgram: "rec", // "arecord", "sox", "rec"
                silence: "5.0", //seconds of silence before ending

            })
            .stream()
            .on("error", console.error);

        console.log("Recording started");

        return capturer;
    }
}

module.exports = {AudioCapture};