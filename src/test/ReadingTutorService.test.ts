import {ReadingTutorService} from '../main/library/ReadingTutorService';
import {MockTextService} from './mockups/MockTextService'
import {MockViewService} from './mockups/MockViewService'
import {MockWordReceiverService} from "./mockups/MockWordReceiverService";

let readingTutorService: ReadingTutorService;
let textService: MockTextService;
let viewService: MockViewService;
let wordReceiverService: MockWordReceiverService;

beforeEach(() => {
    textService = new MockTextService('word1', 'word2', 'word3');
    viewService = new MockViewService();
    wordReceiverService = new MockWordReceiverService();
    readingTutorService = new ReadingTutorService(textService, viewService, wordReceiverService);
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
    expect(textService.getCurrentWord()).toBe('word1');
    readingTutorService.acceptWord();
    expect(textService.getCurrentWord()).toBe('word2');
});

test('After accepting new word, ReadingTutorService sends notification to view about update', () => {
    expect(textService.getCurrentWord()).toBe('word1');
    expect(viewService.getCurrentWordIndex()).toBe(0);
    readingTutorService.acceptWord();
    expect(textService.getCurrentWord()).toBe('word2');
    expect(viewService.getCurrentWordIndex()).toBe(1);
});

test('When WordReceiverService receives correct from stream, ReadingTutorService is notified and word is changed.', () => {
    expect(textService.getCurrentWord()).toBe('word1');
    wordReceiverService.receiveWords('word1');
    expect(textService.getCurrentWord()).toBe('word2');
});

test('If WordReceiverService receives more than one correct word, ReadingTutorService is notified and word is changed accordingly.', () => {
    expect(textService.getCurrentWord()).toBe('word1');
    wordReceiverService.receiveWords('word1', 'word2');
    expect(textService.getCurrentWord()).toBe('word3');
});

test('WordReceiverService starts and ends together with ReadingTutorService', () => {
    expect(wordReceiverService.isRunning()).toBe(true);
    readingTutorService.end();
    expect(wordReceiverService.isRunning()).toBe(false);
});