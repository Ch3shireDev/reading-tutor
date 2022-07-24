
// let stream = new MediaStream();
// new MediaRecorder(stream).start();

window.document.getElementById('button').addEventListener('click', (event) => {
    console.log("I was clicked")
    window.electronAPI.sendClick(event);
});

window.electronAPI.receiveClick((event) => {alert(JSON.stringify(event))});

window.electronAPI.receiveAudioStream((event, stream) => {
    console.log('audio stream')
    console.log(stream)
    window.electronAPI.sendAudioStream(stream);
});