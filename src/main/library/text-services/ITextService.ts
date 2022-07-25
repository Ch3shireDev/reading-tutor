import {WordData} from "../WordData";

export interface ITextService {
    getCurrentWord(): string;

    acceptCurrentWord(): void;

    setText(text:string):void;

    getCurrentIndex(): number;

    getWordCount(): number;

    setIndex(index: number): void;

    isEnd(): boolean;

    getText(): WordData[];
}

