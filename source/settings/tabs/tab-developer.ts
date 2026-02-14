import UnitadePlugin from "@main";
import UnitadeTabDeveloperBuilder from "@settings-factory/builder-developer";
import UnitadeUnifiedTab from "@settings/tabs/tab-unified";

export default class UnitadeTabDeveloper extends UnitadeUnifiedTab {
    override tabBuilder!: UnitadeTabDeveloperBuilder;
    override display(plugin: UnitadePlugin): void {
        this.tabBuilder = new UnitadeTabDeveloperBuilder(this.tabContainer, plugin);
        this.tabSettings = [
            this.tabBuilder.SETTING_DEBUG_MODE,
            this.tabBuilder.SETTING_STALE_MODE,
            this.tabBuilder.SETTING_INPUT_DEBOUNCE_TITLE,
            this.tabBuilder.SETTING_INPUT_DEBOUNCE,
            this.tabBuilder.SETTING_FONT_SIZE_MAX_TITLE,
            this.tabBuilder.SETTING_FONT_SIZE_MAX,
            this.tabBuilder.SETTING_FONT_SIZE_MIN_TITLE,
            this.tabBuilder.SETTING_FONT_SIZE_MIN,
            this.tabBuilder.ERRORS_MENU,
        ];

        this.tabBuilder.updateDisplays();
    }
}
