import {WordData} from "../models/WordData";
import {IReadingTutorService} from "../IReadingTutorService";

export interface IViewService {

    setText(wordData: WordData[]): void;

    setWordCorrect(index: number): void;

    setCurrentWordHighlightIndex(index: number): void;

    getCurrentWordIndex(): number;

    setReadingTutorService(readingTutorService: IReadingTutorService): void;

    setTitle(title: string): void;

    getTitle(): string;

    setAuthor(author: string): void;

    getAuthor(): string;
}