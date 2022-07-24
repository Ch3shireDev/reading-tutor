import {WordData} from "./WordData";

export class WordAnalyzer {

    analyze(text: string): WordData[] {

        const result: WordData[] = [];
        let index = 0;

        text = text.replace(/\n/g, ' \n ');

        text.split(' ').forEach((word) => {
            if (this.isWord(word)) {
                result.push(new WordData(word, this.clean(word), index));
                index++;
            } else {
                result.push(new WordData(word, '', -1));
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