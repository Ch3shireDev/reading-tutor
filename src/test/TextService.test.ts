import {TextService} from "../main/library/text-services/TextService";
import {ITextService} from "../main/library/text-services/ITextService";

let textService: ITextService;

beforeEach(() => {
    textService = new TextService();
    textService.setText('Stoi na stacji lokomotywa, Ciężka, ogromna i pot z niej spływa: Tłusta oliwa.');
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