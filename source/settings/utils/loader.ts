import { IUnitadeTab } from "@settings/tabs/tab";
import { SETTINGS_TABS_FACTORIES } from "@settings/tabs_factory";

export async function loadSettingsTab(
    id: string
): Promise<IUnitadeTab> {
    const module = await import(`../${id}`);

    return new module.default();
}
