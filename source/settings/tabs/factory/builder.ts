import UnitadePlugin from "@root/main";
import { ISettings } from "@settings/defaults_interface";
import { Addons } from "@settings/utils/types/addons";
import { NestedKey } from "@settings/utils/types/nested_key";
import { NestedSetting } from "@settings/utils/types/nested_setting";

export interface IUnitadeTabBuilder {
    defaults?: {
        color: string
        borderColor: string
        borderWidth: string
    };

    plugin: UnitadePlugin;
    containerEl: HTMLElement;

    /**
     * Used to append child of addon-setting block on other settings as additional
     * context or information for specified setting.
     * @param target
     * Target on which current addon-setting block will be assigned/appended
     * @param type
     * Type of addon-setting block
     * @param text
     * Message of addon-setting block
     * @abstract
     */
    attachAddon(target: NestedSetting, type: Addons, text: string): void;

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
