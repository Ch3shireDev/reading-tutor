import {ReadingTutorService} from '../main/library/ReadingTutorService';
import {MockTextService} from './mockups/mockTextService'
import {MockViewService} from './mockups/mockViewService'

let readingTutorService;
let textService;
let viewService;

beforeEach(() => {
    textService = new MockTextService('word1', 'word2', 'word3');
    viewService = new MockViewService();
    readingTutorService = new ReadingTutorService(textService, viewService);
});

test('ReadingTutorService starts running', () => {
    expect(readingTutorService.isRunning()).toBe(false);
    readingTutorService.start();
    expect(readingTutorService.isRunning()).toBe(true);
})

test('ReadingTutorService ends running', () => {
    readingTutorService.start();
    expect(readingTutorService.isRunning()).toBe(true);
    readingTutorService.end();
    expect(readingTutorService.isRunning()).toBe(false);
})

test('ReadingTutorService gets message that word was read correctly', () => {
    readingTutorService.start();
    expect(textService.getCurrentWord()).toBe('word1');
    readingTutorService.acceptWord();
    expect(textService.getCurrentWord()).toBe('word2');
});

test('After accepting new word, ReadingTutorService sends notification to view about update', ()=>{
    readingTutorService.start();
    expect(textService.getCurrentWord()).toBe('word1');
    expect(viewService.getCurrentWordIndex()).toBe(0);
    readingTutorService.acceptWord();
    expect(textService.getCurrentWord()).toBe('word2');
    expect(viewService.getCurrentWordIndex()).toBe(1);
});