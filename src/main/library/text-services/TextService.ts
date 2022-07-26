import {ITextService} from "./ITextService"
import {WordData} from "../WordData";
import {IReadingTutorService} from "../IReadingTutorService";

export class TextService implements ITextService {
    private text: string;
    private words: string[];
    private index: number;
    private _isEnd: boolean;
    private wordData: WordData[] = [];
    private readingTutorService?: IReadingTutorService;

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
        } else {
            this._isEnd = true;
        }
    }

    setText(text: string): void {
        this.text = text;
        this.words = text.split(" ").filter((word) => this.isWord(word)).map((word) => this.clean(word));
        this.index = 0;
        this.wordData = this.analyze(text);
    }

    getWordData(): WordData[] {
        return this.wordData;
    }

    analyze(text: string): WordData[] {

        const result: WordData[] = [];
        let index = 0;

        text = text.replace(/\n/g, ' \n ');

        text.split(' ').forEach((word) => {
            if (this.isWord(word)) {
                result.push(new WordData(index, word, this.clean(word)));
                index++;
            } else {
                result.push(new WordData(-1, word, ''));
            }
        });

        return result;

    }

    clean(word: string): string {
        return word.toLowerCase().replace(/[^a-ząęłżźćśó]/g, '');
    }

    isWord(word: string): boolean {
        return word.toLowerCase().replace(/[^a-ząęłżźćśó]/g, '').length > 0;
    }

    getCurrentIndex(): number {
        return this.index;
    }

    getWordCount(): number {
        return this.words.length;
    }

    receiveWords(...words: string[]): void {
        console.log(`received words: ${words}`);
        words.forEach((word: string) => {
            if (this.isCurrentWord(word)) {
                this.acceptCurrentWord();
            }
        });
    }

    isCurrentWord(word: string): boolean {
        return this.clean(word) === this.clean(this.getCurrentWord());
    }

    setReadingTutorService(readingTutorService: IReadingTutorService): void {
        this.readingTutorService = readingTutorService;
    }
}
