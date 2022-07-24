class ReadingTutorService{

    _isRunning = false;
    _currentIndex = 0;

    constructor(textService, viewService) {
        this.textService = textService;
        this.viewService = viewService;
    }

    start() {
        this._isRunning = true;
    }

    end(){
        this._isRunning = false;
    }

    isRunning() {
        return this._isRunning;
    }

    acceptWord(){
        this.textService.nextWord();
        this.viewService.setWordCorrect(this._currentIndex);
        this._currentIndex++;
        this.viewService.setCurrentWordIndex(this._currentIndex);
    }
}

module.exports = {ReadingTutorService};