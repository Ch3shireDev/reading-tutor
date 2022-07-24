import {ICommunicationService} from "./ICommunicationService";
import {ipcMain} from "electron";

export class HostCommunicationService implements ICommunicationService {
    private webContents: Electron.WebContents;

    constructor(webContents: Electron.WebContents) {
        this.webContents = webContents;
    }

    receiveMessage(name: string, listener: (event: any) => void): void {
        ipcMain.on(name, listener);
    }

    sendMessage(name: string, data: any): void {
        this.webContents.send(name, data);
    }

}