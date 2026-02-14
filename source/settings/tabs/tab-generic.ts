import UnitadeTabGenericBuilder from "@settings-factory/builder-generic";
import UnitadePlugin from "@main";
import { Addons } from "@settings/utils/consts/enums/addons";
import attachAddon from "@settings-ui/func/attach-addon";
import UnitadeUnifiedTab from "@settings/tabs/tab-unified";

export default class UnitadeTabGeneric extends UnitadeUnifiedTab {
    override tabBuilder!: UnitadeTabGenericBuilder;
    override display(plugin: UnitadePlugin): void {
        this.tabBuilder = new UnitadeTabGenericBuilder(this.tabContainer, plugin);
        this.tabSettings = [
            this.tabBuilder.SETTING_MARKDOWN_OVERCHARGE,
            this.tabBuilder.SETTING_CONFIG_EXTENSIONS_DEFAULT,
            this.tabBuilder.SETTING_CONFIG_EXTENSIONS_DEFAULT_INPUT,
            this.tabBuilder.SETTING_CONFIG_EXTENSIONS_MOBILE,
            this.tabBuilder.SETTING_CONFIG_EXTENSIONS_MOBILE_INPUT,
        ];

        attachAddon(this.tabBuilder.SETTING_CONFIG_EXTENSIONS_DEFAULT, Addons.WARNING, 'EXTENSIONS WARNING');

        this.tabBuilder.updateDisplays();
    }
}
