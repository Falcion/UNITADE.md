import { ISettings } from "@settings/defaults_interface";
import { IUnitadeTabBuilder } from "@settings-factory/builder";
import { getDeep } from "@settings/utils/functions/deep";
import { NestedKey } from "@settings/utils/types/nested_key";
import { Setting } from "obsidian";

export function makeDropdownSetting(
    name: string,
    desc: string,
    key: NestedKey<ISettings>,
    builder: IUnitadeTabBuilder,
    options: Record<string, string>,
    onChangeExtra?: (value: string) => void | Promise<void>
): Setting {
    const setting = new Setting(builder.containerEl)
        .setName(name)
        .setDesc(desc)
        .addDropdown((dropdown) => {
            const curr = String(getDeep(builder.plugin.settings, key));

            dropdown
                .setValue(curr)
                .addOptions(options)
                .onChange(async (value) => {
                    await builder.updateSetting(key, value);

                    if (onChangeExtra)
                        await onChangeExtra(value);
                });

            return dropdown;
        });

    return setting;
}
