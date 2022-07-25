export interface IReadingTutorService {
    start(): void;

    acceptCurrentWord(): void;

    getCurrentWordIndex(): number;
}