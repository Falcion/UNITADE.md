import { BaseComponent, Setting, TextAreaComponent, ToggleComponent } from 'obsidian';
import UnitadePlugin from '@main';
import { makeToggleSetting } from '@settings-ui/factory-toggle';
import { makeInputText } from '@settings-ui/components/factory-input-text';
import { parseRegex, parsePattern } from '@settings/utils/functions/parsers';
import { makeSetting } from '@settings-ui/factory-setting';
import UnitadeUnifiedTabBuilder from '@settings-factory/unified-builder';

export default class UnitadeTabAdvancedBuilder extends UnitadeUnifiedTabBuilder {
    private _SETTING_IGNORE_CONFIG_ENABLE?: Setting = undefined;
    private _SETTING_IGNORE_CONFIG_MASKS_TITLE?: Setting = undefined;
    private _SETTING_IGNORE_CONFIG_MASKS?: TextAreaComponent = undefined;
    private _SETTING_IGNORE_CONFIG_EXTENSIONS_TITLE?: Setting = undefined;
    private _SETTING_IGNORE_CONFIG_EXTENSIONS?: TextAreaComponent = undefined;

    private _SETTING_GROUPED_CONFIG_ENABLE?: Setting = undefined;
    private _SETTING_GROUPED_CONFIG_PATTERNS_TITLE?: Setting = undefined;
    private _SETTING_GROUPED_CONFIG_PATTERNS?: TextAreaComponent = undefined;

    private _SETTING_FORCED_EXTENSIONS_TITLE?: Setting = undefined;
    private _SETTING_FORCED_EXTENSIONS?: TextAreaComponent = undefined;

    private _SETTING_IS_ONLOAD?: Setting = undefined;
    private _SETTING_IS_ONLOAD_UNSAFE?: Setting = undefined;

    private _SETTING_BAREFILING?: Setting = undefined;

    constructor(containerEl: HTMLElement, plugin: UnitadePlugin) {
        super(containerEl, plugin);
    }

    public get SETTING_IGNORE_CONFIG_ENABLE(): Setting {
        return this._SETTING_IGNORE_CONFIG_ENABLE ??= makeToggleSetting(
            'IGNORE CONFIG ENABLE',
            'IGNORE CONFIG ENABLE',
            'ignore.enable',
            this,
            () => { this.updateDisplays(); }
        );
    }

    public get SETTING_IGNORE_CONFIG_MASKS_TITLE(): Setting {
        return this._SETTING_IGNORE_CONFIG_MASKS_TITLE ??= makeSetting(
            'IGNORE MASKS',
            'IGNORE MASKS DESC',
            this
        );
    }

    public get SETTING_IGNORE_CONFIG_MASKS(): TextAreaComponent {
        return this._SETTING_IGNORE_CONFIG_MASKS ??= makeInputText(
            'ignore.masks',
            'e.g. /.(?:r\\d\\d|r\\d\\d\\d|rar|zip)/ > /\\b=\\b/g',
            this,
            true,
            (val) => {
                const regexes = val
                    .split('>')
                    .map(parseRegex);

                if (regexes.some(r => r === null)) return { stable: false, error: 'Cannot parse invalid regex.' }
                else return { stable: true }
            }
        );
    }

    public get SETTING_IGNORE_CONFIG_EXTENSIONS_TITLE(): Setting {
        return this._SETTING_IGNORE_CONFIG_EXTENSIONS_TITLE ??= makeSetting(
            'IGNORE EXTENSIONS',
            'IGNORE EXTENSIONS DESC',
            this
        );
    }

    public get SETTING_IGNORE_CONFIG_EXTENSIONS(): TextAreaComponent {
        return this._SETTING_IGNORE_CONFIG_EXTENSIONS ??= makeInputText(
            'ignore.extensions',
            'e.g. exe > dll > sys',
            this,
            true,
            (val) => {
                if (!val.trimEnd() && val.length < 1) return { stable: false, error: 'Cannot be ended at empty symb.' }
                else return { stable: true }
            }
        );
    }

    public get SETTING_CONFIG_GROUPED_ENABLE(): Setting {
        return this._SETTING_GROUPED_CONFIG_ENABLE ??= makeToggleSetting(
            'GROUPED CONFIG ENABLE',
            'GROUPED CONFIG ENABLE',
            'grouped.enable',
            this,
            () => { this.updateDisplays(); }
        );
    }

    public get SETTING_CONFIG_GROUPED_PATTERNS_TITLE(): Setting {
        return this._SETTING_GROUPED_CONFIG_PATTERNS_TITLE ??= makeSetting(
            'GROUPED PATTERNS',
            'GROUPED PATTERNS DESC',
            this
        );
    }

    public get SETTING_CONFIG_GROUPED_PATTERNS(): TextAreaComponent {
        return this._SETTING_GROUPED_CONFIG_PATTERNS ??= makeInputText(
            'grouped.patterns',
            'e.g. markdown: txt > ini > cfg; code: js > html > tsx > rs;',
            this,
            true,
            (val) => {
                const patterns = parsePattern(val);

                if (Object.keys(patterns).length === 0) return { stable: false, error: 'At least one pattern must be defined.' }
                else return { stable: true }
            }
        );
    }

