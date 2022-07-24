import {ICommunicationService} from "../../main/library/communication-services/ICommunicationService";

export class MockCommunicationService implements ICommunicationService{
    sentMessages: any[];
    private receivedMessages: any[];

    constructor() {
        this.sentMessages = [];
        this.receivedMessages = []
    }

    receiveMessage(name: string, listener: (event: any) => void): void {
        this.receivedMessages.push({name: name, listener: listener});
    }

    sendMessage(name: string, data: any): void {
        this.sentMessages.push({name: name, data: data});
    }

}