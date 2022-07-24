import {IHtmlElement} from "./IHtmlElement";

export class HtmlElement implements IHtmlElement {
    private element: HTMLElement;

    constructor(id: string) {
        this.element = document.getElementById(id) ?? document.createElement(id);
    }

    getHtmlContent(): string {
        return this.element.innerHTML;
    }

    setHtmlContent(htmlContent: string): void {
        this.element.innerHTML = htmlContent;
    }
}