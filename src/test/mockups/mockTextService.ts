import {ITextService} from "../../main/library/ITextService"

export class MockTextService extends ITextService{

    words:string[];
    index:number;

    constructor(words:string[]) {
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