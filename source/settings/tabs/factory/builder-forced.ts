import UnitadeUnifiedTabBuilder from "./unified-builder";
import { Setting, TextAreaComponent } from "obsidian";
import UnitadePlugin from "@main";
import { makeToggleSetting } from "@settings-ui/factory-toggle";
import { makeSetting } from "@settings-ui/factory-setting";
import { makeInputText } from "@settings-ui/components/factory-input-text";
import { makeDropdownSetting } from "./ui/factory-dropdown";
import { OBSIDIAN_VIEW_MODES } from "@settings/utils/consts/modes";

export default class UnitadeTabForcedBuilder extends UnitadeUnifiedTabBuilder {
    private _SETTING_FORCED_ENABLE?: Setting = undefined;
    private _SETTING_FORCED_EXTENSIONS_TITLE?: Setting = undefined;
    private _SETTING_FORCED_EXTENSIONS?: TextAreaComponent = undefined;
    private _SETTING_FORCED_MODE?: Setting = undefined;
    private _SETTING_FORCED_ADVANCED_ENABLE?: Setting = undefined;
    private _SETTING_FORCED_ADVANCED_GROUPS_TITLE?: Setting = undefined;
    private _SETTING_FORCED_ADVANCED_GROUPS?: TextAreaComponent = undefined;

    constructor(containerEl: HTMLElement, plugin: UnitadePlugin) {
        super(containerEl, plugin);
    }

    public get SETTING_FORCED_ENABLE(): Setting {
        return this._SETTING_FORCED_ENABLE ??= makeToggleSetting(
            'FORCED VIEW: ENABLE',
            'FORCED VIEW: ENABLE',
            'forced_view.enable',
            this,
            () => { this.updateDisplays(); }
        );
    }

    public get SETTING_FORCED_EXTENSIONS_TITLE(): Setting {
        return this._SETTING_FORCED_EXTENSIONS_TITLE ??= makeSetting(
            'FORCED VIEW: EXTENSIONS',
            'FORCED VIEW: EXTENSIONS',
            this
        );
    }

    public get SETTING_FORCED_EXTENSIONS(): TextAreaComponent {
        return this._SETTING_FORCED_EXTENSIONS ??= makeInputText(
            'forced_view.extensions',
            'e.g. txt > ini > csv',
            this,
            true,
            (val) => {
                if (!val.trimEnd() && val.length < 1) return { stable: false, error: 'Cannot be ended at empty symb.' }
                else return { stable: true }
            }
        );
    }

    public get SETTING_FORCED_MODE(): Setting {
        return this._SETTING_FORCED_MODE ??= makeDropdownSetting(
            'FORCED VIEW: MODE',
            'FORCED VIEW: MODE',
            'forced_view.mode',
            this,
            OBSIDIAN_VIEW_MODES
        );
    }

    public get SETTING_FORCED_ADVANCED_ENABLE(): Setting {
        return this._SETTING_FORCED_ADVANCED_ENABLE ??= makeToggleSetting(
            'FORCED VIEW: ADVANCED: ENABLE',
            'FORCED VIEW: ADVANCED: ENABLE',
            'forced_view.advanced.enable',
            this,
            () => { this.updateDisplays(); }
        );
    }

    public get SETTING_FORCED_ADVANCED_GROUPS_TITLE(): Setting {
        return this._SETTING_FORCED_ADVANCED_GROUPS_TITLE ??= makeSetting(
            'FORCED VIEW: ADVANCED: GROUPS',
            'FORCED VIEW: ADVANCED: GROUPS',
            this
        );
    }

    public get SETTING_FORCED_ADVANCED_GROUPS(): TextAreaComponent {
        return this._SETTING_FORCED_ADVANCED_GROUPS ??= makeInputText(
            'forced_view.advanced.groups',
            'e.g. live-preview: txt > ini; source: csv; reading: md',
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
            const input = this.SETTING_FORCED_EXTENSIONS ?? this.SETTING_FORCED_ADVANCED_GROUPS;

            this.defaults = {
                color: input.inputEl.style.color,
                borderColor: input.inputEl.style.borderColor,
                borderWidth: input.inputEl.style.borderWidth,
            };
        }

        this.updateStateInput(this.SETTING_FORCED_EXTENSIONS, true);
        this.updateStateInput(this.SETTING_FORCED_ADVANCED_GROUPS, true);
    }

    updateErrors(): void {
        //!TODO: IMPLEMENT DEBUG BEFORE RELEASE. MUST DO. DO NOT UPDATE WITHOUT THIS FEATURE.
    }

    updateDisplays(): void {
        this.updateState();
        this.updateErrors();

        const visibility = this.plugin.settings.forced_view.enable;
        const visibilityAdvanced = this.plugin.settings.forced_view.advanced.enable;

        this.setVisibility(this.SETTING_FORCED_EXTENSIONS_TITLE, visibility);
        this.setVisibility(this.SETTING_FORCED_EXTENSIONS, visibility);
        this.setVisibility(this.SETTING_FORCED_MODE, visibility);
        this.setVisibility(this.SETTING_FORCED_ADVANCED_ENABLE, visibility);
        this.setVisibility(this.SETTING_FORCED_ADVANCED_GROUPS_TITLE, visibility && visibilityAdvanced);
        this.setVisibility(this.SETTING_FORCED_ADVANCED_GROUPS, visibility && visibilityAdvanced);
    }
}

