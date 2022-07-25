import {ICommunicationService} from "../../main/library/communication-services/ICommunicationService";
import {EventEmitter} from "node:events";

export class MockCommunicationService implements ICommunicationService {
    private eventEmitter: EventEmitter;

    constructor() {
        this.eventEmitter = new EventEmitter();
    }

    receiveMessage(name: string, listener: (event: any, ...data: any[]) => void): void {
        this.eventEmitter.on(name, listener);
    }

    sendMessage(name: string, ...data: any[]): void {
        this.eventEmitter.emit(name, undefined, ...data);
    }

}

