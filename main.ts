import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface UnitadeSettings {
  extensions: string;
}

const DEFAULT_SETTINGS: UnitadeSettings = {
  extensions: 'txt',
};

export default class UnitadePlugin extends Plugin {
  settings: UnitadeSettings = DEFAULT_SETTINGS;

  async onload() {
    // Load the saved settings when the plugin is loaded.
    await this.loadSettings();

    this.addSettingTab(new UnitadeSettingsTab(this.app, this));
    this.registerOnLoadExtensions();
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    // Save the current settings back to Obsidian's data store.
    await this.saveData(this.settings);

    // Re-register extensions with the updated settings.
    this.registerOnLoadExtensions();
  }

  registerOnLoadExtensions() {
    const extensions = this.settings.extensions
      .split(',')
      .map((ext) => ext.trim())
      .filter((ext) => ext !== '');

    this.registerExtensions(extensions, "markdown");
  }
}

class UnitadeSettingsTab extends PluginSettingTab {
  plugin: UnitadePlugin;

  constructor(app: App, plugin: UnitadePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();
    
    new Setting(containerEl)
      .setName('Extensions')
      .setDesc('Enter file extensions to be treated as Markdown, separated by commas.')
      .addText((text) =>
        text
          .setValue(this.plugin.settings.extensions)
          .onChange(async (value) => {
            // Update the plugin's settings when the user makes changes.
            this.plugin.settings.extensions = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
