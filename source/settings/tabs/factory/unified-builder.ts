import UnitadePlugin from "@main";
import { ISettings } from "@settings/defaults_interface";
import { IUnitadeTabBuilder } from "@settings-factory/builder";
import { NestedKey } from "@settings/utils/types/nested_key";
import { setDeep } from "@settings/utils/functions/deep";
import { NestedSetting } from "@settings/utils/types/nested_setting";
import { extractComponent } from "@settings/utils/functions/parsers";
import { TextAreaComponent } from "obsidian";

/**
 * @description
 * Unified base class for all tab builders providing common functionality:
 * - plugin and container element access
 * - default/error state management
 * - unified visibility control via setVisibility
 * - centralized settings update via updateSetting
 * 
 * @implements {IUnitadeTabBuilder}
 */
export default abstract class UnitadeUnifiedTabBuilder implements IUnitadeTabBuilder {
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

    protected _plugin!: UnitadePlugin;
    protected _containerEl!: HTMLElement;

    public get plugin() {
        return this._plugin;
    }

    public get containerEl() {
        return this._containerEl;
    }

    constructor(containerEl: HTMLElement, plugin: UnitadePlugin) {
        this._plugin = plugin;
        this._containerEl = containerEl;
    }

    /**
     * Unified method to show/hide a setting or component 
     * and all its children, addons.
     * @param {NestedSetting} target 
     * Nested setting (setting or component) to toggle visibility
     * @param {boolean} visible 
     * Whether to show or hide the element
     */
    protected setVisibility(target: NestedSetting, visible: boolean): void {
        const parent = extractComponent(target);

        if (!parent) {
            //!TODO: IMPLEMENT DEBUG BEFORE RELEASE. MUST DO. DO NOT UPDATE WITHOUT THIS FEATURE.
            return;
        }

        parent.style.display = visible ? 'flex' : 'none';

        /** 
         * All addons have data-variant attribute by their
         * method of creation, so we can easily select them.
         */
        const addons = parent.querySelectorAll('[data-variant]');

        addons.forEach((block) => {
            (block as HTMLElement).style.display = visible ? 'flex' : 'none';
        });
    }

    /**
     * Abstract way to update settings by creating "next" instance of settings,
     * centralises the pattern of updating plugin settings and is reusable for other settings.
     * @param {NestedKey<ISettings>} key 
     * A key/setting which is updated, taken from settings nested key-path type
     * @param {any} value 
     * Correspondive value of updated setting
     */
    async updateSetting(key: NestedKey<ISettings>, value: any): Promise<void> {
        const next = structuredClone(this.plugin.settings) as ISettings;

        setDeep(next, key, value);

        await this.plugin.uptSettings(next);
    }

    /**
     * Used to update state of current tab.
     * @abstract
     * @inheritdoc
     */
    abstract updateState(): void;

    /**
     * Updates text input depending on stability value of it's
     * configuration.
     * @param {TextAreaComponent} input
     * Text input component state of which must be updated
     * @param {boolean} stable
     * Stability value of given configuration
     */
    protected updateStateInput(input: TextAreaComponent, stable: boolean): void {
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

    /**
     * Used to update errors of current tab.
     * @abstract
     * @inheritdoc
     */
    abstract updateErrors(): void;

    /**
     * Used to update visuals and display of specified
     * settings of current tab.
     * @abstract
     * @inheritdoc
     */
    abstract updateDisplays(): void;
}
