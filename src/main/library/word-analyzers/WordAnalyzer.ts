import {WordData} from "../WordData";
import {IWordAnalyzer} from "./IWordAnalyzer";

export class WordAnalyzer implements IWordAnalyzer {

    analyze(text: string): WordData[] {

        const result: WordData[] = [];
        let index = 0;

        text = text.replace(/\n/g, ' \n ');

        text.split(' ').forEach((word) => {
            if (this.isWord(word)) {
                result.push(new WordData(index, word, this.clean(word)));
                index++;
            } else {
                result.push(new WordData(-1, word, ''));
            }
        });

        return result;

    }

    clean(word: string): string {
        return word.toLowerCase().replace(/[^a-ząęłżźćśó]/g, '');
    }

    isWord(word: string): boolean {
        return word.toLowerCase().replace(/[^a-ząęłżźćśó]/g, '').length > 0;
    }

}