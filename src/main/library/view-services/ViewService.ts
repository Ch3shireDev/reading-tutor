import {IViewService} from "./IViewService";
import {ICommunicationService} from "./communication-services/ICommunicationService";
import {WordData} from "../models/WordData";
import {IReadingTutorService} from "../IReadingTutorService";

export class ViewService implements IViewService {
    private _isRunning = false;
    private index = 0;
    private readingTutorService: IReadingTutorService | null = null;
    private title = "";

    constructor(private communicationService: ICommunicationService) {
        this.communicationService.receiveMessage('start', () => this.start());
        this.communicationService.receiveMessage('next-word', () => this.nextWord());

    }

    private start(): void {
        this._isRunning = true;
        if (this.readingTutorService != null) this.readingTutorService.start();
    }

    nextWord(): void {
        this.index++;
        this.setCurrentWordHighlightIndex(this.index);
    }

    setText(wordData: WordData[]): void {
        this.communicationService.sendMessage('set-word-data', wordData);
    }

    setTitle(title: string): void {
        console.log(`set title: ${title}`)
        this.communicationService.sendMessage('set-title', title);
        this.title = title;
    }

    setWordCorrect(index: number): void {
        this.communicationService.sendMessage('set-word-correct', index);
    }

    setCurrentWordHighlightIndex(index: number): void {
        this.communicationService.sendMessage('set-current-word-highlight-index', index);
        this.index = index;
    }

    getCurrentWordIndex(): number {
        return this.index;
    }

    isRunning(): boolean {
        return this._isRunning;
    }

    setReadingTutorService(readingTutorService: IReadingTutorService): void {
        this.readingTutorService = readingTutorService;
    }

    getTitle(): string {
        return this.title;
    }
}
