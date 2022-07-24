import {IViewService} from "../../main/library/IViewService";

export class MockViewService implements IViewService {
    private wordData: null;
    private index: number;

    constructor() {
        this.wordData = null;
        this.index = 0;
    }


    setWordCorrect(index: number): void {
        //
    }

    setCurrentWordIndex(index: number): void {
        this.index = index;
    }

    getCurrentWordIndex(): number {
        return this.index;
    }
}

module.exports = {MockViewService};