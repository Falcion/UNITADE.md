import { NestedSetting } from "@settings/utils/types/nested_setting";
import { IUnitadeTabBuilder } from "./factory/builder";
import { IUnitadeTab } from "./tab";
import UnitadePlugin from "@main";

export default abstract class UnitadeUnifiedTab implements IUnitadeTab {
    tabContainer!: HTMLElement
    abstract tabBuilder: IUnitadeTabBuilder;
    tabSettings!: NestedSetting[];

    constructor(containerEl: HTMLElement) {
        this.tabContainer = containerEl.createEl('div', {
            cls: 'unitade-settings-tab-container'
        });
    }

    abstract display(plugin: UnitadePlugin): void;

    addEventListener(type: keyof HTMLElementEventMap, listener: (this: HTMLElement, ev: Event) => any, options?: boolean | AddEventListenerOptions): void {
        this.tabContainer.addEventListener(type, listener, options);
    }
}
