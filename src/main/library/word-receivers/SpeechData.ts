import {SpeechResult} from "./SpeechResult";

export interface SpeechData {
    results: SpeechResult[];
    error?: any;
    speechEventType: string;
    totalBilledTime?: number;
}