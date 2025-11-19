import { IUnitadeTab } from "@settings/tabs/tab";

export async function loadSettingsTab(
    id: string
): Promise<IUnitadeTab> {
    const module = await import(`../${id}`);

    return new module.default();
}
