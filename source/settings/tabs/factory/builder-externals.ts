import UnitadePlugin from "@main";
import UnitadeUnifiedTabBuilder from "@settings-factory/unified-builder";
import { Setting } from "obsidian";
import { makeToggleSetting } from "@settings-ui/factory-toggle";

export default class UnitadeTabExternalsBuilder extends UnitadeUnifiedTabBuilder {
    private _SETTINGS_CASE_INSENSITIVITY_MODE?: Setting = undefined;
    private _SETTING_COMPATIBILITY_MODE?: Setting = undefined;
    private _SETTING_SAFE_MODE?: Setting = undefined;
    private _SETTING_SAFE_CASE_SENSITIVE_MODE?: Setting = undefined;
    private _SETTING_SILENCING_MODE?: Setting = undefined;

    constructor(containerEl: HTMLElement, plugin: UnitadePlugin) {
        super(containerEl, plugin);
    }

    public get SETTING_CASE_INSENSITIVITY_MODE(): Setting {
        return this._SETTINGS_CASE_INSENSITIVITY_MODE ??= makeToggleSetting(
            'CASE INSENSITIVITY MODE',
            'CASE INSENSITIVITY MODE',
            'is_case_insensitive',
            this,
        );
    }

    public get SETTING_COMPATIBILITY_MODE(): Setting {
        return this._SETTING_COMPATIBILITY_MODE ??= makeToggleSetting(
            'COMPATIBILITY MODE',
            'COMPATIBILITY MODE',
            'externals.compat',
            this,
            () => { this.updateState(); }
        );
    }

    public get SETTING_SAFE_MODE(): Setting {
        return this._SETTING_SAFE_MODE ??= makeToggleSetting(
            'SAFE MODE',
            'SAFE MODE',
            'externals.safe',
            this
        );
    }

    public get SETTING_SAFE_CASE_SENSITIVE_MODE(): Setting {
        return this._SETTING_SAFE_CASE_SENSITIVE_MODE ??= makeToggleSetting(
            'SAFE CASE-SENSITIVE MODE',
            'SAFE CASE-SENSITIVE MODE',
            'externals.safe_case',
            this
        );
    }

    public get SETTING_SILENCING_MODE(): Setting {
        return this._SETTING_SILENCING_MODE ??= makeToggleSetting(
            'SILENCING',
            'SILENCING',
            'externals.silencing',
            this
        );
    }

    updateState(): void {
        //!TODO: AFTER REFACTORING COMPAT MODULE, IMPLEMENT THIS FUNCTION PROPERLY. MUST DO. DO NOT UPDATE WITHOUT THIS FEATURE.
    }

    updateErrors(): void {
        //!TODO: IMPLEMENT DEBUG BEFORE RELEASE. MUST DO. DO NOT UPDATE WITHOUT THIS FEATURE.
    }

    updateDisplays(): void {
        this.updateState();
        this.updateErrors();
    }
}
