import {IViewService} from "../../main/library/IViewService";

class MockViewService extends IViewService {
    constructor() {
        super();
        this.wordData = null;
        this.index = 0;
    }


    setWordCorrect(index) {
    }

    setCurrentWordIndex(index) {
        this.index = index;
    }

    getCurrentWordIndex() {
        return this.index;
    }
}

module.exports = {MockViewService};