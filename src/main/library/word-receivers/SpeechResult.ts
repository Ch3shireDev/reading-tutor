import {SpeechAlternative} from "./SpeechAlternative";
import {SpeechResultEndTime} from "./SpeechResultEndTime";

export interface SpeechResult {
    alternatives: SpeechAlternative[];
    isFinal: boolean;
    stability: number;
    resultEndTime: SpeechResultEndTime;
    channelTag: number;
    languageCode: string;
}