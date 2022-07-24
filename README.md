# reading-tutor

Założenie jest następujące: mamy wybrany tekst do przeczytania. Bieżące słowo do przeczytania jest podświetlone, w przypadku poprawnej odpowiedzi przechodzimy do następnego słowa. Ponieważ niektóre słowa mogą być trudne do wymówienia, lub rozpoznawanie mowy może uporczywie stwierdzać że to inne słowo niż założone, należy przygotować się na korektę błędów.

Use cases:

- uczeń czyta tekst na głos aby wykonać zadanie


Mikro przypadek:

- uczeń otrzymuje tekst z systemu i czyta kolejne słowa, otrzymując weryfikację zwrotną.



```plantuml

class ReadingTutorService{
    Główny serwis zarządzający cyklem nauki.

    +start()
    +end()
    +acceptWord()

}

interface IViewService{
    Serwis udzielający informacji na temat 
    widoku.

    +setWordCorrect(index)
    +setCurrentWordIndex(index)
    +getCurrentWordIndex()
}

interface ITextService{
    Serwis udzielający informacji na temat 
    tekstu do przeczytania i postępów w czytaniu.

    +getCurrentWord()
    +nextWord()
}

class WordReceiverService{
    +start()
    +end()
    +onWordReceive: event
}

interface IWordReceiverService{
    +start()
    +end()
}

ReadingTutorService --> IViewService
ReadingTutorService --> ITextService
ReadingTutorService --> IWordReceiverService

IWordReceiverService <|-- WordReceiverService

interface IWordRecognitionService
interface IAudioRecorderService

IWordRecognitionService <|-- WordRecognitionService
IAudioRecorderService <|-- AudioRecorderService

WordReceiverService --> IWordRecognitionService
WordReceiverService --> IAudioRecorderService

```

Speech recognition działa i dostaje nową informację o dźwięku. Pobiera z TextService informację o bieżącym słowie i weryfikuje, czy zostało wypowiedziane bieżące słowo. Wysyła dalej informację do ReadingTutorService.

RecordingService dostaje nowy dźwięk. Wysyła go dalej do SpeechRecognitionService.

