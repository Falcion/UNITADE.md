import { IUnitadeTab } from "@settings/tabs/tab";
import { SETTINGS_TABS_FACTORIES } from "@settings/tabs_factory";

export async function loadSettingsTab(
    id: string,
    containerEl: HTMLElement
): Promise<IUnitadeTab> {
    const factory = SETTINGS_TABS_FACTORIES[id];

    if (!factory) throw new Error(`Unknown settings tab: ${id}`);

    const module = await factory();

    return new module.default(containerEl);
}
