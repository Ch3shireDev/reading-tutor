export interface IViewService {

    setText(text: string): void;

    setWordCorrect(index: number): void;

    setCurrentWordIndex(index: number): void;

    getCurrentWordIndex(): number;
}