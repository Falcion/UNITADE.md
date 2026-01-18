import UnitadePlugin from "@main";
import { Setting, SliderComponent, TextAreaComponent } from "obsidian";
import { makeSetting } from "@settings-ui/factory-setting";
import { makeInputText } from "@settings-ui/components/factory-input-text";
import { makeToggleSetting } from "@settings-ui/factory-toggle";
import { makeDropdownSetting } from "@settings-ui/factory-dropdown";
import { CODE_EDITOR_THEMES } from "@settings/utils/consts/themes";
import { makeValueSlider } from "@settings-ui/components/factory-slider-value";
import UnitadeUnifiedTabBuilder from "@settings-factory/unified-builder";
import { makeHeader } from './ui/factory-header';

export default class UnitadeTabCodeEditorBuilder extends UnitadeUnifiedTabBuilder {
    private _SETTING_CODE_EDITOR_ENABLE?: Setting = undefined;
    private _SETTING_CODE_EDITOR_EXTENSIONS_USAGE?: Setting = undefined;
    private _SETTING_CODE_EDITOR_EXTENSIONS_INPUT?: TextAreaComponent = undefined;
    private _SETTING_CODE_EDITOR_EXTENSIONS_INPUT_COMMENT?: Setting = undefined;

    private _CATEGORY_FEATURES?: HTMLHeadingElement = undefined;

    private _SETTING_ENABLE_ZOOMING?: Setting = undefined;
    private _SETTING_ENABLE_FORCING_COPY_PASTE?: Setting = undefined;
    private _SETTING_VALIDATION_SYNTAX?: Setting = undefined;
    private _SETTING_VALIDATION_SEMANTIC?: Setting = undefined;

    private _CATEGORY_VISUALS?: HTMLHeadingElement = undefined;

    private _SETTING_ENABLE_FOLDING?: Setting = undefined;
    private _SETTING_ENABLE_LINE_NUMBERING?: Setting = undefined;
    private _SETTING_ENABLE_WORDS_WRAPPING?: Setting = undefined;
    private _SETTING_ENABLE_MINIMAPPING?: Setting = undefined;
    private _SETTING_EDITOR_THEME?: Setting = undefined;

    private _CATEGORY_FONTS?: HTMLHeadingElement = undefined;

    private _SETTING_FONTS_SIZE_TITLE?: Setting = undefined;
    private _SETTING_FONTS_SIZE?: SliderComponent = undefined;
    private _SETTING_FONTS_FAMILY_TITLE?: Setting = undefined;
    private _SETTING_FONTS_FAMILY?: TextAreaComponent = undefined;
    private _SETTING_FONTS_LIGATURES?: Setting = undefined;

    constructor(containerEl: HTMLElement, plugin: UnitadePlugin) {
        super(containerEl, plugin);
    }

    public get SETTING_ENABLE_CODE_EDITOR(): Setting {
        return this._SETTING_CODE_EDITOR_ENABLE ??= makeToggleSetting(
            'ENABLE CODE EDITOR',
            'ENABLE CODE EDITOR',
            'code_editor.enable',
            this,
            () => { this.updateDisplays(); }
        );
    }

    public get SETTING_CODE_EDITOR_EXTENSIONS_USAGE(): Setting {
        return this._SETTING_CODE_EDITOR_EXTENSIONS_USAGE ??= makeToggleSetting(
            'DEFAULT EXTENSIONS USAGE',
            'DEFAULT EXTENSIONS USAGE',
            'code_editor.enable_default_extensions',
            this,
            () => { this.updateDisplays(); }
        );
    }

    public get SETTING_CODE_EDITOR_EXTENSIONS_INPUT(): TextAreaComponent {
        return this._SETTING_CODE_EDITOR_EXTENSIONS_INPUT ??= makeInputText(
            'code_editor.extensions',
            'e.g. js > ts > json',
            this,
            true,
            (val) => {
                if (!val.trimEnd() && val.length < 1) return { stable: false, error: 'Cannot be ended at empty symb.' }
                else return { stable: true }
            }
        );
    }

    public get SETTING_CODE_EDITOR_EXTENSIONS_INPUT_COMMENT(): Setting {
        return this._SETTING_CODE_EDITOR_EXTENSIONS_INPUT_COMMENT ??= makeSetting(
            '',
            '',
            this,
        );
    }

