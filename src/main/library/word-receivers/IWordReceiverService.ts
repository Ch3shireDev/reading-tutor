export interface IWordReceiverService {
    start(): void;

    end(): void;

    receiveWords(...words: string[]): void;

    setOnWordsReceive(eventFunc: (words: string[]) => void): void;

    isRunning(): boolean;
}
