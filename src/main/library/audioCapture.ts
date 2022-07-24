import * as recorder from "node-record-lpcm16";

export class AudioCapture {
    sampleRateHertz;

    constructor() {
        this.sampleRateHertz = 16000;
    }

    capture(): any {
        return recorder
            .record({
                sampleRateHertz: this.sampleRateHertz,
                threshold: 0, //silence threshold
                recordProgram: "rec", // "arecord", "sox", "rec"
                silence: "5.0", //seconds of silence before ending

            })
            .stream()
            .on("error", console.error)
    }
}

module.exports = {AudioCapture};