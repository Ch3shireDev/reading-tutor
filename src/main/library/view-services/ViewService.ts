import {IViewService} from "./IViewService";
import {ICommunicationService} from "../communication-services/ICommunicationService";
import {WordData} from "../WordData";
import {IReadingTutorService} from "../IReadingTutorService";

export class ViewService implements IViewService {
    private _isRunning = false;
    private index = 0;
    private readingTutorService: IReadingTutorService | null = null;

    constructor(private communicationService: ICommunicationService) {
        this.communicationService.receiveMessage('start', () => this.start());
        this.communicationService.receiveMessage('next-word', () => this.nextWord());

    }

    nextWord(): void {
        this.index++;
        this.setCurrentWordHighlightIndex(this.index);
    }

    private start(): void {
        console.log('start of view service')
        this._isRunning = true;
        if (this.readingTutorService != null) this.readingTutorService.start();
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

    setText(wordData: WordData[]): void {
        this.communicationService.sendMessage('set-word-data', wordData);
    }

    isRunning(): boolean {
        return this._isRunning;
    }

    setReadingTutorService(readingTutorService: IReadingTutorService): void {
        this.readingTutorService = readingTutorService;
    }
}
