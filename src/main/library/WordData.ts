export class WordData {
    constructor(public index: number, public text: string, public word: string="") {
        if(word === ""){
            this.word = text;
        }
    }
}