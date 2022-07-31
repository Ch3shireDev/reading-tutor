import {SpeechData} from "../models/SpeechData";

export interface IWordStreamingService {
    setCallback(callback: (stream: SpeechData) => void): void;
    start(): void;
    end(): void;
}