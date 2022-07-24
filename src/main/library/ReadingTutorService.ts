import {ITextService} from "./text-services/ITextService";
import {IViewService} from "./view-services/IViewService";
import {IWordReceiverService} from "./word-receivers/IWordReceiverService";

export class ReadingTutorService {

    _isRunning = false;
    _currentIndex = 0;
    private textService: ITextService;
    private viewService: IViewService;
    private wordReceiverService: IWordReceiverService;

    constructor(textService: ITextService, viewService: IViewService, wordReceiverService: IWordReceiverService) {
        this.textService = textService;
        this.viewService = viewService;
        this.wordReceiverService = wordReceiverService;
    }

    start(): void {
        this._isRunning = true;
        this.wordReceiverService.setOnWordsReceive((words) => {
            this.onWordsReceived(words)
        });
        this.wordReceiverService.start();
    }

    onWordsReceived(words: string[]): void {
        words.forEach((word: string) => {
            if (word === this.textService.getCurrentWord()) {
                this.acceptWord();
            }
        });
    }

    end(): void {
        this._isRunning = false;
        this.wordReceiverService.end();
    }

    isRunning(): boolean {
        return this._isRunning;
    }

    acceptWord(): void {
        this.textService.acceptCurrentWord();
        this.viewService.setWordCorrect(this._currentIndex);
        this._currentIndex++;
        this.viewService.setCurrentWordIndex(this._currentIndex);
    }
}

module.exports = {ReadingTutorService};