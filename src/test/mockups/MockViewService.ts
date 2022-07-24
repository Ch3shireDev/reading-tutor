import {IViewService} from "../../main/library/view-services/IViewService";

export class MockViewService implements IViewService {
    private wordData: null;
    private index: number;

    constructor() {
        this.wordData = null;
        this.index = 0;
    }

    setWordCorrect(index: number): void {
        this.index++;
    }

    setCurrentWordIndex(index: number): void {
        this.index = index;
    }

    getCurrentWordIndex(): number {
        return this.index;
    }

    setText(text: string): void {
        //
    }
}