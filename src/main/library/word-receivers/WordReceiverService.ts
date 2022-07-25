import {IWordReceiverService} from "./IWordReceiverService";
import {IReadingTutorService} from "../IReadingTutorService";

export class WordReceiverService implements IWordReceiverService {
    private readingTutorService: IReadingTutorService | null = null;
    private _isRunning = false;

    isRunning(): boolean {
        return this._isRunning;
    }

    receiveWords(...words: string[]): void {
        //
    }

    setOnWordsReceive(eventFunc: (words: string[]) => void): void {
        //
    }

    start(): void {
        if (this._isRunning) return;
        this._isRunning = true;
    }

    end(): void {
        if (!this._isRunning) return;
        this._isRunning = false;
    }

    setReadingTutorService(readingTutorService: IReadingTutorService): void {
        this.readingTutorService = readingTutorService;
    }


}