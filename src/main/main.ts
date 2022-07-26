import {app, BrowserWindow, ipcMain} from "electron";
import * as path from "path";
import {ViewService} from "./library/view-services/ViewService";
import {HostCommunicationService} from "./library/communication-services/HostCommunicationService";
import {ReadingTutorService} from "./library/ReadingTutorService";
import {TextService} from "./library/text-services/TextService";
import {WordReceiverService} from "./library/word-receivers/WordReceiverService";
import {AudioCapture} from "./library/audio-capturers/AudioCapture";
import {SpeechRecognition} from "./library/speech-recognizers/SpeechRecognition";

let mainWindow: BrowserWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true
        },
        width: 800,
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "../../index.html"));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    const eventCommunicationService = new HostCommunicationService(mainWindow.webContents);
    const viewService = new ViewService(eventCommunicationService);
    const textService = new TextService();
    const audioCapture = new AudioCapture();
    const speechRecognition = new SpeechRecognition();
    const wordReceiverService = new WordReceiverService(audioCapture, speechRecognition);
    const readingTutorService = new ReadingTutorService(textService, viewService, wordReceiverService);
    readingTutorService.setText("Stoi na stacji lokomotywa,\n" + "Ciężka, ogromna i pot z niej spływa:\n" + "Tłusta oliwa.");
}

app.on("ready", () => {
    createWindow();

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.on('send-click', (event) => {
    mainWindow.webContents.send('receive-click', "I was clicked")
});