    //#region CATEGORY_FEATURES
    public get CATEGORY_FEATURES(): HTMLHeadingElement {
        return this._CATEGORY_FEATURES ??= makeHeader('FEATURES', this, 'h3', 'center');
    }

    public get SETTING_ENABLE_ZOOMING(): Setting {
        return this._SETTING_ENABLE_ZOOMING ??= makeToggleSetting(
            'ENABLE ZOOMING',
            'ENABLE ZOOMING',
            'code_editor.externals.enable_zooming',
            this,
        );
    }

    public get SETTING_ENABLE_FORCING_COPY_PASTE(): Setting {
        return this._SETTING_ENABLE_FORCING_COPY_PASTE ??= makeToggleSetting(
            'ENABLE FORCING VANILLA COPY-PASTE',
            'ENABLE FORCING VANILLA COPY-PASTE',
            'code_editor.externals.enable_vanilla_pasting',
            this,
        );
    }

    public get SETTING_VALIDATION_SYNTAX(): Setting {
        return this._SETTING_VALIDATION_SYNTAX ??= makeToggleSetting(
            'SYNTAX VALIDATION',
            'SYNTAX VALIDATION',
            'code_editor.validations.syntax',
            this,
        );
    }

    public get SETTING_VALIDATION_SEMANTIC(): Setting {
        return this._SETTING_VALIDATION_SEMANTIC ??= makeToggleSetting(
            'SEMANTIC VALIDATION',
            'SEMANTIC VALIDATION',
            'code_editor.validations.semantic',
            this,
        );
    }
    //#endregion

    //#region CATEGORY_VISUALS
    public get CATEGORY_VISUALS(): HTMLHeadingElement {
        return this._CATEGORY_VISUALS ??= makeHeader('VISUALS', this, 'h3', 'center');
    }

    public get SETTING_ENABLE_FOLDING(): Setting {
        return this._SETTING_ENABLE_FOLDING ??= makeToggleSetting(
            'ENABLE CODE FOLDING',
            'ENABLE CODE FOLDING',
            'code_editor.visuals.folding',
            this,
        );
    }

    public get SETTING_ENABLE_LINE_NUMBERING(): Setting {
        return this._SETTING_ENABLE_LINE_NUMBERING ??= makeToggleSetting(
            'ENABLE LINE NUMBERING',
            'ENABLE LINE NUMBERING',
            'code_editor.visuals.line_numbering',
            this,
        );
    }

    public get SETTING_ENABLE_WORDS_WRAPPING(): Setting {
        return this._SETTING_ENABLE_WORDS_WRAPPING ??= makeToggleSetting(
            'ENABLE WORDS WRAPPING',
            'ENABLE WORDS WRAPPING',
            'code_editor.visuals.words_wrapping',
            this,
        );
    }

    public get SETTING_ENABLE_MINIMAPPING(): Setting {
        return this._SETTING_ENABLE_MINIMAPPING ??= makeToggleSetting(
            'ENABLE MINIMAPPING',
            'ENABLE MINIMAPPING',
            'code_editor.visuals.minimapping',
            this,
        );
    }

    public get SETTING_EDITOR_THEME(): Setting {
        return this._SETTING_EDITOR_THEME ??= makeDropdownSetting(
            'EDITOR THEME',
            'EDITOR THEME',
            'code_editor.visuals.theme',
            this,
            CODE_EDITOR_THEMES
        );
    }

    //#region CATEGORY_FONTS
    public get CATEGORY_FONTS(): HTMLHeadingElement {
        return this._CATEGORY_FONTS ??= makeHeader('FONTS', this, 'h4', 'center');
    }

    public get SETTING_FONTS_SIZE_TITLE(): Setting {
        return this._SETTING_FONTS_SIZE_TITLE ??= makeSetting(
            'FONTS SIZE',
            'FONTS SIZE',
            this,
        );
    }

    public get SETTING_FONTS_SIZE(): SliderComponent {
        return this._SETTING_FONTS_SIZE ??= makeValueSlider(
            'code_editor.visuals.font_size',
            this,
            {
                min: this.plugin.settings.SYS_FONTSIZE_MIN,
                max: this.plugin.settings.SYS_FONTSIZE_MAX,
                step: 1
            },
            undefined
        );
    }

