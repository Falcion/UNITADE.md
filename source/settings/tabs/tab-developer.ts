import { NestedSetting } from "@settings/utils/types/nested_setting";
import { IUnitadeTab } from "@settings/tabs/tab";
import UnitadePlugin from "@main";
import UnitadeTabDeveloperBuilder from "@settings-factory/builder-developer";

export default class UnitadeTabStatus implements IUnitadeTab {
    tabContainer!: HTMLElement;
    tabBuilder!: UnitadeTabDeveloperBuilder;
    tabSettings!: NestedSetting[];

    constructor(containerEl: HTMLElement) {
        this.tabContainer = containerEl.createEl('div', {
            cls: 'unitade-settings-tab-container'
        });
    }

    display(plugin: UnitadePlugin): void {
        this.tabBuilder = new UnitadeTabDeveloperBuilder(this.tabContainer, plugin);
        this.tabSettings = [
            this.tabBuilder.SETTING_DEBUG_MODE,
            this.tabBuilder.SETTING_STALE_MODE,
            this.tabBuilder.SETTING_INPUT_DEBOUNCE_TITLE,
            this.tabBuilder.SETTING_INPUT_DEBOUNCE,
            this.tabBuilder.ERRORS_MENU,
        ];

        this.tabBuilder.updateDisplays();
    }

    addEventListener(type: keyof HTMLElementEventMap, listener: (this: HTMLElement, ev: Event) => any, options?: boolean | AddEventListenerOptions): void {
        this.tabContainer.addEventListener(type, listener, options);
    }
}
