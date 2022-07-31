import {IWordReceiverService} from "./IWordReceiverService";
import {IReadingTutorService} from "../IReadingTutorService";
import {IAudioCapture} from "./audio-capturers/IAudioCapture";
import {ISpeechRecognition} from "./speech-recognizers/ISpeechRecognition";
import {SpeechData} from "./models/SpeechData";
import {SpeechAlternative} from "./models/SpeechAlternative";
import {IWordProcessorService} from "./word-processors/IWordProcessorService";
import {IWordStreamingService} from "./word-streamers/IWordStreamingService";

export class WordReceiverService implements IWordReceiverService {
    private readingTutorService: IReadingTutorService | null = null;
    private _isRunning = false;

    // public constructor(private wordProcessor:IWordProcessorService, private audioCapture: IAudioCapture, private speechRecognition: ISpeechRecognition) {
    //
    // }

    public constructor(private wordProcessor:IWordProcessorService, private streamingService:IWordStreamingService) {
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
        this.streamingService.setCallback( (data: SpeechData) => {
            data.results[0].alternatives.forEach((alternative: SpeechAlternative) => {
                const words = alternative.transcript.split(" ").filter((word) => word.length > 0);
                this.receiveWords(...this.wordProcessor.processWords(words));
            });
        });

        this.streamingService.start();
        // this.audioCapture.capture().pipe(this.speechRecognition.getRecognizeStream()).on("data", (data: SpeechData) => {
        //     data.results[0].alternatives.forEach((alternative: SpeechAlternative) => {
        //         const words = alternative.transcript.split(" ").filter((word) => word.length > 0);
        //         this.receiveWords(...this.wordProcessor.processWords(words));
        //     });
        // });
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