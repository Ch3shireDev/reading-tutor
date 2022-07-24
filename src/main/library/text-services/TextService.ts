import {ITextService} from "./ITextService"
import {WordAnalyzer} from "../WordAnalyzer";

export class TextService implements ITextService {
    private text: string;
    private words: string[];
    private index: number;
    private _isEnd: boolean;

    constructor() {
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
        }
        else{
            this._isEnd = true;
        }
    }

    setText(text: string): void {
        this.text = text;
        this.words = text.split(" ").filter(this.isWord).map(this.stripWord);
        this.index = 0;
    }

    isWord(word: string): boolean {
        return new WordAnalyzer().isWord(word);
    }

    stripWord(word: string): string {
        return new WordAnalyzer().clean(word);
    }



    getCurrentIndex(): number {
        return 0;
    }

    getWordCount(): number {
        return this.words.length;
    }
}
