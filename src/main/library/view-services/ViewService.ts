import {IViewService} from "./IViewService";
import {ICommunicationService} from "../communication-services/ICommunicationService";
import {WordData} from "../WordData";
import {IWordAnalyzer} from "../word-analyzers/IWordAnalyzer";
import {IReadingTutorService} from "../IReadingTutorService";

export class ViewService implements IViewService {
    private _isRunning = false;
    private index = 0;

    constructor(private communicationService: ICommunicationService, private wordAnalyzer: IWordAnalyzer) {
        this.communicationService.receiveMessage('start', () => this.start());
        this.communicationService.receiveMessage('next-word', () => this.nextWord());

    }

    nextWord(): void {
        this.index++;
        this.setCurrentWordHighlightIndex(this.index);
        //this.readingTutorService.acceptCurrentWord();
        //this.setCurrentWordHighlightIndex(this.readingTutorService.getCurrentWordIndex());
    }

    private start(): void {
        this._isRunning = true;
    }


    setWordCorrect(index: number): void {
        //
    }

    setCurrentWordHighlightIndex(index: number): void {
        this.communicationService.sendMessage('set-current-word-highlight-index', index);
    }

    getCurrentWordIndex(): number {
        return 0;
    }

    setText(text: string): void {
        // this.communicationService.sendMessage('set-text', text);
        this.setWordData(this.wordAnalyzer.analyze(text));
    }

    isRunning(): boolean {
        return this._isRunning;
    }

    setWordData(wordData: WordData[]): void {
        this.communicationService.sendMessage('set-word-data', wordData);
    }
}
