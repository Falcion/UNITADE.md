import UnitadePlugin from '@main';
import UnitadeTabAdvancedBuilder from '@settings-factory/builder-advanced';
import { Addons } from '@settings/utils/consts/enums/addons';
import attachAddon from '@settings-ui/func/attach-addon';
import UnitadeUnifiedTab from '@settings/tabs/tab-unified';

export default class UnitadeTabAdvanced extends UnitadeUnifiedTab {
    override tabBuilder!: UnitadeTabAdvancedBuilder;
    override display(plugin: UnitadePlugin): void {
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

        attachAddon(this.tabBuilder.SETTING_IS_ONLOAD, Addons.ATTENTION, 'ON-LOAD WARNING');
        attachAddon(this.tabBuilder.SETTING_IS_ONLOAD_UNSAFE, Addons.ATTENTION, 'ON-LOAD UNSAFE WARNING');
        attachAddon(this.tabBuilder.SETTING_IS_ONLOAD, Addons.INFO, 'ON-LOAD INFO');
        attachAddon(this.tabBuilder.SETTING_IS_ONLOAD_UNSAFE, Addons.INFO, 'ON-LOAD UNSAFE INFO');

        attachAddon(this.tabBuilder.SETTING_IGNORE_CONFIG_ENABLE, Addons.WARNING, 'IGNORE CONFIG WARNING');

        attachAddon(this.tabBuilder.SETTING_CONFIG_GROUPED_ENABLE, Addons.WARNING, 'GROUPED CONFIG WARNING');

        this.tabBuilder.updateDisplays();
    }
}
