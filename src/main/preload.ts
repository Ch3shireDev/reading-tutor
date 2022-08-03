import {ipcRenderer} from 'electron'
import {ViewClient} from "./library/view-services/ViewClient";
import {ClientCommunicationService} from "./library/view-services/communication-services/ClientCommunicationService";
import {HtmlManager} from "./library/view-services/HtmlManager";

window.addEventListener("DOMContentLoaded", () => {

    const communicationService = new ClientCommunicationService(ipcRenderer);
    const viewClient = new ViewClient(communicationService, new HtmlManager(document));
    viewClient.start();
    const buttonElement = document.getElementById('button');
    if (buttonElement !== null) {
        buttonElement.addEventListener('click', () => {
            viewClient.nextWord();
        });
    }

    const closeElement = document.getElementById('close-button');
    if (closeElement !== null) {
        closeElement.addEventListener('click', () => {
                viewClient.close();
            }
        );
    }
});
