import {TextService} from "../main/library/text-services/TextService";

let textService: TextService;

const text = "Stoi na stacji lokomotywa,\n" +
    "Ciężka, ogromna i pot z niej spływa:\n" +
    "Tłusta oliwa.\n" +
    "\n" +
    "Stoi i sapie, dyszy i dmucha,\n" +
    "Żar z rozgrzanego jej brzucha bucha:\n" +
    "Uch - jak gorąco!\n" +
    "Puff - jak gorąco!\n" +
    "Uff - jak gorąco!"

beforeEach(() => {
    textService = new TextService();
    textService.setText('Stoi na stacji lokomotywa, Ciężka, ogromna i pot z niej spływa: Tłusta oliwa.');
});

test('Word analyzer should return array of words from text.', () => {
    const words = textService.analyze(text);
    expect(words.length).toBe(46);
    expect(words.filter(word => word.index > -1).length).toBe(34);
});

test('Text service starts with first word. Words should be put in lowercase, without additional non-letter characters.', () => {
    expect(textService.getCurrentWord()).toBe('stoi');
    expect(textService.getCurrentIndex()).toBe(0);
});

test('Text service should go to the next word when acceptCurrentWord() is called.', () => {
    expect(textService.getCurrentWord()).toBe('stoi');
    textService.acceptCurrentWord();
    expect(textService.getCurrentWord()).toBe('na');
});

test('Text service should not go to the next word when acceptCurrentWord() is called when there is no next word.', () => {
    const wordCount = textService.getWordCount();
    textService.setIndex(wordCount - 2);
    expect(textService.getCurrentWord()).toBe('tłusta');
    textService.acceptCurrentWord();
    expect(textService.isEnd()).toBe(false);
    expect(textService.getCurrentWord()).toBe('oliwa');
    expect(textService.isEnd()).toBe(false);
    textService.acceptCurrentWord();
    expect(textService.getCurrentWord()).toBe('oliwa')
    expect(textService.isEnd()).toBe(true);
});

test("Receiving correct words should trigger accepting current words.", ()=>{
   textService.receiveWords("stoi", "na", "stacji");
   expect(textService.getCurrentWord()).toBe("lokomotywa");
   textService.receiveWords("lokomotywa");
   expect(textService.getCurrentWord()).toBe("ciężka");
   textService.receiveWords("cienszka");
    expect(textService.getCurrentWord()).toBe("ciężka");
});