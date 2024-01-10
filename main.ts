import { App, FileSystemAdapter, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import * as fs from 'fs';
import * as path from 'path';

interface UnitadeSettings {
  extensions: string;
}

const DEFAULT_SETTINGS: UnitadeSettings = {
  extensions: 'txt',
};

const CONFLICTING_PLUGINS = ['txt-as-md-obsidian', 'ini-obsidian'];

export default class UnitadePlugin extends Plugin {
  settings: UnitadeSettings = DEFAULT_SETTINGS;

  async onload() {
    // Load the saved settings when the plugin is loaded.
    await this.loadSettings();

    this.checkConflicts(undefined);

    this.addSettingTab(new UnitadeSettingsTab(this.app, this));
    this.registerOnLoadExtensions();
  }

  checkConflicts(additional_message: string | undefined) {
    const pluginsFolder = path.join(this.app.vault.configDir, 'plugins');

    if(additional_message == undefined)
      additional_message = '';

    const basePath = (this.app.vault.adapter as FileSystemAdapter).getBasePath();

    fs.readdir(path.join(basePath, pluginsFolder), (err, folders) => {
      if (err) {
        console.error('Error reading plugins folder:', err);
        return;
      }

      const conflict = folders.filter((folder) => CONFLICTING_PLUGINS.includes(folder));

      if(conflict.length > 0) {
        console.warn('Conflicting plugin folders detected:', conflict);
        new Notice(`Conflicting plugins detected: ${conflict.join(', ')}\n${additional_message}`);
      }
      else
        console.log('No conflicting plugin folders found.');
    });
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    // Save the current settings back to Obsidian's data store.
    await this.saveData(this.settings);
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
    new Setting(containerEl)
          .setName('Force-update extensions')
          .setDesc('If you changed extensions array, this plugins will reregister extensions in vault, can cause exceptions, so its recommended to reload vault or plugin instead of this option.')
          .addButton((bt) =>
            bt
              .setButtonText('Update extensions')
              .onClick(() => {
                this.plugin.registerOnLoadExtensions();
              })
          );
  }
}
