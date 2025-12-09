import { IUnitadeTab } from "@settings/tabs/tab";

export type TabFactory = () => Promise<{
    default: new (containerEl: HTMLElement) => IUnitadeTab
}>
