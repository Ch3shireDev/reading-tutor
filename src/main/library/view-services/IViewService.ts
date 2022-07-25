export interface IViewService {

    setText(text: string): void;

    setWordCorrect(index: number): void;

    setCurrentWordHighlightIndex(index: number): void;

    getCurrentWordIndex(): number;
}