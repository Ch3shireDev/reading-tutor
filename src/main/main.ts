import {app, BrowserWindow, ipcMain} from "electron";
import * as path from "path";
import {ViewService} from "./library/view-services/ViewService";
import {HostCommunicationService} from "./library/communication-services/HostCommunicationService";

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
    console.log('click');
    mainWindow.webContents.send('receive-click', "I was clicked")
});

ipcMain.on('start', (event) => {
    const eventCommunicationService = new HostCommunicationService(mainWindow.webContents);
    new ViewService(eventCommunicationService).setText("Stoi na stacji lokomotywa,\n" + "Ciężka, ogromna i pot z niej spływa:\n" + "Tłusta oliwa.")
});