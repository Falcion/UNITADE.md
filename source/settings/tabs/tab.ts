import UnitadePlugin from "../../main";

export interface IUnitadeTab {
    display(containerEl: HTMLElement, plugin: UnitadePlugin): void;
    addEventListener(containerEl: HTMLElement, type: keyof HTMLElementEventMap, listener: (this: HTMLElement, ev: Event) => any, options?: boolean | AddEventListenerOptions): void;
}
