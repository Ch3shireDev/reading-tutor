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

test("Receiving correct words should trigger accepting current words.", () => {
    textService.receiveWords("stoi", "na", "stacji");
    expect(textService.getCurrentWord()).toBe("lokomotywa");
    textService.receiveWords("lokomotywa");
    expect(textService.getCurrentWord()).toBe("ciężka");
    textService.receiveWords("cienszka");
    expect(textService.getCurrentWord()).toBe("ciężka");
});

test("Adding line break and comma should not be a problem.", () => {
    textService.setText("lokomotywa,\nCiężka, ogromna");
    expect(textService.getCurrentWord()).toBe("lokomotywa");
    textService.receiveWords("lokomotywa");
    expect(textService.getCurrentWord()).toBe("ciężka");
    textService.receiveWords("ciężka");
    expect(textService.getCurrentWord()).toBe("ogromna");
});

test("Polish words should not be a problem", () => {
    textService.setText("Stoi na stacji lokomotywa,\n" + "Ciężka, ogromna i pot z niej spływa:\n" + "Tłusta oliwa.");
    const words = textService.getWordData().filter(w => w.index !== -1).map(word => word.word);
    expect(words).toEqual(["stoi", "na", "stacji", "lokomotywa", "ciężka", "ogromna", "i", "pot", "z", "niej", "spływa", "tłusta", "oliwa"]);
});

test("If one word is read wrong, but another are correct, it should go to the next word.", () => {
    textService.setText("Uch - jak gorąco!\nPuff - jak gorąco!\nUff - jak gorąco!");
    textService.receiveWords("uch", "jak", "gorąco", "uff", "jak", "gorąco");
    expect(textService.getCurrentWord()).toBe("uff");
});

test("TextService should be prepared for receiving fragmented words.", () => {
    textService.setText("podoczepiali");
    textService.receiveWords("po", "do", "czepiali");
    expect(textService.isEnd()).toBe(true);
});

test("TextService should be prepared for receiving fragmented words inside longer sentences.", () => {
    textService.setText("Wagony do niej podoczepiali\nWielkie i ciężkie, z żelaza, stali,");
    textService.receiveWords("Wagony", "do", "niej", "po", "do", "czepiali");
    expect(textService.getCurrentWord()).toBe("wielkie");
});

test("TextService should allow errors in word recognition.", () => {
    textService.setText("Żar z rozgrzanego jej brzucha bucha");
    textService.receiveWords("żar", "rozgrzany");
    expect(textService.getCurrentWord()).toBe("jej");
});

test("Function isCorrect should allow mistakes", () => {
    expect(textService.isCorrect("rozgrzany", "rozgrzanego")).toBeTruthy();
});

