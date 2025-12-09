import { NestedSetting } from "@settings/utils/types/nested_setting";
import UnitadeTabGenericBuilder from "@settings/tabs/factory/builder-generic";
import { IUnitadeTab } from "@settings/tabs/tab";
import { Addons } from "@settings/utils/types/addons";
import UnitadePlugin from "@main";

export default class UnitadeTabGeneric implements IUnitadeTab {
    public tabBuilder!: UnitadeTabGenericBuilder;
    public tabSettings!: NestedSetting[];

    display(containerEl: HTMLElement, plugin: UnitadePlugin): void {
        this.tabBuilder = new UnitadeTabGenericBuilder(containerEl, plugin);
        this.tabSettings = [
            this.tabBuilder.SETTING_MARKDOWN_OVERCHARGE,
            this.tabBuilder.SETTING_CONFIG_EXTENSIONS_DEFAULT,
            this.tabBuilder.SETTING_CONFIG_EXTENSIONS_DEFAULT_INPUT,
            this.tabBuilder.SETTING_CONFIG_EXTENSIONS_MOBILE,
            this.tabBuilder.SETTING_CONFIG_EXTENSIONS_MOBILE_INPUT,
            this.tabBuilder.SETTING_CASE_INSENSITIVE
        ];

        this.tabBuilder.attachAddon(this.tabBuilder.SETTING_CONFIG_EXTENSIONS_DEFAULT, Addons.Warning, 'EXTENSIONS WARNING')
    }

    addEventListener(containerEl: HTMLElement, type: keyof HTMLElementEventMap, listener: (this: HTMLElement, ev: Event) => any, options?: boolean | AddEventListenerOptions): void {
        containerEl.addEventListener(type, listener, options);
    }
}
