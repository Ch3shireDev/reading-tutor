const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const reload = require('electron-reload');
const { Readable, Writable,Transform } = require('stream');

reload(path.join(__dirname, '../..'), {
    electron: path.join(__dirname, '../..', 'node_modules', '.bin', 'electron')
});

let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('receive-click', () => {
    console.log("I was clicked")
    mainWindow.webContents.send('send-click', "I was clicked")
})

const {AudioCapture} = require("./library/audioCapture");
const {SpeechRecognition} = require("./library/speechRecognition");

new AudioCapture().capture().pipe(new SpeechRecognition().getRecognizeStream());

console.log('ok')