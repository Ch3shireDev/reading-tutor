import {WordData} from "../models/WordData";
import {IReadingTutorService} from "../IReadingTutorService";

export interface ITextService {
    getCurrentWord(): string;

    acceptCurrentWord(): void;

    setText(text:string):void;

    getCurrentIndex(): number;

    getWordCount(): number;

    setIndex(index: number): void;

    isEnd(): boolean;

    getWordData(): WordData[];

    receiveWords(...strings: string[]): void;

    setReadingTutorService(readingTutorService: IReadingTutorService): void;
}

