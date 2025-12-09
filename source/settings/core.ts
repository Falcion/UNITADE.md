import { App, PluginSettingTab, setIcon } from "obsidian";

import UnitadePlugin from "@main";
import { SETTINGS_TABS } from "@settings/tabs";
import { loadSettingsTab } from "@settings/utils/loader";

export class UnitadeSettingsTab extends PluginSettingTab {
    public plugin!: UnitadePlugin;
    public activeTab: string = 'tab-generic';

    constructor(app: App, plugin: UnitadePlugin) {
        super(app, plugin);

        this.plugin = plugin;
    }

    async display(): Promise<void> {
        const { containerEl } = this;

        containerEl.empty();

        const tabsEl = containerEl.createEl('div', {
            'cls': 'unitade-settings-tabs'
        });

        SETTINGS_TABS.forEach(tab => {
            const tabButton = tabsEl.createEl('div', {
                cls: `unitade-settings-tab ${this.activeTab === tab.id ? 'active' : ''}`
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

        const container = containerEl.createEl('div', {
            cls: 'unitade-settings-content'
        });

        const loadedTab = await loadSettingsTab(this.activeTab, container);

        loadedTab.display(this.plugin);
        //TODO: debugging on categories (addEventListener typedef)
    }
}
