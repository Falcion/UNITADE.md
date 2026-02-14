import UnitadeTabExternalsBuilder from "@settings-factory/builder-externals";
import UnitadePlugin from "@main";
import UnitadeUnifiedTab from "@settings/tabs/tab-unified";

export default class UnitadeTabExternals extends UnitadeUnifiedTab {
    override tabBuilder!: UnitadeTabExternalsBuilder;
    override display(plugin: UnitadePlugin): void {
        this.tabBuilder = new UnitadeTabExternalsBuilder(this.tabContainer, plugin);
        this.tabSettings = [
            this.tabBuilder.SETTING_CASE_INSENSITIVITY_MODE,
            this.tabBuilder.SETTING_COMPATIBILITY_MODE,
            this.tabBuilder.SETTING_SAFE_MODE,
            this.tabBuilder.SETTING_SAFE_CASE_SENSITIVE_MODE,
            this.tabBuilder.SETTING_SILENCING_MODE,
        ];

        this.tabBuilder.updateDisplays();
    }
}