    /**
     * @deprecated
     * This setting is in "legacy-" block and can be accessed only
     * by enabling "legacy-mode" in the developer settings.
     */
    public get SETTING_FORCED_EXTENSIONS_TITLE(): Setting {
        return this._SETTING_FORCED_EXTENSIONS_TITLE ??= makeSetting(
            'FORCED EXTENSIONS',
            'FORCED EXTENSIONS TITLE',
            this
        );
    }
    /**
     * @deprecated
     * This setting is in "legacy-" block and can be accessed only
     * by enabling "legacy-mode" in the developer settings.
     */
    public get SETTING_FORCED_EXTENSIONS(): TextAreaComponent {
        return this._SETTING_FORCED_EXTENSIONS ??= makeInputText(
            'forced_extensions',
            'e.g. mp4 > mkv > mov',
            this,
            true,
            (val) => {
                if (!val.trimEnd() && val.length < 1) return { stable: false, error: 'Cannot be ended at empty symb.' }
                else return { stable: true }
            }
        );
    }

    public get SETTING_IS_ONLOAD(): Setting {
        return this._SETTING_IS_ONLOAD ??= makeToggleSetting(
            'IS ONLOAD',
            'IS ONLOAD',
            'is_onload',
            this,
            async (val) => {
                if (val && this.plugin.settings.is_onload_unsafe) {
                    await this.updateSetting('is_onload_unsafe', false);

                    this.updateStateToggle(this.SETTING_IS_ONLOAD_UNSAFE.components, false);
                }
            }
        );
    }

    public get SETTING_IS_ONLOAD_UNSAFE(): Setting {
        return this._SETTING_IS_ONLOAD_UNSAFE ??= makeToggleSetting(
            'IS ONLOAD UNSAFE',
            'IS ONLOAD UNSAFE',
            'is_onload_unsafe',
            this,
            async (val) => {
                if (val && this.plugin.settings.is_onload) {
                    await this.updateSetting('is_onload', false);

                    this.updateStateToggle(this.SETTING_IS_ONLOAD.components, false);
                }
            }
        );
    }

    public get SETTING_BAREFILING(): Setting {
        return this._SETTING_BAREFILING ??= makeToggleSetting(
            'BAREFILING',
            'BAREFILING',
            'barefiling',
            this
        );
    }

    updateState(): void {
        if (!this.defaults) {
            const input =
                this.SETTING_IGNORE_CONFIG_MASKS ??
                this.SETTING_IGNORE_CONFIG_EXTENSIONS ??
                this.SETTING_CONFIG_GROUPED_PATTERNS ??
                this.SETTING_FORCED_EXTENSIONS;

            this.defaults = {
                color: input.inputEl.style.color,
                borderColor: input.inputEl.style.borderColor,
                borderWidth: input.inputEl.style.borderWidth,
            };
        }

        this.updateStateInput(this.SETTING_IGNORE_CONFIG_MASKS, this.plugin.settings.ignore.stable);
        this.updateStateInput(this.SETTING_IGNORE_CONFIG_EXTENSIONS, this.plugin.settings.ignore.stable);
        this.updateStateInput(this.SETTING_CONFIG_GROUPED_PATTERNS, this.plugin.settings.grouped.stable);
        this.updateStateInput(this.SETTING_FORCED_EXTENSIONS, true);

        this.updateStateToggle(this.SETTING_IS_ONLOAD.components, this.plugin.settings.is_onload);
        this.updateStateToggle(this.SETTING_IS_ONLOAD_UNSAFE.components, this.plugin.settings.is_onload_unsafe);
    }

    updateStateToggle(components: ReadonlyArray<BaseComponent>, state: boolean): void {
        for (const component of components) {
            if (component instanceof ToggleComponent) {
                component.setValue(state);
            }
        }
    }

    updateErrors(): void {
        //!TODO: IMPLEMENT DEBUG BEFORE RELEASE. MUST DO. DO NOT UPDATE WITHOUT THIS FEATURE.
    }

    updateDisplays(): void {
        this.updateState();
        this.updateErrors();

        this.setVisibility(this.SETTING_IGNORE_CONFIG_MASKS, this.plugin.settings.ignore.enable);
        this.setVisibility(this.SETTING_IGNORE_CONFIG_MASKS_TITLE, this.plugin.settings.ignore.enable);
        this.setVisibility(this.SETTING_IGNORE_CONFIG_EXTENSIONS, this.plugin.settings.ignore.enable);
        this.setVisibility(this.SETTING_IGNORE_CONFIG_EXTENSIONS_TITLE, this.plugin.settings.ignore.enable);

        this.setVisibility(this.SETTING_CONFIG_GROUPED_PATTERNS, this.plugin.settings.grouped.enable);
        this.setVisibility(this.SETTING_CONFIG_GROUPED_PATTERNS_TITLE, this.plugin.settings.grouped.enable);

        this.setVisibility(this.SETTING_FORCED_EXTENSIONS, this.plugin.settings.developer.stale);
        this.setVisibility(this.SETTING_FORCED_EXTENSIONS_TITLE, this.plugin.settings.developer.stale);
    }
}

