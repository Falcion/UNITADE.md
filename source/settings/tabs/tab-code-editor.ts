import { NestedSetting } from "@settings/utils/types/nested_setting";
import { IUnitadeTab } from "@settings/tabs/tab";
import { Addons } from "@settings/utils/consts/enums/addons";
import UnitadePlugin from "@main";
import attachAddon from "@settings-ui/func/attach-addon";
import UnitadeTabCodeEditorBuilder from "@settings-factory/builder-code-editor";

export default class UnitadeTabCodeEditor implements IUnitadeTab {
    tabContainer!: HTMLElement;
    tabBuilder!: UnitadeTabCodeEditorBuilder;
    tabSettings!: NestedSetting[];

    constructor(containerEl: HTMLElement) {
        this.tabContainer = containerEl.createEl('div', {
            cls: 'unitade-settings-tab-container'
        });
    }

    display(plugin: UnitadePlugin): void {
        this.tabBuilder = new UnitadeTabCodeEditorBuilder(this.tabContainer, plugin);
        this.tabSettings = [
            this.tabBuilder.SETTING_ENABLE_CODE_EDITOR,
            this.tabBuilder.SETTING_CODE_EDITOR_EXTENSIONS_USAGE,
            this.tabBuilder.SETTING_CODE_EDITOR_EXTENSIONS_INPUT,
            this.tabBuilder.SETTING_CODE_EDITOR_EXTENSIONS_INPUT_COMMENT,

            this.tabBuilder.CATEGORY_FEATURES,
            this.tabBuilder.SETTING_ENABLE_ZOOMING,
            this.tabBuilder.SETTING_ENABLE_FORCING_COPY_PASTE,
            this.tabBuilder.SETTING_VALIDATION_SYNTAX,
            this.tabBuilder.SETTING_VALIDATION_SEMANTIC,

            this.tabBuilder.CATEGORY_VISUALS,
            this.tabBuilder.SETTING_ENABLE_FOLDING,
            this.tabBuilder.SETTING_ENABLE_LINE_NUMBERING,
            this.tabBuilder.SETTING_ENABLE_WORDS_WRAPPING,
            this.tabBuilder.SETTING_ENABLE_MINIMAPPING,
            this.tabBuilder.SETTING_EDITOR_THEME,

            this.tabBuilder.CATEGORY_FONTS,
            this.tabBuilder.SETTING_FONTS_SIZE_TITLE,
            this.tabBuilder.SETTING_FONTS_SIZE,
            this.tabBuilder.SETTING_FONTS_FAMILY_TITLE,
            this.tabBuilder.SETTING_FONTS_FAMILY,
            this.tabBuilder.SETTING_FONTS_LIGATURES,
        ];

        attachAddon(this.tabBuilder.SETTING_CODE_EDITOR_EXTENSIONS_INPUT_COMMENT, Addons.COMMENT, 'CODE EDITOR EXTENSIONS INFO');

        attachAddon(this.tabBuilder.SETTING_ENABLE_ZOOMING, Addons.WARNING, 'CODE EDITOR ZOOMING INFO');
        attachAddon(this.tabBuilder.SETTING_ENABLE_FORCING_COPY_PASTE, Addons.WARNING, 'CODE EDITOR FORCING VANILLA COPY-PASTE INFO');

        this.tabBuilder.updateDisplays();
    }

    addEventListener(type: keyof HTMLElementEventMap, listener: (this: HTMLElement, ev: Event) => any, options?: boolean | AddEventListenerOptions): void {
        this.tabContainer.addEventListener(type, listener, options);
    }
}
