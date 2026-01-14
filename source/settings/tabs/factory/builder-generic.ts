import { Setting, TextAreaComponent } from 'obsidian';
import UnitadePlugin from '@main';
import { makeToggleSetting } from '@settings-ui/factory-toggle';
import { makeSetting } from '@settings-ui/factory-setting';
import { makeInputText } from '@settings-ui/components/factory-input-text';
import UnitadeUnifiedTabBuilder from '@settings-factory/unified-builder';

export default class UnitadeTabGenericBuilder extends UnitadeUnifiedTabBuilder {
    private _SETTING_MARKDOWN_OVERCHARGE?: Setting = undefined;
    private _SETTING_CONFIG_EXTENSIONS_DEFAULT?: Setting = undefined;
    private _SETTING_CONFIG_EXTENSIONS_DEFAULT_INPUT?: TextAreaComponent = undefined;
    private _SETTING_CONFIG_EXTENSIONS_MOBILE?: Setting = undefined;
    private _SETTING_CONFIG_EXTENSIONS_MOBILE_INPUT?: TextAreaComponent = undefined;

    constructor(containerEl: HTMLElement, plugin: UnitadePlugin) {
        super(containerEl, plugin);
    }

    public get SETTING_MARKDOWN_OVERCHARGE(): Setting {
        return this._SETTING_MARKDOWN_OVERCHARGE ??= makeToggleSetting(
            'MARKDOWN_OVERCHARGE',
            'MARKDOWN_OVERCHARGE',
            'markdown_overcharge',
            this,
        );
    }

    public get SETTING_CONFIG_EXTENSIONS_DEFAULT(): Setting {
        return this._SETTING_CONFIG_EXTENSIONS_DEFAULT ??= makeSetting(
            'EXTENSIONS AS MARKDOWN',
            'EXTENSIONS AS MARKDOWN',
            this
        );
    }

    public get SETTING_CONFIG_EXTENSIONS_DEFAULT_INPUT(): TextAreaComponent {
        return this._SETTING_CONFIG_EXTENSIONS_DEFAULT_INPUT ??= makeInputText(
            'default.extensions',
            'e.g. txt > ini > csv',
            this,
            true,
            (val) => {
                if (!val.trimEnd() && val.length < 1) return { stable: false, error: 'Cannot be ended at empty symb.' }
                else return { stable: true }
            }
        );
    }

    public get SETTING_CONFIG_EXTENSIONS_MOBILE(): Setting {
        return this._SETTING_CONFIG_EXTENSIONS_MOBILE ??= makeToggleSetting(
            'EXTENSIONS AS MARKDOWN (MOBILE)',
            'EXTENSIONS AS MARKDOWN (MOBILE)',
            'mobile.enable',
            this,
            () => { this.updateDisplays(); }
        );
    }

    public get SETTING_CONFIG_EXTENSIONS_MOBILE_INPUT(): TextAreaComponent {
        return this._SETTING_CONFIG_EXTENSIONS_MOBILE_INPUT ??= makeInputText(
            'mobile.extensions',
            'e.g. txt > ini > csv',
            this,
            true,
            (val) => {
                if (!val.trimEnd() && val.length < 1) return { stable: false, error: 'Cannot be ended at empty symb.' }
                else return { stable: true }
            }
        );
    }

    updateState(): void {
        if (!this.defaults) {
            const input = this.SETTING_CONFIG_EXTENSIONS_DEFAULT_INPUT ?? this.SETTING_CONFIG_EXTENSIONS_MOBILE_INPUT;

            this.defaults = {
                color: input.inputEl.style.color,
                borderColor: input.inputEl.style.borderColor,
                borderWidth: input.inputEl.style.borderWidth,
            };
        }

        this.updateStateInput(this.SETTING_CONFIG_EXTENSIONS_DEFAULT_INPUT, this.plugin.settings.default.stable)
        this.updateStateInput(this.SETTING_CONFIG_EXTENSIONS_MOBILE_INPUT, this.plugin.settings.mobile.stable)
    }

    updateStateInput(input: TextAreaComponent, stable: boolean): void {
        if (stable) {
            input.inputEl.style.color = this.defaults!.color;
            input.inputEl.style.borderColor = this.defaults!.borderColor;
            input.inputEl.style.borderWidth = this.defaults!.borderWidth;
        } else {
            input.inputEl.style.color = this.defaultsError!.color;
            input.inputEl.style.borderColor = this.defaultsError!.borderColor;
            input.inputEl.style.borderWidth = this.defaultsError!.borderWidth;
        }
    }

    updateErrors(): void {
        //!TODO: IMPLEMENT DEBUG BEFORE RELEASE. MUST DO. DO NOT UPDATE WITHOUT THIS FEATURE.
    }

    updateDisplays(): void {
        this.updateState();
        this.updateErrors();

        this.setVisibility(this.SETTING_CONFIG_EXTENSIONS_MOBILE_INPUT, this.plugin.settings.mobile.enable);
    }
}
