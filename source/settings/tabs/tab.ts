import UnitadePlugin from "@main";
import { IUnitadeTabBuilder } from "@settings/tabs/factory/builder";
import { NestedSetting } from "@settings/utils/types/nested_setting";

export interface IUnitadeTab {
    tabBuilder: IUnitadeTabBuilder;
    tabContainer: HTMLElement;
    tabSettings: NestedSetting[];
    display(plugin: UnitadePlugin): void;
    addEventListener(type: keyof HTMLElementEventMap, listener: (this: HTMLElement, ev: Event) => any, options?: boolean | AddEventListenerOptions): void;
}
