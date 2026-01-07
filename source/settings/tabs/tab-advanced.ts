import UnitadePlugin from '@main';
import { IUnitadeTab } from '@settings/tabs/tab';
import { NestedSetting } from '@settings/utils/types/nested_setting';
import UnitadeTabAdvancedBuilder from '@settings/tabs/factory/builder-advanced';
import { Addons } from '@settings/utils/types/addons';
import attachAddon from '@settings/tabs/factory/ui/func/attach-addon';
export default class UnitadeTabAdvanced implements IUnitadeTab {
    tabContainer!: HTMLElement;
    tabBuilder!: UnitadeTabAdvancedBuilder;
    tabSettings!: NestedSetting[];

    constructor(containerEl: HTMLElement) {
        this.tabContainer = containerEl.createEl('div', {
            cls: 'unitade-settings-tab-container'
        });
    }

    display(plugin: UnitadePlugin): void {
        this.tabBuilder = new UnitadeTabAdvancedBuilder(this.tabContainer, plugin);
        this.tabSettings = [
            this.tabBuilder.SETTING_IGNORE_CONFIG_ENABLE,
            this.tabBuilder.SETTING_IGNORE_CONFIG_MASKS,
            this.tabBuilder.SETTING_IGNORE_CONFIG_EXTENSIONS,
            this.tabBuilder.SETTING_CONFIG_GROUPED_ENABLE,
            this.tabBuilder.SETTING_CONFIG_GROUPED_PATTERNS_TITLE,
            this.tabBuilder.SETTING_CONFIG_GROUPED_PATTERNS,
            this.tabBuilder.SETTING_FORCED_EXTENSIONS_TITLE,
            this.tabBuilder.SETTING_FORCED_EXTENSIONS,
            this.tabBuilder.SETTING_IS_ONLOAD,
            this.tabBuilder.SETTING_IS_ONLOAD_UNSAFE,
            this.tabBuilder.SETTING_BAREFILING
        ];

        this.tabBuilder.updateDisplays();

        attachAddon(this.tabBuilder.SETTING_IS_ONLOAD, Addons.ATTENTION, 'ON-LOAD WARNING');
        attachAddon(this.tabBuilder.SETTING_IS_ONLOAD_UNSAFE, Addons.ATTENTION, 'ON-LOAD UNSAFE WARNING');
        attachAddon(this.tabBuilder.SETTING_IS_ONLOAD, Addons.INFO, 'ON-LOAD INFO');
        attachAddon(this.tabBuilder.SETTING_IS_ONLOAD_UNSAFE, Addons.INFO, 'ON-LOAD UNSAFE INFO');

        attachAddon(this.tabBuilder.SETTING_IGNORE_CONFIG_ENABLE, Addons.WARNING, 'IGNORE CONFIG WARNING');

        attachAddon(this.tabBuilder.SETTING_CONFIG_GROUPED_ENABLE, Addons.WARNING, 'GROUPED CONFIG WARNING');
    }

    addEventListener(type: keyof HTMLElementEventMap, listener: (this: HTMLElement, ev: Event) => any, options?: boolean | AddEventListenerOptions): void {
        this.tabContainer.addEventListener(type, listener, options);
    }
}
