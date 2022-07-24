import {IHtmlElement} from "../elements/IHtmlElement";
import {WordAnalyzer} from "../WordAnalyzer";
import {WordData} from "../WordData";

export class ViewClient {

    constructor(private textElement: IHtmlElement) {
    }

    setText(text: string): void {
        const wordsData: WordData[] = new WordAnalyzer().analyze(text);
        const words = wordsData.map(this.getHtmlText);
        this.textElement.setHtmlContent(words.join(''));
    }

    getHtmlText(wordData: WordData): string {
        const text = wordData.text;

        if (text === '\n') return '<br>';

        const index = wordData.index;
        if (index > -1) {
            return `<span class="word" id="word-${index}" word="${(wordData.word)}">${text} </span>`;
        } else {
            return `<span>${text}</span>`;
        }
    }


}