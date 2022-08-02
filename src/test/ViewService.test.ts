import {ViewService} from "../main/library/view-services/ViewService";
import {MockCommunicationService} from "./mockups/MockCommunicationService";
import {ViewClient} from "../main/library/view-services/ViewClient";
import {MockElement} from "./mockups/MockElement";
import {WordData} from "../main/library/models/WordData";
import {MockHtmlManager} from "./mockups/MockHtmlManager";
import {ReadingTutorService} from "../main/library/ReadingTutorService";
import {MockWordReceiverService} from "./mockups/MockWordReceiverService";
import {TextService} from "../main/library/text-services/TextService";

let viewClient: ViewClient;
let viewService: ViewService;
let readingTutorService: ReadingTutorService;
let htmlManager: MockHtmlManager;

beforeEach(() => {
    htmlManager = new MockHtmlManager();
    const textElement = new MockElement();
    const communicationService = new MockCommunicationService();
    viewClient = new ViewClient(communicationService, textElement, htmlManager);
    viewService = new ViewService(communicationService);
    const textService: TextService = new TextService();
    const viewReceiver: MockWordReceiverService = new MockWordReceiverService();
    readingTutorService = new ReadingTutorService(textService, viewService, viewReceiver);
});

test('ViewService should start only after receiving start command from ViewClient.', () => {
    expect(viewService.isRunning()).toBe(false);
    viewClient.start();
    expect(viewService.isRunning()).toBe(true);
});

test('ViewService should be able to set word data in ViewClient.', () => {
    viewService.setText([new WordData(0, 'abc'), new WordData(1, 'def'), new WordData(2, 'ghi')]);
    expect(viewClient.getWordData()).toEqual([new WordData(0, 'abc'), new WordData(1, 'def'), new WordData(2, 'ghi')]);
});

test('ViewService should be able to set current word highlight index in ViewClient.', () => {
    viewService.setCurrentWordHighlightIndex(1);
    expect(viewClient.getCurrentWordHighlightIndex()).toBe(1);
});

test('ViewClient should initialize ViewService which initializes ReadingTutorService.', () => {
    expect(viewService.isRunning()).toBe(false);
    expect(readingTutorService.isRunning()).toBe(false);
    viewClient.start();
    expect(viewService.isRunning()).toBe(true);
    expect(readingTutorService.isRunning()).toBe(true);
});

test('After start, ViewClient should receive words from ReadingTutorService through ViewService.', () => {
    readingTutorService.setText("word1 word2 word3");
    expect(readingTutorService.getWordData().length).toBe(3);
    expect(viewClient.getWordData().length).toBe(0);
    viewClient.start();
    expect(viewClient.getWordData().length).toBe(3);
});

test("Sending correct words to ReadingTutorService should trigger update.", () => {
    readingTutorService.setText("Stoi na stacji lokomotywa");
    viewClient.start();
    expect(viewService.getCurrentWordIndex()).toBe(0);
    expect(viewClient.getCurrentWordHighlightIndex()).toBe(0);
    readingTutorService.receiveWords('stoi');
    expect(viewService.getCurrentWordIndex()).toBe(1);
    expect(viewClient.getCurrentWordHighlightIndex()).toBe(1);
});

test("ViewService and ViewClient should highlight correctly read words.", () => {
    readingTutorService.setText("Stoi na stacji lokomotywa");
    viewClient.start();
    expect(viewClient.getCurrentWordHighlightIndex()).toBe(0);
    readingTutorService.receiveWords('stoi');
    expect(viewClient.getCurrentWordHighlightIndex()).toBe(1);
    expect(htmlManager.getSet('word-0').has('correct')).toBeTruthy();
});

test("ViewService should set title of text properly.", () => {
    viewService.setTitle("Title");
    expect(viewClient.getTitle()).toBe("Title");
    expect(htmlManager.getContent('title')).toBe("Title");
});

test("ReadingTutorService should be able to set title of text properly.", () => {
    readingTutorService.setTitle("Title");
    viewClient.start();
    expect(viewClient.getTitle()).toBe("Title");
    expect(htmlManager.getContent('title')).toBe("Title");
});