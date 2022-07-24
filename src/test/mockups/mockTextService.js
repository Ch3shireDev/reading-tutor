import {ITextService} from '../../main/library/ITextService.js'

class MockTextService extends ITextService{

    constructor(...words) {
        super();
        this.words = words;
        this.index = 0;
    }

    getCurrentWord(){
        return this.words[this.index];
    }

    nextWord(){
        this.index++;
    }
}


module.exports = {MockTextService};