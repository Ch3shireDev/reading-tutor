export interface ICommunicationService {
    receiveMessage(name: string, listener: (event: any, ...data:any[]) => void): void;

    sendMessage(name: string, data: any): void;
}