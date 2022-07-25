import {ITextService} from "../../main/library/text-services/ITextService"
import {WordData} from "../../main/library/WordData";

export class MockTextService implements ITextService {

    private readonly words: string[];
    private index: number;
    private text: string;
    private _isEnd: boolean;

    constructor(...words: string[]) {
        this.words = words;
        this.index = 0;
        this.text = "";
        this._isEnd = false;
    }

    isEnd(): boolean {
        return this._isEnd;
    }

    getCurrentWord(): string {
        return this.words[this.index];
    }

    acceptCurrentWord(): void {
        this.index++;
    }

    getCurrentIndex(): number {
        return 0;
    }

    setText(text: string): void {
        this.text = text;
    }

    getWordCount(): number {
        return this.words.length;
    }

    setIndex(index: number): void {
        this.index = index;
    }

    getText(): WordData[] {
        return [];
    }
}