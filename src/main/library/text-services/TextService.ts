import {ITextService} from "./ITextService"
import {WordData} from "../models/WordData";
import {IReadingTutorService} from "../IReadingTutorService";

export class TextService implements ITextService {
    private text: string;
    private words: string[];
    private index: number;
    private _isEnd: boolean;
    private wordData: WordData[] = [];
    private readingTutorService?: IReadingTutorService;
    private title = "";

    constructor() {
        this.text = "";
        this.words = [];
        this.index = 0;
        this._isEnd = false;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    getTitle(): string {
        return this.title;
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

    getNextWord(): string {
        if (this.index >= this.words.length - 1) return '';
        return this.words[this.index + 1];
    }

    setText(text: string): void {
        this.text = text;
        this.words = text.split(/[^a-ząężźćśół]+/i).filter((word) => this.isWord(word)).map((word) => this.clean(word));
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

    isCurrentWord(word: string): boolean {
        return this.isCorrect(word, this.getCurrentWord());
    }

    setReadingTutorService(readingTutorService: IReadingTutorService): void {
        this.readingTutorService = readingTutorService;
    }

    receiveWords(...words: string[]): void {
        words.forEach((word: string, index: number) => {
            if (this.isCurrentWord(word)) {
                this.acceptCurrentWord();
            } else if (this.isNextWordCorrect(words, index)) {
                this.acceptCurrentWord();
            } else if (this.isWordFragmented(words, index, this.clean(this.getCurrentWord()))) {
                this.acceptCurrentWord();
            } else if (this.isSkippingOneWord(word)) {
                this.acceptCurrentWord();
                this.acceptCurrentWord();
            }
        });
    }

    isSkippingOneWord(word: string): boolean {
        const nextWord = this.getNextWord();
        return this.isCorrect(word, nextWord);
    }

    isWordFragmented(words: string[], index: number, word: string): boolean {
        if (index >= words.length - 2) return false;
        let fragmentedWord = words[index++];
        while (fragmentedWord.length < word.length && index <= words.length - 1) {
            fragmentedWord += words[index];
            index++;
            if (this.isCorrect(fragmentedWord, word)) return true;
        }
        return false;
    }

    isNextWordCorrect(words: string[], index: number): boolean {
        if (index >= words.length - 1) return false;
        const nextWord = words[index + 1];
        return this.isWord(nextWord) && this.isCorrect(this.getNextWord(), nextWord);
    }


    isAlreadyRead(): boolean {
        return this.index === this.indexBuffer;
    }

    setAlreadyRead(): void {
        this.indexBuffer = this.index;
    }

    private indexBuffer = -1;

    acceptCurrentWord(): void {
        if (this.isAlreadyRead()) this.incrementIndex();
        else {
            this.setAlreadyRead();
            if (this.readingTutorService) this.readingTutorService.acceptCurrentWord();
            else this.acceptCurrentWord();
        }
    }

    incrementIndex(): void {
        if (this.index < this.words.length - 1) {
            this.index++;
        } else {
            this._isEnd = true;
        }
    }

    public isCorrect(testWord: string, correctWord: string): boolean {
        const cleanTest = this.clean(testWord);
        const cleanCorrect = this.clean(correctWord);
        if (cleanTest === cleanCorrect) return true;
        return cleanTest.length > 5 && cleanCorrect.startsWith(cleanTest.substring(0, cleanTest.length - 2));
    }
}
