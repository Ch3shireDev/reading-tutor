export interface IViewService {

    setWordCorrect(index: number): void;

    setCurrentWordIndex(index: number): void;

    getCurrentWordIndex(): number;
}