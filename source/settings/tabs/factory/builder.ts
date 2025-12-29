import UnitadePlugin from "@main";
import { ISettings } from "@settings/defaults_interface";
import { NestedKey } from "@settings/utils/types/nested_key";

export interface IUnitadeTabBuilder {
    defaults?: {
        color: string
        borderColor: string
        borderWidth: string
    };

    plugin: UnitadePlugin;
    containerEl: HTMLElement;

    /**
     * Used to update state of current tab.
     * @abstract
     */
    updateState(): void;
    /** 
     * Used to update errors of current tab.
     * @abstract
    */
    updateErrors(): void;
    /**
     * Used to update visuals and display of specified
     * settings of current tab.
     * @abstract
     */
    updateDisplays(): void;
    /**
     * Abstract way to update settings by creating "next" instance of settings,
     * centralises the pattern of updating plugin settings and is reusable for other settings.
     * @param key
     * A key/setting which is updated
     * @param value 
     * Correspondive value of updated setting
     * @abstract
     */
    updateSetting(key: NestedKey<ISettings>, value: any): Promise<void>;
}
