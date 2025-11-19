import { TextAreaComponent } from "obsidian";
import { NestedKey } from "@settings/utils/types/nested_key";
import { ISettings } from "@settings/defaults_interface";
import { IUnitadeTabBuilder } from "@settings/tabs/factory/builder";
import { getDeep } from "@settings/utils/functions/deep";
import { debounce } from "@settings/utils/functions/debounce";

export function makeInputText<P extends NestedKey<ISettings>>(
    path: P,
    placeholder: string,
    builder: IUnitadeTabBuilder,
    validator?: (value: string) => { stable: boolean; error?: string | null },
): TextAreaComponent {
    const currentVal = getDeep(builder.plugin.settings, path) ?? '';
    const debounceMs = builder.plugin.settings.developer.input_debouncing;

    const applyChange = debounce(async (raw: string) => {
        const value = raw.trimEnd();

        const result = validator
            ? validator(value)
            : { stable: true, error: null };

        if (result.error) builder.plugin.settings.ERRORS[path] = result.error
        else delete builder.plugin.settings.ERRORS[path];

        if (builder.updateState) builder.updateState();
        if (builder.updateErrors) builder.updateErrors();

        await builder.updateSetting(path, value);
    }, debounceMs);

    const input = new TextAreaComponent(builder.containerEl)
        .setPlaceholder(placeholder)
        .setValue(String(currentVal))
        .onChange(value => {
            applyChange(value);
        })

    return input;
}
