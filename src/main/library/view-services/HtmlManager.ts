import {IHtmlManager} from "./IHtmlManager";

export class HtmlManager implements IHtmlManager {
    constructor(private document: Document) {
    }

    removeClass(id: string, _class: string): void {
        const element = document.getElementById(id);
        if (element === null) return;
        element.classList.remove(_class)
    }

    addClass(id: string, _class: string): void {
        const element = document.getElementById(id);
        if (element === null) return;
        element.classList.add(_class);
    }

    setContent(id: string, content: string): void {
        const element = document.getElementById(id);
        if (element === null) return;
        element.innerHTML = content;
    }
}