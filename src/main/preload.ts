import {contextBridge, ipcRenderer} from 'electron'
import {ViewClient} from "./library/view-services/ViewClient";
import {HtmlElement} from "./library/elements/HtmlElement";
import {ClientCommunicationService} from "./library/communication-services/ClientCommunicationService";
import {HtmlManager} from "./library/view-services/HtmlManager";

window.addEventListener("DOMContentLoaded", () => {

    const communicationService = new ClientCommunicationService(ipcRenderer);
    const viewClient = new ViewClient(communicationService, new HtmlElement('text'), new HtmlManager(document));
    viewClient.start();
    const buttonElement = document.getElementById('button');
    if (buttonElement !== null) {
        buttonElement.addEventListener('click', () => {
            viewClient.nextWord();
        });
    }
});

contextBridge.exposeInMainWorld('electronAPI', {
    sendClick: (event: any) => ipcRenderer.send('send-click', event),
    setText: (callback: any) => ipcRenderer.on('set-text', callback),
    receiveClick: (callback: any) => ipcRenderer.on('receive-click', callback),
});

