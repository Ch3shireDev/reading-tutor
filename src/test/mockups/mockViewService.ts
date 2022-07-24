import {IViewService} from "../../main/library/IViewService";

export class MockViewService extends IViewService {
    private wordData: null;
    private index: number;

    constructor() {
        super();
        this.wordData = null;
        this.index = 0;
    }


    setWordCorrect(index: number): void {
//
    }

    setCurrentWordIndex(index: number) {
        this.index = index;
    }

    getCurrentWordIndex() {
        return this.index;
    }
}

module.exports = {MockViewService};