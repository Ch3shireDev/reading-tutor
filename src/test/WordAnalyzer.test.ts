import {WordAnalyzer} from "../main/library/word-analyzers/WordAnalyzer";

const wordAnalyzer = new WordAnalyzer();

const text = "Stoi na stacji lokomotywa,\n" +
    "Ciężka, ogromna i pot z niej spływa:\n" +
    "Tłusta oliwa.\n" +
    "\n" +
    "Stoi i sapie, dyszy i dmucha,\n" +
    "Żar z rozgrzanego jej brzucha bucha:\n" +
    "Uch - jak gorąco!\n" +
    "Puff - jak gorąco!\n" +
    "Uff - jak gorąco!"

test('Word analyzer should return array of words from text.', () => {
    const words = wordAnalyzer.analyze(text);
    expect(words.length).toBe(46);
    expect(words.filter(word => word.index > -1).length).toBe(34);
});
