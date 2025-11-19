import { Setting } from "obsidian";
import { IUnitadeTabBuilder } from "@settings/tabs/factory/builder";

export function makeSetting(
    name: string,
    desc: string,
    builder: IUnitadeTabBuilder,
): Setting {
    const setting = new Setting(builder.containerEl)
        .setName(name)
        .setDesc(desc)

    return setting;
}
