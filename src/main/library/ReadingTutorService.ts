import {ITextService} from "./text-services/ITextService";
import {IViewService} from "./view-services/IViewService";
import {IWordReceiverService} from "./word-receivers/IWordReceiverService";
import {IReadingTutorService} from "./IReadingTutorService";
import {WordData} from "./models/WordData";

export class ReadingTutorService implements IReadingTutorService {

    _isRunning = false;
    private textService: ITextService;
    private viewService: IViewService;
    private wordReceiverService: IWordReceiverService;

    constructor(textService: ITextService, viewService: IViewService, wordReceiverService: IWordReceiverService) {
        this.textService = textService;
        this.viewService = viewService;
        this.wordReceiverService = wordReceiverService;
        textService.setReadingTutorService(this);
        viewService.setReadingTutorService(this);
        wordReceiverService.setReadingTutorService(this);
    }

    start(): void {
        this._isRunning = true;
        this.wordReceiverService.setOnWordsReceive((words) => {
            this.onWordsReceived(words)
        });

        this.wordReceiverService.start();
        this.viewService.setText(this.textService.getWordData());
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
        this.viewService.setWordCorrect(this.textService.getCurrentIndex());
        this.textService.acceptCurrentWord();
        this.viewService.setCurrentWordHighlightIndex(this.textService.getCurrentIndex());
    }

    getCurrentWordIndex(): number {
        return this.textService.getCurrentIndex();
    }

    setText(text: string): void {
        this.textService.setText(text);
    }

    getWordData(): WordData[] {
        return this.textService.getWordData();
    }

    receiveWords(...words: string[]): void {
        console.log("Received words: " + JSON.stringify(words));
        this.textService.receiveWords(...words);
    }

    getPhrases(): string[] {
        const words = this.textService.getWordData().map((wordData: WordData) => {
            return wordData.word;
        });
        return Array.from(new Set(words));
    }
}