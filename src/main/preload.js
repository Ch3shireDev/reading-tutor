// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  sendClick: (event) => ipcRenderer.send('receive-click', event),
  receiveClick: (event) => ipcRenderer.on('send-click', event),
  receiveAudioStream: (event) => ipcRenderer.on('send-audio-stream', event),
  sendAudioStream: (callback) => ipcRenderer.send('receive-audio-stream', callback),
});

