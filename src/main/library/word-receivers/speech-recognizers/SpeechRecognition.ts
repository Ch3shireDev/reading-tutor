import {SpeechClient} from '@google-cloud/speech';
import {ISpeechRecognition} from "./ISpeechRecognition";

export class SpeechRecognition implements ISpeechRecognition {
    private readonly sampleRateHertz: number;
    private readonly encoding: string;
    private readonly languageCode: string;
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

    getRecognizeStream(): any {
        return new SpeechClient()
            .streamingRecognize(this.requestConfig)
            .on("error", console.error)
    }
}