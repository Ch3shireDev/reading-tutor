class ReadingTutorService {

    _isRunning = false;
    _currentIndex = 0;

    constructor(textService, viewService, wordReceiverService) {
        this.textService = textService;
        this.viewService = viewService;
        this.wordReceiverService = wordReceiverService;
    }

    start() {
        this._isRunning = true;
        let self = this;
        this.wordReceiverService.setOnWordsReceive((words) => {
            self.onWordsReceived(words)
        });
        this.wordReceiverService.start();
    }

    onWordsReceived(words) {
        words.forEach(word => {
            if (word === this.textService.getCurrentWord()) {
                this.acceptWord();
            }
        });
    }

    end() {
        this._isRunning = false;
        this.wordReceiverService.end();
    }

    isRunning() {
        return this._isRunning;
    }

    acceptWord() {
        this.textService.nextWord();
        this.viewService.setWordCorrect(this._currentIndex);
        this._currentIndex++;
        this.viewService.setCurrentWordIndex(this._currentIndex);
    }
}

module.exports = {ReadingTutorService};