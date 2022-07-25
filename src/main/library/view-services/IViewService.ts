import {WordData} from "../WordData";
import {IReadingTutorService} from "../IReadingTutorService";

export interface IViewService {

    setText(wordData: WordData[]): void;

    setWordCorrect(index: number): void;

    setCurrentWordHighlightIndex(index: number): void;

    getCurrentWordIndex(): number;

    setReadingTutorService(readingTutorService: IReadingTutorService): void;
}