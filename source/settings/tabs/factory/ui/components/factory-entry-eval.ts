import { TextAreaComponent } from "obsidian";
import { NestedKey } from "@settings/utils/types/nested_key";
import { ISettings } from "@settings/defaults_interface";
import { IUnitadeTabBuilder } from "@settings-factory/builder";
import { getDeep } from "@settings/utils/functions/deep";
import { debounce } from "@settings/utils/functions/debounce";

export function makeEntryEval<P extends NestedKey<ISettings>, T>(
    path: P,
    placeholder: string,
    builder: IUnitadeTabBuilder,
    cssStyle: boolean = true,
    converter: (value: string) => { res: T, err?: Error },
    onChangeExtra?: (value: string) => void | Promise<void>
): TextAreaComponent {
    const currentVal = getDeep(builder.plugin.settings, path) ?? {};
    const debounceMs = builder.plugin.settings.developer.input_debouncing;

    const applyChange = debounce(async (raw: string) => {
        const value = raw.trimEnd();

        const { res: result, err: error }: { res: T, err?: object } = converter(value);

        if (error) builder.plugin.settings.ERRORS[path] = 'Invalid format: error in attempt to convert.';
        else delete builder.plugin.settings.ERRORS[path];

        if (builder.updateState) builder.updateState();
        if (builder.updateErrors) builder.updateErrors();

        await builder.updateSetting(path, result);
    }, debounceMs);

    const input = new TextAreaComponent(builder.containerEl)
        .setPlaceholder(placeholder)
        .setValue(String(currentVal))
        .onChange(value => {
            applyChange(value);

            if (onChangeExtra)
                onChangeExtra(value);
        });

    if (cssStyle) input.inputEl.addClass('unitade-input');

    return input;
}
