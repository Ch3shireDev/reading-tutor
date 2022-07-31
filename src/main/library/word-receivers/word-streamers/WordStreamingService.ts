import {Writable} from 'stream';
import recorder from 'node-record-lpcm16';
import {SpeechData} from "../models/SpeechData";
import {v1p1beta1 as speech} from "@google-cloud/speech";
import {IWordStreamingService} from "./IWordStreamingService";


class Config {
    public sampleRateHertz = 16000;
    public encoding = 'LINEAR16';
    public languageCode = 'pl-PL';
    public maxAlternatives = 1;
    public speechContexts: SpeechContext[] = [];
    model?: string = undefined;

}

export class WordStreamingService implements IWordStreamingService {

    encoding = 'LINEAR16';
    sampleRateHertz = 16000;
    languageCode = 'pl-PL';
    streamingLimit = 290000;

    recognizeStream: any = null;
    restartCounter = 0;
    audioInput: any[] = [];
    lastAudioInput: any[] = [];
    resultEndTime = 0.1;
    isFinalEndTime = 0.1;
    finalRequestEndTime = 0.1;
    newStream = true;
    bridgingOffset = 0;
    lastTranscriptWasFinal = false;
    client = new speech.SpeechClient();

    audioInputStreamTransform: Writable;

    speechCallback: ((stream: SpeechData) => void) | null = null;
    private maxAlternatives = 10;
    private phrases: string[] = [];

    constructor() {
        this.audioInputStreamTransform = new Writable({
            write: WordStreamingService.prototype.write.bind(this),
            final: WordStreamingService.prototype.end.bind(this)
        });
    }

    public setCallback(callback: (stream: SpeechData) => void): void {
        this.speechCallback = callback;
    }

    public start(): void {
        // Start recording and send the microphone input to the Speech API
        recorder
            .record({
                sampleRateHertz: this.sampleRateHertz,
                threshold: 0, // Silence threshold
                silence: 1000,
                keepSilence: true,
                recordProgram: 'rec', // Try also "arecord" or "sox"
            })
            .stream()
            .on('error', (err: Error) => {
                console.error('Audio recording error ' + err);
            })
            .pipe(this.audioInputStreamTransform);

        console.log('');
        console.log('Listening, press Ctrl+C to stop.');

        this.startStream();
    }

    getRequest(): Request {
        const config = new Config();
        config.sampleRateHertz = this.sampleRateHertz;
        config.encoding = this.encoding;
        config.languageCode = this.languageCode;
        config.maxAlternatives = this.maxAlternatives;
        config.speechContexts = this.getSpeechContexts();
        config.model = "latest_long";
        const request = new Request(config, true, false);
        return request;
    }

    startStream(): void {
        this.audioInput = [];
        this.recognizeStream = this.client
            .streamingRecognize(this.getRequest())
            .on('error', (err: { code: number }) => {
                if (err.code === 11) {
                    this.restartStream();
                } else {
                    console.error('API request error ' + err);
                }
            })
            .on('data', this.speechCallback);

        // Restart stream when streamingLimit expires
        setTimeout(WordStreamingService.prototype.restartStream.bind(this), this.streamingLimit);
    }

    restartStream(): void {
        if (this.recognizeStream) {
            this.recognizeStream.end();
            this.recognizeStream.removeListener('data', this.speechCallback);
            this.recognizeStream = null;
        }
        if (this.resultEndTime > 0) {
            this.finalRequestEndTime = this.isFinalEndTime;
        }
        this.resultEndTime = 0;

        this.lastAudioInput = [];
        this.lastAudioInput = this.audioInput;

        this.restartCounter++;

        if (!this.lastTranscriptWasFinal) {
            process.stdout.write('\n');
        }

        this.newStream = true;

        this.startStream();
    }

    write(chunk: Buffer, encoding: BufferEncoding, next: (error?: (Error | null | undefined)) => void): void {
        // write(chunk: any, encoding: string, next: () => void): void {
        if (this.newStream && this.lastAudioInput.length !== 0) {
            // Approximate math to calculate time of chunks
            const chunkTime = this.streamingLimit / this.lastAudioInput.length;
            if (chunkTime !== 0) {
                if (this.bridgingOffset < 0) {
                    this.bridgingOffset = 0;
                }
                if (this.bridgingOffset > this.finalRequestEndTime) {
                    this.bridgingOffset = this.finalRequestEndTime;
                }
                const chunksFromMS = Math.floor(
                    (this.finalRequestEndTime - this.bridgingOffset) / chunkTime
                );
                this.bridgingOffset = Math.floor(
                    (this.lastAudioInput.length - chunksFromMS) * chunkTime
                );

                for (let i = chunksFromMS; i < this.lastAudioInput.length; i++) {
                    this.recognizeStream.write(this.lastAudioInput[i]);
                }
            }
            this.newStream = false;
        }

        this.audioInput.push(chunk);

        if (this.recognizeStream) {
            this.recognizeStream.write(chunk);
        }

        next();
    }

    public end(): void {
        this.recognizeStream?.end();

    }

    setContext(phrases: string[]): void {
        this.phrases = phrases;
    }

    private getSpeechContexts(): SpeechContext[] {
        return [new SpeechContext(this.phrases, 20)];
    }
}


class SpeechContext {
    constructor(private phrases: string[], private boost: number = 1.0) {
    }
}

class Request {
    constructor(private config: Config, private interimResults: boolean, private singleUtterance: boolean) {
    }
}
