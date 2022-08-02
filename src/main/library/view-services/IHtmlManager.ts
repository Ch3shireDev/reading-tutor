export interface IHtmlManager {
    setContent(id:string, content: string): void;

    addClass(id: string, _class: string): void;

    removeClass(id: string, _class: string): void;
}