import {IWordReceiverService} from '../../main/library/IWordReceiverService';
import {EventEmitter} from 'node:events';

export class MockWordReceiverService extends IWordReceiverService {
    private eventEmitter: any;
    private _isRunning: boolean;

    constructor() {
        super();
        this.eventEmitter = new EventEmitter();
        this._isRunning = false;
    }

    start() {
        this._isRunning = true;
    }

    end() {
        this._isRunning = false;
    }

    receiveWords(words: string[]) {
        this.eventEmitter.emit('receive-words', words);
    }

    setOnWordsReceive(eventFunc: (words: string[]) => void) {
        this.eventEmitter.on('receive-words', eventFunc);
    }

    isRunning() {
        return this._isRunning;
    }
}