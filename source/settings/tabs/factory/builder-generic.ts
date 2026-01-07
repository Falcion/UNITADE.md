import { Setting, TextAreaComponent } from 'obsidian';
import UnitadePlugin from '@main';
import { IUnitadeTabBuilder } from '@settings/tabs/factory/builder';
import { ISettings } from '@settings/defaults_interface';
import { makeToggleSetting } from '@settings/tabs/factory/ui/factory-toggle';
import { makeSetting } from '@settings/tabs/factory/ui/factory-setting';
import { NestedKey } from '@settings/utils/types/nested_key';
import { setDeep } from '@settings/utils/functions/deep';
import { makeInputText } from '@settings/tabs/factory/ui/factory-input-text';

export default class UnitadeTabGenericBuilder implements IUnitadeTabBuilder {
    defaults?: {
        color: string;
        borderColor: string;
        borderWidth: string;
    } = undefined;

    defaultsError: {
        color: string;
        borderColor: string;
        borderWidth: string;
    } = {
            color: 'red',
            borderColor: 'red',
            borderWidth: '4px'
        };

    private _plugin!: UnitadePlugin;
    private _containerEl!: HTMLElement;

    public get plugin() {
        return this._plugin;
    }

    public get containerEl() {
        return this._containerEl;
    }

    private _SETTING_MARKDOWN_OVERCHARGE?: Setting = undefined;
    private _SETTING_CONFIG_EXTENSIONS_DEFAULT?: Setting = undefined;
    private _SETTING_CONFIG_EXTENSIONS_DEFAULT_INPUT?: TextAreaComponent = undefined;
    private _SETTING_CONFIG_EXTENSIONS_MOBILE?: Setting = undefined;
    private _SETTING_CONFIG_EXTENSIONS_MOBILE_INPUT?: TextAreaComponent = undefined;
    private _SETTING_CASE_INSENSITIVE?: Setting = undefined;

    constructor(containerEl: HTMLElement, plugin: UnitadePlugin) {
        this._plugin = plugin;
        this._containerEl = containerEl;
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

    public get SETTING_CASE_INSENSITIVE(): Setting {
        return this._SETTING_CASE_INSENSITIVE ??= makeToggleSetting(
            'CASE INSENSITIVE',
            'CASE INSENSITIVE',
            'is_case_insensitive',
            this,
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

        if (this.SETTING_CONFIG_EXTENSIONS_MOBILE_INPUT) {
            this.SETTING_CONFIG_EXTENSIONS_MOBILE_INPUT.inputEl.style.display = this.plugin.settings.mobile.enable ? 'block' : 'none';
        }
    }

    async updateSetting(key: NestedKey<ISettings>, value: any) {
        const next = structuredClone(this.plugin.settings) as ISettings;

        setDeep(next, key, value);

        await this.plugin.uptSettings(next);
    }
}
