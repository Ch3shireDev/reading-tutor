import {IViewService} from "../../main/library/view-services/IViewService";
import {WordData} from "../../main/library/WordData";
import {IReadingTutorService} from "../../main/library/IReadingTutorService";

export class MockViewService implements IViewService {
    private wordData: null;
    private index: number;
    private readingTutorService: IReadingTutorService | null = null;

    constructor() {
        this.wordData = null;
        this.index = 0;
    }

    setWordCorrect(index: number): void {
        this.index++;
    }

    setCurrentWordHighlightIndex(index: number): void {
        this.index = index;
    }

    getCurrentWordIndex(): number {
        return this.index;
    }

    setText(wordData: WordData[]): void {
        //
    }

    setReadingTutorService(readingTutorService: IReadingTutorService): void {
        this.readingTutorService = readingTutorService;
    }
}