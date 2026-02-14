import UnitadePlugin from "@main";
import UnitadeUnifiedTab from "@settings/tabs/tab-unified";
import UnitadeTabForcedBuilder from "@settings-factory/builder-forced";

export default class UnitadeTabForced extends UnitadeUnifiedTab {
    override tabBuilder!: UnitadeTabForcedBuilder;
    override display(plugin: UnitadePlugin): void {
        this.tabBuilder = new UnitadeTabForcedBuilder(this.tabContainer, plugin);
        this.tabSettings = [
            this.tabBuilder.SETTING_FORCED_ENABLE,
            this.tabBuilder.SETTING_FORCED_EXTENSIONS_TITLE,
            this.tabBuilder.SETTING_FORCED_EXTENSIONS,
            this.tabBuilder.SETTING_FORCED_MODE,
            this.tabBuilder.SETTING_FORCED_ADVANCED_ENABLE,
            this.tabBuilder.SETTING_FORCED_ADVANCED_GROUPS_TITLE,
            this.tabBuilder.SETTING_FORCED_ADVANCED_GROUPS,
        ];

        this.tabBuilder.updateDisplays();
    }
}
