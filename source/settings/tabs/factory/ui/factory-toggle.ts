import { Setting } from "obsidian";
import { ISettings } from "@settings/defaults_interface";
import { IUnitadeTabBuilder } from "@settings-factory/builder";
import { getDeep } from "@settings/utils/functions/deep";
import { NestedKey } from "@settings/utils/types/nested_key";

export function makeToggleSetting(
    name: string,
    desc: string,
    key: NestedKey<ISettings>,
    builder: IUnitadeTabBuilder,
    onChangeExtra?: (value: boolean) => void | Promise<void>
): Setting {
    const setting = new Setting(builder.containerEl)
        .setName(name)
        .setDesc(desc)
        .addToggle((toggle) => {
            const curr = Boolean(getDeep(builder.plugin.settings, key));

            toggle
                .setValue(curr)
                .onChange(async (value) => {
                    await builder.updateSetting(key, value);

                    if (onChangeExtra)
                        await onChangeExtra(value);
                });

            return toggle;
        });

    return setting;
}
