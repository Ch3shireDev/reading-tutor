import {IWordReceiverService} from "./IWordReceiverService";
import {IReadingTutorService} from "../IReadingTutorService";
import {SpeechData} from "./models/SpeechData";
import {SpeechAlternative} from "./models/SpeechAlternative";
import {IWordProcessorService} from "./word-processors/IWordProcessorService";
import {IWordStreamingService} from "./word-streamers/IWordStreamingService";
import {SpeechResult} from "./models/SpeechResult";
import * as fs from 'fs';

export class WordReceiverService implements IWordReceiverService {
    private readingTutorService: IReadingTutorService | null = null;
    private _isRunning = false;

    // public constructor(private wordProcessor:IWordProcessorService, private audioCapture: IAudioCapture, private speechRecognition: ISpeechRecognition) {
    //
    // }

    public constructor(private wordProcessor: IWordProcessorService, private streamingService: IWordStreamingService) {
    }

    receiveWords(...words: string[]): void {
        if (this.readingTutorService === null) return;
        this.readingTutorService.receiveWords(...words);
    }

    setOnWordsReceive(eventFunc: (words: string[]) => void): void {
        //
    }


    start(): void {
        if (this._isRunning) return;
        this._isRunning = true;
        this.streamingService.setCallback((data: SpeechData) => {
            fs.writeFile(`./json_data/${Date.now()}.json`, JSON.stringify(data, null, 2), (err) => {console.log(err)});
            if (data.results.length === 0) return;
            data.results.forEach((result: SpeechResult) => {
                //if(result.isFinal)return;
                if (result.stability < 0.001) return;
                if (result.alternatives === undefined) return;
                result.alternatives.forEach((alternative: SpeechAlternative) => {
                    const words = alternative.transcript.split(" ").filter((word) => word.length > 0);
                    this.receiveWords(...this.wordProcessor.processWords(words));
                });
            });
        });

        if (this.readingTutorService !== null) {
            this.streamingService.setContext(this.readingTutorService.getPhrases());
        }

        this.streamingService.start();
    }

    isRunning(): boolean {
        return this._isRunning;
    }

    end(): void {
        if (!this._isRunning) return;
        this._isRunning = false;
        this.streamingService.end();
    }

    setReadingTutorService(readingTutorService: IReadingTutorService): void {
        this.readingTutorService = readingTutorService;
    }


}