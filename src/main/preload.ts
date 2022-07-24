import {contextBridge, ipcRenderer} from 'electron'

window.addEventListener("DOMContentLoaded", () => {
    const replaceText = (selector: string, text: string) => {
        const element = document.getElementById(selector);
        if (element) {
            element.innerText = text;
        }
    };

    for (const type of ["chrome", "node", "electron"]) {
        const text: string = process.versions[type as keyof NodeJS.ProcessVersions] ?? "";
        replaceText(`${type}-version`, text);
    }
});

import {ViewClient} from "./library/view-services/ViewClient";
import {HtmlElement} from "./library/elements/HtmlElement";

function init(window:any){

    window.electronAPI.setText((event: any, text: string) => {
        const viewClient = new ViewClient(new HtmlElement('text'));
        viewClient.setText(text);
    });

    window.electronAPI.start();

}

contextBridge.exposeInMainWorld('electronAPI', {
    start: (event: any) => ipcRenderer.send('start', event),
    sendClick: (event: any) => ipcRenderer.send('send-click', event),
    setText: (callback: any) => ipcRenderer.on('set-text', callback),
    receiveClick: (callback: any) => ipcRenderer.on('receive-click', callback),
    init: (window:any) => init(window)
});

