import {IWordProcessorService} from "./IWordProcessorService";

export class WordProcessorService implements IWordProcessorService {

    private lastWords: string[] = [];

    public removeRepeatingWords(words: string[], lastWords: string[]): string[] {
        if (words.length < lastWords.length) return words;
        if (lastWords.every((word, index) => word === words[index])) {
            return words.slice(lastWords.length);
        }
        return words;
    }

    public processWords(words: string[]): string[] {
        const newWords = this.removeRepeatingWords(words, this.lastWords);
        this.lastWords = words;
        return newWords;
    }

}