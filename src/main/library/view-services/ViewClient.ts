import {IHtmlElement} from "./elements/IHtmlElement";
import {WordData} from "../models/WordData";
import {ICommunicationService} from "./communication-services/ICommunicationService";
import {IHtmlManager} from "./IHtmlManager";

export class ViewClient {
    private wordData: WordData[];
    private highlightIndex: number;

    constructor(private communicationService: ICommunicationService, private textElement: IHtmlElement, private htmlManager: IHtmlManager) {
        this.communicationService.receiveMessage('set-word-data', (event: any, wordData: WordData[]) => this.setWordData(wordData));
        this.communicationService.receiveMessage('set-word-correct', (event: any, index: number) => this.setWordCorrect(index));
        this.communicationService.receiveMessage('set-current-word-highlight-index', (event: any, index: number) => this.setCurrentWordHighlightIndex(index));
        this.wordData = [];
        this.highlightIndex = -1;
    }

    nextWord(): void {
        this.communicationService.sendMessage('next-word', '');
    }

    setWordCorrect(index: number): void {
        this.htmlManager.addClass('word-' + index, 'correct');
    }

    setCurrentWordHighlightIndex(index: number): void {
        if (this.highlightIndex > -1) this.htmlManager.removeClass('word-' + this.highlightIndex, 'highlight');
        this.highlightIndex = index;
        if (this.highlightIndex > -1) this.htmlManager.addClass('word-' + this.highlightIndex, 'highlight');
    }

    getCurrentWordHighlightIndex(): number {
        return this.highlightIndex;
    }

    setWordData(wordData: WordData[]): void {
        this.wordData = wordData;
        const words = wordData.map(this.getHtmlText);
        this.textElement.setHtmlContent(words.join(''));
    }

    getWordData(): WordData[] {
        return this.wordData;
    }

    getHtmlText(wordData: WordData): string {
        const text = wordData.text;

        if (text === '\n') return '<br>';

        const index = wordData.index;
        if (index > -1) {
            return `<span class="word" id="word-${index}">${text}</span>`;
        } else {
            return `<span>${text}</span>`;
        }
    }


    start(): void {
        this.communicationService.sendMessage('start', '');
    }
}