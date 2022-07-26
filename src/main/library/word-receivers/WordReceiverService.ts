import {IWordReceiverService} from "./IWordReceiverService";
import {IReadingTutorService} from "../IReadingTutorService";
import {IAudioCapture} from "../audio-capturers/IAudioCapture";
import {ISpeechRecognition} from "../speech-recognizers/ISpeechRecognition";
import {SpeechData} from "./SpeechData";
import {SpeechAlternative} from "./SpeechAlternative";

export class WordReceiverService implements IWordReceiverService {
    private readingTutorService: IReadingTutorService | null = null;
    private _isRunning = false;

    public constructor(private audioCapture:IAudioCapture, private speechRecognition:ISpeechRecognition) {

    }

    isRunning(): boolean {
        return this._isRunning;
    }

    receiveWords(...words: string[]): void {
        if(this.readingTutorService===null)return;
        this.readingTutorService.receiveWords(...words);
    }

    setOnWordsReceive(eventFunc: (words: string[]) => void): void {
        //
    }

    start(): void {
        if (this._isRunning) return;
        this._isRunning = true;
        this.audioCapture.capture().pipe(this.speechRecognition.getRecognizeStream()).on("data", (data:SpeechData) => {
            data.results[0].alternatives.forEach((alternative:SpeechAlternative) => {
                if(alternative.confidence < 0.5)return;
                this.receiveWords(...alternative.transcript.split(" "));
            });
        });
    }

    end(): void {
        if (!this._isRunning) return;
        this._isRunning = false;
    }

    setReadingTutorService(readingTutorService: IReadingTutorService): void {
        this.readingTutorService = readingTutorService;
    }


}