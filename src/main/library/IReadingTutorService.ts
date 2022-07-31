export interface IReadingTutorService {
    start(): void;

    acceptCurrentWord(): void;

    getCurrentWordIndex(): number;

    receiveWords(...strings: string[]): void;

    getPhrases(): string[];
}