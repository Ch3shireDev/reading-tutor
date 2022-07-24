import {ITextService} from "../../main/library/ITextService"

export class MockTextService implements ITextService {

    words: string[];
    index: number;

    constructor(words: string[]) {
        this.words = words;
        this.index = 0;
    }

    getCurrentWord(): string {
        return this.words[this.index];
    }

    nextWord(): void {
        this.index++;
    }
}