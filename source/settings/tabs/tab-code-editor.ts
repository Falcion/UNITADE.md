import { NestedSetting } from "@settings/utils/types/nested_setting";
import UnitadeTabGenericBuilder from "@settings/tabs/factory/builder-generic";
import { IUnitadeTab } from "@settings/tabs/tab";
import { Addons } from "@settings/utils/types/addons";
import UnitadePlugin from "@main";
import attachAddon from "@settings/tabs/factory/ui/func/attach-addon";

export default class UnitadeTabCodeEditor implements IUnitadeTab {
    tabContainer!: HTMLElement;
    tabBuilder!: UnitadeTabGenericBuilder;
    tabSettings!: NestedSetting[];

    constructor(containerEl: HTMLElement) {
        this.tabContainer = containerEl.createEl('div', {
            cls: 'unitade-settings-tab-container'
        });
    }

    display(plugin: UnitadePlugin): void {
        this.tabBuilder = new UnitadeTabGenericBuilder(this.tabContainer, plugin);
        this.tabSettings = [
            this.tabBuilder.SETTING_MARKDOWN_OVERCHARGE,
            this.tabBuilder.SETTING_CONFIG_EXTENSIONS_DEFAULT,
            this.tabBuilder.SETTING_CONFIG_EXTENSIONS_DEFAULT_INPUT,
            this.tabBuilder.SETTING_CONFIG_EXTENSIONS_MOBILE,
            this.tabBuilder.SETTING_CONFIG_EXTENSIONS_MOBILE_INPUT,
            this.tabBuilder.SETTING_CASE_INSENSITIVE
        ];

        this.tabBuilder.updateDisplays();
        attachAddon(this.tabBuilder.SETTING_CONFIG_EXTENSIONS_DEFAULT, Addons.WARNING, 'EXTENSIONS WARNING');
    }

    addEventListener(type: keyof HTMLElementEventMap, listener: (this: HTMLElement, ev: Event) => any, options?: boolean | AddEventListenerOptions): void {
        this.tabContainer.addEventListener(type, listener, options);
    }
}
