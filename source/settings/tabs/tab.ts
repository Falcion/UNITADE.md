import UnitadePlugin from "@main";
import { IUnitadeTabBuilder } from "@settings/tabs/factory/builder";
import { NestedSetting } from "@settings/utils/types/nested_setting";

export interface IUnitadeTab {
    display(containerEl: HTMLElement, plugin: UnitadePlugin): void;
    addEventListener(containerEl: HTMLElement, type: keyof HTMLElementEventMap, listener: (this: HTMLElement, ev: Event) => any, options?: boolean | AddEventListenerOptions): void;
}
