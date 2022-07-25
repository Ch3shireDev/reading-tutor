import {ITextService} from "./text-services/ITextService";
import {IViewService} from "./view-services/IViewService";
import {IWordReceiverService} from "./word-receivers/IWordReceiverService";
import {IReadingTutorService} from "./IReadingTutorService";

export class ReadingTutorService implements IReadingTutorService {

    _isRunning = false;
    _currentIndex = 0;
    private textService: ITextService;
    private viewService: IViewService;
    private wordReceiverService: IWordReceiverService;

    constructor(textService: ITextService, viewService: IViewService, wordReceiverService: IWordReceiverService) {
        this.textService = textService;
        this.viewService = viewService;
        this.wordReceiverService = wordReceiverService;
        viewService.setReadingTutorService(this);
        wordReceiverService.setReadingTutorService(this);
    }

    start(): void {
        this._isRunning = true;
        this.wordReceiverService.setOnWordsReceive((words) => {
            this.onWordsReceived(words)
        });
        this.wordReceiverService.start();

        this.viewService.setText(this.textService.getText());
        this.viewService.setCurrentWordHighlightIndex(0);
    }

    onWordsReceived(words: string[]): void {
        words.forEach((word: string) => {
            if (word === this.textService.getCurrentWord()) {
                this.acceptCurrentWord();
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

    acceptCurrentWord(): void {
        this.textService.acceptCurrentWord();
        this.viewService.setWordCorrect(this._currentIndex);
        this._currentIndex++;
        this.viewService.setCurrentWordHighlightIndex(this._currentIndex);
    }

    getCurrentWordIndex(): number {
        return this.textService.getCurrentIndex();
    }

    setText(text: string): void {
        this.textService.setText(text);
    }
}