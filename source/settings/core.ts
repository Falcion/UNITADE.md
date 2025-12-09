import { App, PluginSettingTab, setIcon } from "obsidian";

import UnitadePlugin from "@main";
import { SETTINGS_TABS } from "@settings/tabs";
import { loadSettingsTab } from "@settings/utils/loader";

export class UnitadeSettingsTab extends PluginSettingTab {
    public plugin!: UnitadePlugin;
    public activeTab: string = 'generic';

    constructor(app: App, plugin: UnitadePlugin) {
        super(app, plugin);
    }

    async display(): Promise<void> {
        const { containerEl } = this;

        containerEl.empty();

        const tabsEl = containerEl.createEl('div', {
            'cls': 'unitade-settings-tabs'
        });

        SETTINGS_TABS.forEach(tab => {
            const tabButton = tabsEl.createEl('div', {
                cls: `unitade-settings-tabs ${this.activeTab === tab.id ? 'active' : ''}`
            });

            setIcon(tabButton, tab.icon);

            //TODO: implement using new localization module (WIP)
            tabButton.createEl('span', { text: tab.name });
            tabButton.addEventListener('click', async () => {
                this.activeTab = tab.id;
                this.display();

                //TODO: debug clicking on categories
            });
        });

        const loadedTab = await loadSettingsTab(this.activeTab);

        loadedTab.display(containerEl, this.plugin);
        //TODO: debugging on categories (addEventListener typedef)
    }
}
