import {IHtmlElement} from "../../main/library/view-services/elements/IHtmlElement";

export class MockElement implements IHtmlElement {
    private htmlContent = "";

    getHtmlContent(): string {
        return this.htmlContent;
    }

    setHtmlContent(htmlContent: string): void {
        this.htmlContent = htmlContent;
    }

}