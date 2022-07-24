const {SpeechClient} = require("@google-cloud/speech");

class SpeechRecognition {

    constructor() {
        this.sampleRateHertz = 16000;
        this.encoding = "LINEAR16";
        this.languageCode = "pl-PL";

        this.requestConfig = {
            config: {
                encoding: this.encoding,
                sampleRateHertz: this.sampleRateHertz,
                languageCode: this.languageCode,
            },
            interimResults: true,
        };
    }

    getRecognizeStream() {

        return new SpeechClient()
            .streamingRecognize(this.requestConfig)
            .on("error", console.error)
            .on("data", (data) => {
                    const text = JSON.stringify(data.results[0].alternatives[0].transcript, null, 2);
                    console.log(text);
                }
            );

    }
}

module.exports = {SpeechRecognition};