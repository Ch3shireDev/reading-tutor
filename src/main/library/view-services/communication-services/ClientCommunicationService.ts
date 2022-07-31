import {ICommunicationService} from "./ICommunicationService";
export class ClientCommunicationService implements ICommunicationService {

    constructor(private ipcRenderer:any) {
    }

    receiveMessage(name: string, listener: (event: any, ...data: any[]) => void): void {
        this.ipcRenderer.on(name, listener);
    }

    sendMessage(name: string, data: any): void {
        this.ipcRenderer.send(name, data);
    }
}