import {IWordReceiverService} from '../../main/library/word-receivers/IWordReceiverService';
import {EventEmitter} from 'node:events';
import {IReadingTutorService} from "../../main/library/IReadingTutorService";

export class MockWordReceiverService implements IWordReceiverService {
    private eventEmitter: EventEmitter;
    private _isRunning: boolean;
    private readingTutorService: IReadingTutorService | null = null;

    constructor() {
        this.eventEmitter = new EventEmitter();
        this._isRunning = false;
    }

    start(): void {
        this._isRunning = true;
    }

    end(): void {
        this._isRunning = false;
    }

    receiveWords(...words: string[]): void {
        this.eventEmitter.emit('receive-words', words);
    }

    setOnWordsReceive(eventFunc: (words: string[]) => void): void {
        this.eventEmitter.on('receive-words', eventFunc);
    }

    isRunning(): boolean {
        return this._isRunning;
    }

    setReadingTutorService(readingTutorService: IReadingTutorService): void {
        this.readingTutorService = readingTutorService;
    }
}