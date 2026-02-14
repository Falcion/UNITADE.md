import { NestedSetting } from "@settings/utils/types/nested_setting";
import { IUnitadeTab } from "@settings/tabs/tab";
import UnitadePlugin from "@main";
import UnitadeTabStatusBuilder from "@settings-factory/builder-status";


export default class UnitadeTabStatus implements IUnitadeTab {
    tabContainer!: HTMLElement;
    tabBuilder!: UnitadeTabStatusBuilder;
    tabSettings!: NestedSetting[];

    constructor(containerEl: HTMLElement) {
        this.tabContainer = containerEl.createEl('div', {
            cls: 'unitade-settings-tab-container'
        });
    }

    display(plugin: UnitadePlugin): void {
        this.tabBuilder = new UnitadeTabStatusBuilder(this.tabContainer, plugin);
        this.tabSettings = [
            this.tabBuilder.SETTING_STATUS_BAR_ENABLE,
            this.tabBuilder.SETTING_STATUS_BAR_REGISTER_EXTENSIONS_ENABLE,
            this.tabBuilder.SETTING_STATUS_BAR_REGISTER_EXTENSIONS_MARKDOWN,
            this.tabBuilder.SETTING_STATUS_BAR_REGISTER_EXTENSIONS_GROUPED,
            this.tabBuilder.SETTING_STATUS_BAR_REGISTER_EXTENSIONS_CODE,
            this.tabBuilder.SETTING_STATUS_BAR_REGISTER_VIEWS,
            this.tabBuilder.SETTING_STATUS_BAR_CURRENT_PROCESSOR,
            this.tabBuilder.SETTING_STATUS_BAR_CURRENT_DISPLAY,
            this.tabBuilder.SETTING_STATUS_BAR_CURSOR_POSITION
        ];

        this.tabBuilder.updateDisplays();
    }

    addEventListener(type: keyof HTMLElementEventMap, listener: (this: HTMLElement, ev: Event) => any, options?: boolean | AddEventListenerOptions): void {
        this.tabContainer.addEventListener(type, listener, options);
    }
}
