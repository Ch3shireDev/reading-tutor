export interface ICommunicationService {
    receiveMessage(name: string, listener: (event: any) => void): void;

    sendMessage(name: string, data: any): void;
}