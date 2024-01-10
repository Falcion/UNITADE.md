import { App, FileSystemAdapter, Notice, Plugin, PluginSettingTab, Setting, TextFileView, WorkspaceLeaf } from 'obsidian';
import * as fs from 'fs';
import * as path from 'path';

import './styles.scss';

import './lib/codemirror'
import './mode/properties/properties'

interface UnitadeSettings {
  extensions: string;
  is_forced_on: boolean;
  force_extensions: string;
}

const DEFAULT_SETTINGS: UnitadeSettings = {
  extensions: 'txt',
  is_forced_on: false,
  force_extensions: ''
};

const CONFLICTING_PLUGINS = ['txt-as-md-obsidian', 'ini-obsidian'];

export default class UnitadePlugin extends Plugin {
  settings: UnitadeSettings = DEFAULT_SETTINGS;

  forceOpenEnabled: boolean | undefined;
  forceOpenExtensions: string[] | undefined;
  async onload() {
    super.onload();

    // Load the saved settings when the plugin is loaded.
    await this.loadSettings();

    this.checkConflicts(undefined);

    this.addSettingTab(new UnitadeSettingsTab(this.app, this));
    this.registerOnLoadExtensions();
    this.registerOnLoadViews();
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

  registerOnLoadViews() {
    if(this.settings.is_forced_on) {
      const forced_extensions = this.settings.force_extensions
      .split(',')
      .map((ext) => ext.trim())
      .filter((ext) => ext !== '');

      forced_extensions.forEach(ext => {
        this.registerView(ext, (leaf: WorkspaceLeaf) => {
          return new CustomView(leaf, ext);
        });
      });
    }
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
          .setName('Force-update plugin')
          .setDesc('If you changed extensions array or any related on-load parameter, this plugin will imitate on-load process, can cause exceptions, so its recommended to reload vault instead of this option.')
          .addButton((bt) =>
            bt
              .setButtonText('Update extensions')
              .onClick(() => {
                this.plugin.registerOnLoadExtensions();
                this.plugin.registerOnLoadViews();
              })
          );
          new Setting(containerEl)
          .setName('Force-Open Files in Obsidian?')
          .setDesc('Enable to force-open specified file extensions in Obsidian, if it is false, extensions will be opened with default editing software assigned to this extension or by themselves.')
          .addToggle((toggle) =>
            toggle
              .setValue(this.plugin.settings.is_forced_on)
              .onChange(async (value) => {
                this.plugin.settings.is_forced_on = value;
                await this.plugin.saveSettings();
              })
          );

        new Setting(containerEl)
          .setName('Force-Open Extensions')
          .setDesc('Enter file extensions to force-open in Obsidian, separated by commas.')
          .addText((text) =>
            text
              .setValue(this.plugin.settings.force_extensions)
              .onChange(async (value) => {
                this.plugin.settings.force_extensions = value;
                await this.plugin.saveSettings();
              })
          );
  }
}

/// customized code from ini-obsidian by @deathau

class CustomView extends TextFileView {
  codeMirror: CodeMirror.Editor;

  FileExtension: string = "";

  constructor(leaf: WorkspaceLeaf, extension: string) {
    super(leaf);

    this.FileExtension = extension;

    // create code mirror instance
    // @ts-ignore-error
    this.codeMirror = CodeMirror(this.containerEl, {
      theme: "obsidian"
    });
    // register the changes event
    this.codeMirror.on('changes', this.changed);
  }

  // when the view is resized, refresh CodeMirror (thanks Licat!)
  onResize() {
    this.codeMirror.refresh();
  }

  // called on code mirror changes
  changed = async (instance: CodeMirror.Editor, changes: CodeMirror.EditorChange[]) => {
    // request a debounced save in 2 seconds from now
    this.requestSave();
  }

  // get the new file contents
  getViewData = () => {
    return this.codeMirror.getValue();
  }

  // set the file contents
  setViewData = (data: string, clear: boolean) => {
    if (clear) {
      // @ts-ignore-error
      this.codeMirror.swapDoc(CodeMirror.Doc(data, "text/x-ini"))
    }
    else {
      this.codeMirror.setValue(data);
    }
  }

  // clear the view content
  clear = () => {
    this.codeMirror.setValue('');
    this.codeMirror.clearHistory();
  }

  // gets the title of the document
  getDisplayText() {
    if (this.file) return this.file.basename;
    else return "no file";
  }

  // confirms this view can accept ini extension
  canAcceptExtension(extension: string) {
    return extension == this.FileExtension;
  }

  // the view type name
  getViewType() {
    return this.FileExtension;
  }
}
