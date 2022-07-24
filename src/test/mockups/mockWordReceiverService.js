import {IWordReceiverService} from '../../main/library/IWordReceiverService';
import {EventEmitter} from 'node:events';

class MockWordReceiverService extends IWordReceiverService {
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

    receiveWords(...words) {
        this.eventEmitter.emit('receive-words', words);
    }

    setOnWordsReceive(eventFunc){
        this.eventEmitter.on('receive-words', eventFunc);
    }

    isRunning() {
        return this._isRunning;
    }
}

module.exports = {MockWordReceiverService};