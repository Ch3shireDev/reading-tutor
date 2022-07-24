// const {SpeechClient} = require("@google-cloud/speech");

import SpeechClient from '@google-cloud/speech';

class SpeechRecognition {
    private sampleRateHertz: number;
    private encoding: string;
    private languageCode: string;
    private requestConfig: { interimResults: boolean; config: { sampleRateHertz: number; encoding: string; languageCode: string } };

    constructor() {
        this.sampleRateHertz = 16000;
        this.encoding = "LINEAR16";
        this.languageCode = "pl-PL";

        this.requestConfig = {
            config: {
                encoding: this.encoding, sampleRateHertz: this.sampleRateHertz, languageCode: this.languageCode,
            }, interimResults: true,
        };
    }

    getRecognizeStream() {

        return new SpeechClient()
            .streamingRecognize(this.requestConfig)
            .on("error", console.error)
            .on("data", (data:any) => {
                const text = JSON.stringify(data.results[0].alternatives[0].transcript, null, 2);
                console.log(text);
            });

    }
}

module.exports = {SpeechRecognition};