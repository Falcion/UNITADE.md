import { getThemeObsidian } from "@settings/utils/functions/themes";

export function makeAddonBlock(
    text: string,
    type: string,
): HTMLElement {
    const div = document.createElement("div");

    div.addClasses([
        `unitade-addition-text`,
        `unitade-${type}`]);
    div.setAttribute('data-variant', getThemeObsidian());

    div.innerHTML = text;

    return div;
}
