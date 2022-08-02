import {IHtmlManager} from "../../main/library/view-services/IHtmlManager";

export class MockHtmlManager implements IHtmlManager {
    removeClass(id: string, _class: string): void {
        this.getSet(id).delete(_class);
    }

    addClass(id: string, _class: string): void {
        this.getSet(id).add(_class);
    }

    setContent(id: string, content: string): void {
        this.content[id] = content;
    }

    getSet(id: string): Set<string> {
        if (Object.prototype.hasOwnProperty.call(this.classes, id)) {
            return this.classes[id];
        }
        this.classes[id] = new Set<string>();
        return this.classes[id];
    }

    public classes: { [id: string]: Set<string> } = {};
    public content: { [id: string]: string } = {};

    getContent(id: string):string {
        return this.content[id];
    }
}