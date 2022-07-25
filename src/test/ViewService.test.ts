import {ViewService} from "../main/library/view-services/ViewService";
import {MockCommunicationService} from "./mockups/MockCommunicationService";
import {ViewClient} from "../main/library/view-services/ViewClient";
import {MockElement} from "./mockups/MockElement";
import {WordAnalyzer} from "../main/library/word-analyzers/WordAnalyzer";
import {WordData} from "../main/library/WordData";
import {MockHtmlManager} from "./mockups/MockHtmlManager";

const textElement = new MockElement();
const wordAnalyzer = new WordAnalyzer();
const communicationService = new MockCommunicationService();
const viewClient = new ViewClient(communicationService, textElement, new MockHtmlManager());
const viewService: ViewService = new ViewService(communicationService, wordAnalyzer);

// test('Command setText should send event message to client with name send-text and value of sent text.', () => {
//     viewService.setText('abc');
//     expect(viewClient.getText()).toBe('abc');
// });

test('ViewService should start only after receiving start command from ViewClient.', () => {
    expect(viewService.isRunning()).toBe(false);
    viewClient.start();
    expect(viewService.isRunning()).toBe(true);
});

test('ViewService should be able to set word data in ViewClient.', () => {
    viewService.setWordData([new WordData(0, 'abc'), new WordData(1, 'def'), new WordData(2, 'ghi')]);
    expect(viewClient.getWordData()).toEqual([new WordData(0, 'abc'), new WordData(1, 'def'), new WordData(2, 'ghi')]);
});

test('ViewService should be able to set current word highlight index in ViewClient.', () => {
    viewService.setCurrentWordHighlightIndex(1);
    expect(viewClient.getCurrentWordHighlightIndex()).toBe(1);
});