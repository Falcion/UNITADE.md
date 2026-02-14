import UnitadePlugin from "@main";
import UnitadeTabStatusBuilder from "@settings-factory/builder-status";
import UnitadeUnifiedTab from "./tab-unified";

export default class UnitadeTabStatus extends UnitadeUnifiedTab {
    override tabBuilder!: UnitadeTabStatusBuilder;
    override display(plugin: UnitadePlugin): void {
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
}
