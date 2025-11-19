import { Addons } from "@root/settings/utils/types/addons";
import { getThemeObsidian } from "@settings/utils/functions/themes";

export function makeAddonBlock(
    text: string,
    type: Addons
): HTMLElement {
    const div = document.createElement("div");

    div.addClasses([
        "unitade-addition-text",
        `unitade-${type}-${getThemeObsidian()}`
    ]);
    div.innerHTML = text;

    return div;
}
