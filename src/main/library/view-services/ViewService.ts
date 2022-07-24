
import {IViewService} from "./IViewService";
import {ICommunicationService} from "../communication-services/ICommunicationService";

export class ViewService implements IViewService {
    private communicationService: ICommunicationService;

    constructor(communicationService: ICommunicationService) {
        this.communicationService = communicationService;
    }

    setWordCorrect(index: number): void {
        //
    }

    setCurrentWordIndex(index: number): void {
        //
    }

    getCurrentWordIndex(): number {
        return 0;
    }

    setText(text: string): void {
        this.communicationService.sendMessage('set-text', text);
    }
}
