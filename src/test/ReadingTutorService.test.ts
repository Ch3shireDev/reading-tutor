import {ReadingTutorService} from '../main/library/ReadingTutorService';
import {MockViewService} from './mockups/MockViewService'
import {MockWordReceiverService} from "./mockups/MockWordReceiverService";
import {TextService} from "../main/library/text-services/TextService";

let readingTutorService: ReadingTutorService;
let textService: TextService;
let viewService: MockViewService;
let wordReceiverService: MockWordReceiverService;

beforeEach(() => {
    textService = new TextService();
    viewService = new MockViewService();
    wordReceiverService = new MockWordReceiverService();
    readingTutorService = new ReadingTutorService(textService, viewService, wordReceiverService);
    readingTutorService.setText("wordA wordB wordC")
    expect(readingTutorService.isRunning()).toBe(false);
    readingTutorService.start();
});

test('ReadingTutorService starts running', () => {
    expect(readingTutorService.isRunning()).toBe(true);
})

test('ReadingTutorService ends running', () => {
    expect(readingTutorService.isRunning()).toBe(true);
    readingTutorService.end();
    expect(readingTutorService.isRunning()).toBe(false);
})

test('ReadingTutorService gets message that word was read correctly', () => {
    expect(textService.getCurrentWord()).toBe('worda');
    readingTutorService.acceptCurrentWord();
    expect(textService.getCurrentWord()).toBe('wordb');
});

test('After accepting new word, ReadingTutorService sends notification to view about update', () => {
    expect(textService.getCurrentWord()).toBe('worda');
    expect(viewService.getCurrentWordIndex()).toBe(0);
    readingTutorService.acceptCurrentWord();
    expect(textService.getCurrentWord()).toBe('wordb');
    expect(viewService.getCurrentWordIndex()).toBe(1);
});

test('When WordReceiverService receives correct from stream, ReadingTutorService is notified and word is changed.', () => {
    expect(textService.getCurrentWord()).toBe('worda');
    wordReceiverService.receiveWords('worda');
    expect(textService.getCurrentWord()).toBe('wordb');
});

test('If WordReceiverService receives more than one correct word, ReadingTutorService is notified and word is changed accordingly.', () => {
    expect(textService.getCurrentWord()).toBe('worda');
    wordReceiverService.receiveWords('worda', 'wordb');
    expect(textService.getCurrentWord()).toBe('wordc');
});

test('WordReceiverService starts and ends together with ReadingTutorService', () => {
    expect(wordReceiverService.isRunning()).toBe(true);
    readingTutorService.end();
    expect(wordReceiverService.isRunning()).toBe(false);
});

test("Sending correct words to ReadingTutorService should trigger update.", () => {
    expect(textService.getCurrentWord()).toBe('worda');
    expect(viewService.getCurrentWordIndex()).toBe(0);
    wordReceiverService.receiveWords('worda');
    expect(textService.getCurrentWord()).toBe('wordb');
    expect(viewService.getCurrentWordIndex()).toBe(1);
});
