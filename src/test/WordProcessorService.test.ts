import {WordProcessorService} from "../main/library/word-receivers/word-processors/WordProcessorService";

test("Word receiver should remove words that were sent before", () => {
    const wordReceiverService = new WordProcessorService();
    expect(wordReceiverService.processWords(["Ciężka", "ogromna"])).toStrictEqual(["Ciężka", "ogromna"]);
    expect(wordReceiverService.processWords(["Ciężka", "ogromna", "i"])).toStrictEqual(["i"]);
    expect(wordReceiverService.processWords(["Ciężka", "ogromna", "i", "pot"])).toStrictEqual(["pot"]);
    expect(wordReceiverService.processWords(["Ciężka", "ogromna", "i", "pot", "z", "niej", "spływa"])).toStrictEqual(["z", "niej", "spływa"]);
});