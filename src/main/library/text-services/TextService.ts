import {ITextService} from "./ITextService"
import {IWordAnalyzer} from "../word-analyzers/IWordAnalyzer";

export class TextService implements ITextService {
    private text: string;
    private words: string[];
    private index: number;
    private _isEnd: boolean;
    private wordAnalyzer: IWordAnalyzer;

    constructor(wordAnalyzer: IWordAnalyzer) {
        this.wordAnalyzer = wordAnalyzer;
        this.text = "";
        this.words = [];
        this.index = 0;
        this._isEnd = false;
    }

    isEnd(): boolean {
        return this._isEnd;
    }

    setIndex(index: number): void {
        this.index = index;
    }

    getCurrentWord(): string {
        return this.words[this.index];
    }

    acceptCurrentWord(): void {
        if (this.index < this.words.length - 1) {
            this.index++;
        } else {
            this._isEnd = true;
        }
    }

    setText(text: string): void {
        this.text = text;
        this.words = text.split(" ").filter((word) => this.isWord(word)).map((word) => this.stripWord(word));
        this.index = 0;
    }

    isWord(word: string): boolean {
        return this.wordAnalyzer.isWord(word);
    }

    stripWord(word: string): string {
        return this.wordAnalyzer.clean(word);
    }


    getCurrentIndex(): number {
        return 0;
    }

    getWordCount(): number {
        return this.words.length;
    }
}