    public get SETTING_FONTS_FAMILY_TITLE(): Setting {
        return this._SETTING_FONTS_FAMILY_TITLE ??= makeSetting(
            'FONTS FAMILY',
            'FONTS FAMILY',
            this,
        );
    }

    public get SETTING_FONTS_FAMILY(): TextAreaComponent {
        return this._SETTING_FONTS_FAMILY ??= makeInputText(
            'code_editor.visuals.font_family',
            "e.g. 'Cascadia Code', 'Fira Code', Consolas, 'Courier New', monospace",
            this,
            true,
            (val) => {
                if (!val.trim() || val.length < 1) return { stable: false, error: 'Font family cannot be empty' };
                /**
                 * Basic validation to avoid injection of malicious code or invalid font family strings.
                 * @see https://regex101.com/r/iV3eRF/1
                 */
                if (!/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s,'"&\-()]+$/.test(val))
                    return { stable: false, error: 'Invalid characters in font family' };
                else
                    return { stable: true };
            }
        );
    }

    public get SETTING_FONTS_LIGATURES(): Setting {
        return this._SETTING_FONTS_LIGATURES ??= makeToggleSetting(
            'ENABLE FONT LIGATURES',
            'ENABLE FONT LIGATURES',
            'code_editor.visuals.font_ligatures',
            this,
        );
    }
    //#endregion

    updateState(): void {
        if (!this.defaults) {
            const input =
                this.SETTING_FONTS_FAMILY ??
                this.SETTING_CODE_EDITOR_EXTENSIONS_INPUT;

            this.defaults = {
                color: input.inputEl.style.color,
                borderColor: input.inputEl.style.borderColor,
                borderWidth: input.inputEl.style.borderWidth,
            };
        }

        this.updateStateInput(this.SETTING_FONTS_FAMILY, true);
        this.updateStateInput(this.SETTING_CODE_EDITOR_EXTENSIONS_INPUT, true);
    }

    updateErrors(): void {
        //!TODO: IMPLEMENT DEBUG BEFORE RELEASE. MUST DO. DO NOT UPDATE WITHOUT THIS FEATURE.
    }

    updateDisplays(): void {
        this.updateState();
        this.updateErrors();

        const visibility = this.plugin.settings.code_editor.enable;
        const visibilityInput = visibility && !this.plugin.settings.code_editor.enable_default_extensions;

        this.setVisibility(this.SETTING_CODE_EDITOR_EXTENSIONS_USAGE, visibility);
        this.setVisibility(this.SETTING_CODE_EDITOR_EXTENSIONS_INPUT, visibilityInput);
        this.setVisibility(this.SETTING_CODE_EDITOR_EXTENSIONS_INPUT_COMMENT, visibilityInput);
        this.setVisibility(this.SETTING_ENABLE_FOLDING, visibility);
        this.setVisibility(this.SETTING_ENABLE_LINE_NUMBERING, visibility);
        this.setVisibility(this.SETTING_ENABLE_WORDS_WRAPPING, visibility);
        this.setVisibility(this.SETTING_ENABLE_MINIMAPPING, visibility);
        this.setVisibility(this.SETTING_EDITOR_THEME, visibility);
        this.setVisibility(this.SETTING_FONTS_SIZE_TITLE, visibility);
        this.setVisibility(this.SETTING_FONTS_SIZE, visibility);
        this.setVisibility(this.SETTING_FONTS_FAMILY_TITLE, visibility);
        this.setVisibility(this.SETTING_FONTS_FAMILY, visibility);
        this.setVisibility(this.SETTING_FONTS_LIGATURES, visibility);
        this.setVisibility(this.SETTING_ENABLE_ZOOMING, visibility);
        this.setVisibility(this.SETTING_ENABLE_FORCING_COPY_PASTE, visibility);
        this.setVisibility(this.SETTING_VALIDATION_SYNTAX, visibility);
        this.setVisibility(this.SETTING_VALIDATION_SEMANTIC, visibility);
        this.setVisibility(this.CATEGORY_FEATURES, visibility);
        this.setVisibility(this.CATEGORY_VISUALS, visibility);
        this.setVisibility(this.CATEGORY_FONTS, visibility);
    }
}
