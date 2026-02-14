import UnitadePlugin from "@main";
import UnitadeUnifiedTabBuilder from "@settings-factory/unified-builder";
import { Setting } from "obsidian";
import { makeToggleSetting } from "@settings-ui/factory-toggle";

export default class UnitadeTabStatusBuilder extends UnitadeUnifiedTabBuilder {
    private _SETTING_STATUS_BAR_ENABLE?: Setting = undefined;
    private _SETTING_STATUS_BAR_REGISTER_EXTENSIONS_ENABLE?: Setting = undefined;
    private _SETTING_STATUS_BAR_REGISTER_EXTENSIONS_MARKDOWN?: Setting = undefined;
    private _SETTING_STATUS_BAR_REGISTER_EXTENSIONS_GROUPED?: Setting = undefined;
    private _SETTING_STATUS_BAR_REGISTER_EXTENSIONS_CODE?: Setting = undefined;
    private _SETTING_STATUS_BAR_REGISTER_VIEWS?: Setting = undefined;
    private _SETTING_STATUS_BAR_CURRENT_PROCESSOR?: Setting = undefined
    private _SETTING_STATUS_BAR_CURRENT_DISPLAY?: Setting = undefined;
    private _SETTING_STATUS_BAR_CURSOR_POSITION?: Setting = undefined;

    constructor(containerEl: HTMLElement, plugin: UnitadePlugin) {
        super(containerEl, plugin);
    }

    public get SETTING_STATUS_BAR_ENABLE(): Setting {
        return this._SETTING_STATUS_BAR_ENABLE ??= makeToggleSetting(
            'ENABLE STATUS BAR',
            'ENABLE STATUS BAR',
            'status_bar.enable',
            this,
            () => { this.updateDisplays(); }
        );
    }

    public get SETTING_STATUS_BAR_REGISTER_EXTENSIONS_ENABLE(): Setting {
        return this._SETTING_STATUS_BAR_REGISTER_EXTENSIONS_ENABLE ??= makeToggleSetting(
            'STATUS BAR: REGISTERED EXTENSIONS',
            'STATUS BAR: REGISTERED EXTENSIONS',
            'status_bar.register_extensions.enable',
            this,
            () => { this.updateDisplays(); }
        );
    }

    public get SETTING_STATUS_BAR_REGISTER_EXTENSIONS_MARKDOWN(): Setting {
        return this._SETTING_STATUS_BAR_REGISTER_EXTENSIONS_MARKDOWN ??= makeToggleSetting(
            'STATUS BAR: REGISTERED EXTENSIONS: MARKDOWN',
            'STATUS BAR: REGISTERED EXTENSIONS: MARKDOWN',
            'status_bar.register_extensions.extensions_markdown',
            this,
        );
    }

    public get SETTING_STATUS_BAR_REGISTER_EXTENSIONS_GROUPED(): Setting {
        return this._SETTING_STATUS_BAR_REGISTER_EXTENSIONS_GROUPED ??= makeToggleSetting(
            'STATUS BAR: REGISTERED EXTENSIONS: GROUPED',
            'STATUS BAR: REGISTERED EXTENSIONS: GROUPED',
            'status_bar.register_extensions.extensions_grouped',
            this,
        );
    }

    public get SETTING_STATUS_BAR_REGISTER_EXTENSIONS_CODE(): Setting {
        return this._SETTING_STATUS_BAR_REGISTER_EXTENSIONS_CODE ??= makeToggleSetting(
            'STATUS BAR: REGISTERED EXTENSIONS: CODE',
            'STATUS BAR: REGISTERED EXTENSIONS: CODE',
            'status_bar.register_extensions.extensions_code',
            this,
        );
    }

    public get SETTING_STATUS_BAR_REGISTER_VIEWS(): Setting {
        return this._SETTING_STATUS_BAR_REGISTER_VIEWS ??= makeToggleSetting(
            'STATUS BAR: REGISTERED VIEWS',
            'STATUS BAR: REGISTERED VIEWS',
            'status_bar.register_views',
            this,
        );
    }

    public get SETTING_STATUS_BAR_CURRENT_PROCESSOR(): Setting {
        return this._SETTING_STATUS_BAR_CURRENT_PROCESSOR ??= makeToggleSetting(
            'STATUS BAR: CURRENT PROCESSOR',
            'STATUS BAR: CURRENT PROCESSOR',
            'status_bar.current_processor',
            this,
        );
    }

    public get SETTING_STATUS_BAR_CURRENT_DISPLAY(): Setting {
        return this._SETTING_STATUS_BAR_CURRENT_DISPLAY ??= makeToggleSetting(
            'STATUS BAR: CURRENT DISPLAY',
            'STATUS BAR: CURRENT DISPLAY',
            'status_bar.current_display',
            this,
        );
    }

    public get SETTING_STATUS_BAR_CURSOR_POSITION(): Setting {
        return this._SETTING_STATUS_BAR_CURSOR_POSITION ??= makeToggleSetting(
            'STATUS BAR: CURSOR POSITION',
            'STATUS BAR: CURSOR POSITION',
            'status_bar.cursor_position',
            this,
        );
    }

    updateState(): void {

    }

    updateErrors(): void {
        //!TODO: IMPLEMENT DEBUG BEFORE RELEASE. MUST DO. DO NOT UPDATE WITHOUT THIS FEATURE.
    }

    updateDisplays(): void {
        this.updateState();
        this.updateErrors();

        const visibility = this.plugin.settings.status_bar.enable;
        const visibilityExtensions = this.plugin.settings.status_bar.register_extensions.enable;

        this.setVisibility(this.SETTING_STATUS_BAR_REGISTER_EXTENSIONS_ENABLE, visibility);
        this.setVisibility(this.SETTING_STATUS_BAR_REGISTER_EXTENSIONS_MARKDOWN, visibility && visibilityExtensions);
        this.setVisibility(this.SETTING_STATUS_BAR_REGISTER_EXTENSIONS_GROUPED, visibility && visibilityExtensions);
        this.setVisibility(this.SETTING_STATUS_BAR_REGISTER_EXTENSIONS_CODE, visibility && visibilityExtensions);
        this.setVisibility(this.SETTING_STATUS_BAR_REGISTER_VIEWS, visibility);
        this.setVisibility(this.SETTING_STATUS_BAR_CURRENT_PROCESSOR, visibility);
        this.setVisibility(this.SETTING_STATUS_BAR_CURRENT_DISPLAY, visibility);
        this.setVisibility(this.SETTING_STATUS_BAR_CURSOR_POSITION, visibility);
    }
}
