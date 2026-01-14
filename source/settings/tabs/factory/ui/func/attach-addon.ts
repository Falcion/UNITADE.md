import { NestedSetting } from "@settings/utils/types/nested_setting";
import { Setting, TextAreaComponent } from "obsidian";
import { makeAddonBlock } from "@settings-ui/factory-addon";

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
export default function attachAddon(target: NestedSetting, type: string, text: string): void {
    const block = makeAddonBlock(text, type);

    if (target instanceof Setting) {
        target.infoEl.appendChild(block);
    } else if (target instanceof TextAreaComponent) {
        //? Using container of text area component as nearest DOM
        target.inputEl.parentElement?.appendChild(block);
    }
}
