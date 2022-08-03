import {app, BrowserWindow, ipcMain} from "electron";
import * as path from "path";
import {ViewService} from "./library/view-services/ViewService";
import {HostCommunicationService} from "./library/view-services/communication-services/HostCommunicationService";
import {ReadingTutorService} from "./library/ReadingTutorService";
import {TextService} from "./library/text-services/TextService";
import {WordReceiverService} from "./library/word-receivers/WordReceiverService";
import {WordProcessorService} from "./library/word-receivers/word-processors/WordProcessorService";
import {WordStreamingService} from "./library/word-receivers/word-streamers/WordStreamingService";
import * as fs from "fs";

let mainWindow: BrowserWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true
        },
        autoHideMenuBar: true,
        title: "Nauka czytania",
        frame: false,
        titleBarStyle: 'hiddenInset',
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be'
        }
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "../../index.html"));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    
    const eventCommunicationService = new HostCommunicationService(mainWindow.webContents);
    const viewService = new ViewService(eventCommunicationService);
    const textService = new TextService();
    const streamingService = new WordStreamingService();
    const wordProcessor = new WordProcessorService();
    const wordReceiverService = new WordReceiverService(wordProcessor, streamingService);
    const readingTutorService = new ReadingTutorService(textService, viewService, wordReceiverService);
    readingTutorService.setTitle("Lokomotywa");
    readingTutorService.setAuthor("Julian Tuwim");
    readingTutorService.setText(fs.readFileSync(path.join(__dirname, "../../lokomotywa.txt"), "utf8"));
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

ipcMain.on("close", (event, arg) => {
    app.quit()
});