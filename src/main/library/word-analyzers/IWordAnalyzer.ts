import {WordData} from "../WordData";

export interface IWordAnalyzer {
    analyze(text: string): WordData[];

    clean(text: string): string;

    isWord(text: string): boolean;
}