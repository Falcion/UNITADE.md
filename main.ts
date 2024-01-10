import { App, FileSystemAdapter, Notice, Plugin, PluginSettingTab, Setting, TextFileView, WorkspaceLeaf } from 'obsidian';
import * as fs from 'fs';
import * as path from 'path';

import './styles.scss';

import './lib/codemirror'

// thanks cm-editor-syntax-highlight-obsidian for this import
//#region Importing CodeMirrors
import './lib/codemirror'
import './mode/meta'
import './mode/apl/apl'
import './mode/asciiarmor/asciiarmor'
import './mode/asn.1/asn.1'
import './mode/asterisk/asterisk'
import './mode/brainfuck/brainfuck'
import './mode/clike/clike'
import './mode/clojure/clojure'
import './mode/cmake/cmake'
import './mode/cobol/cobol'
import './mode/coffeescript/coffeescript'
import './mode/commonlisp/commonlisp'
import './mode/crystal/crystal'
import './mode/css/css'
import './mode/cypher/cypher'
import './mode/d/d'
import './mode/dart/dart'
import './mode/diff/diff'
import './mode/django/django'
import './mode/dockerfile/dockerfile'
import './mode/dtd/dtd'
import './mode/dylan/dylan'
import './mode/ebnf/ebnf'
import './mode/ecl/ecl'
import './mode/eiffel/eiffel'
import './mode/elixir/elixir'
import './mode/elm/elm'
import './mode/erlang/erlang'
import './mode/factor/factor'
import './mode/fcl/fcl'
import './mode/forth/forth'
import './mode/fortran/fortran'
import './mode/gas/gas'
// import './mode/gfm/gfm' // Error: '__moduleExports' is not exported by mode\meta.js, imported by .obsidian/plugins/cm-editor-snytax-highlight-obsidian/mode/meta.js?commonjs-proxy
import './mode/gherkin/gherkin'
import './mode/go/go'
import './mode/groovy/groovy'
import './mode/haml/haml'
import './mode/handlebars/handlebars'
import './mode/haskell/haskell'
import './mode/haskell-literate/haskell-literate'
import './mode/haxe/haxe'
import './mode/htmlembedded/htmlembedded'
import './mode/htmlmixed/htmlmixed'
import './mode/http/http'
import './mode/idl/idl'
import './mode/javascript/javascript'
import './mode/jinja2/jinja2'
import './mode/jsx/jsx'
import './mode/julia/julia'
import './mode/livescript/livescript'
import './mode/lua/lua'
// import './mode/markdown/markdown' // Error: '__moduleExports' is not exported by mode\meta.js, imported by .obsidian/plugins/cm-editor-snytax-highlight-obsidian/mode/meta.js?commonjs-proxy
import './mode/mathematica/mathematica'
import './mode/mbox/mbox'
import './mode/mirc/mirc'
import './mode/mllike/mllike'
import './mode/modelica/modelica'
import './mode/mscgen/mscgen'
import './mode/mumps/mumps'
import './mode/nginx/nginx'
import './mode/nsis/nsis'
import './mode/ntriples/ntriples'
import './mode/octave/octave'
import './mode/oz/oz'
import './mode/pascal/pascal'
import './mode/pegjs/pegjs'
import './mode/perl/perl'
import './mode/php/php'
import './mode/pig/pig'
import './mode/powershell/powershell'
import './mode/properties/properties'
import './mode/protobuf/protobuf'
import './mode/pug/pug'
import './mode/puppet/puppet'
import './mode/python/python'
import './mode/q/q'
import './mode/r/r'
import './mode/rpm/rpm'
import './mode/rst/rst'
import './mode/ruby/ruby'
import './mode/rust/rust'
import './mode/sas/sas'
import './mode/sass/sass'
import './mode/scheme/scheme'
import './mode/shell/shell'
import './mode/sieve/sieve'
import './mode/slim/slim'
import './mode/smalltalk/smalltalk'
import './mode/smarty/smarty'
import './mode/solr/solr'
import './mode/soy/soy'
import './mode/sparql/sparql'
import './mode/spreadsheet/spreadsheet'
import './mode/sql/sql'
import './mode/stex/stex'
import './mode/stylus/stylus'
import './mode/swift/swift'
import './mode/tcl/tcl'
import './mode/textile/textile'
import './mode/tiddlywiki/tiddlywiki'
import './mode/tiki/tiki'
import './mode/toml/toml'
import './mode/tornado/tornado'
import './mode/troff/troff'
import './mode/ttcn/ttcn'
import './mode/ttcn-cfg/ttcn-cfg'
import './mode/turtle/turtle'
import './mode/twig/twig'
import './mode/vb/vb'
import './mode/vbscript/vbscript'
import './mode/velocity/velocity'
import './mode/verilog/verilog'
import './mode/vhdl/vhdl'
import './mode/vue/vue'
import './mode/wast/wast'
import './mode/webidl/webidl'
import './mode/xml/xml'
import './mode/xquery/xquery'
import './mode/yacas/yacas'
import './mode/yaml/yaml'
import './mode/yaml-frontmatter/yaml-frontmatter'
import './mode/z80/z80'
//#endregion

interface UnitadeSettings {
  extensions: string;
  is_forced_on: boolean;
  is_dynamic_on: boolean,
  force_extensions: string;
}

const DEFAULT_SETTINGS: UnitadeSettings = {
  extensions: 'txt',
  is_forced_on: false,
  is_dynamic_on: true,
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

    this.app.vault.on('create', (file) => {
      if(!this.settings.is_dynamic_on)
        // If user turned off dynamic registry, don't "think"
        return;

      if(!file.path.includes('.'))
        /* We are using file.path because path and name are equal.
           IDK why. */
        return;

      const ext = file.name.split('.')[1];

      if(ext == 'md')
        return;

      this.dynamicExtensionRegister(ext);

      if(this.settings.extensions == '' || this.settings.force_extensions == ' ')
        this.settings.extensions = ext;
      else
        this.settings.extensions += `, ${ext}`;

      this.saveSettings();

      console.log('UNITADE: Added registered extension: ' + ext + ' by file: ' + file.path);
    });

    this.checkConflicts(undefined);

    this.addSettingTab(new UnitadeSettingsTab(this.app, this));
    this.registerOnLoadViews();
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

  dynamicExtensionRegister(extension: string) {
    this.registerExtensions([extension], "markdown");
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
      .setDesc('Enter file extensions to interact with in Obsidian, separated by commas.')
      .addText((text) =>
        text
          .setValue(this.plugin.settings.extensions)
          .onChange(async (value) => {
            this.plugin.settings.extensions = value;
            await this.plugin.saveSettings();
          })
    );
    new Setting(containerEl)
    .setName('Force-update plugin')
    .setDesc('If you changed extensions array or any related on-load parameter, this plugin will imitate on-load process, can cause ERRORS, so its recommended to reload vault instead of this option.')
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
    new Setting(containerEl)
      .setName('Enable dynamic registry?')
      .setDesc('Enable to registry and add to the setting new extension via creating/importing file with custom one.')
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.is_dynamic_on)
          .onChange(async (value) => {
            this.plugin.settings.is_dynamic_on = value;
            await this.plugin.saveSettings();
          })
    );
  }
}

/// customized code from ini-obsidian by @deathau

class CustomView extends TextFileView {
  codeMirror: CodeMirror.Editor;

  FileExtension: string = "";

  public ContentEl(): HTMLElement {
    return this.contentEl;
  }

  constructor(leaf: WorkspaceLeaf, extension: string) {
    super(leaf);

    this.FileExtension = extension;

    // create code mirror instance
    // @ts-ignore-error
    this.codeMirror = CodeMirror(this.ContentEl, {
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
      this.codeMirror.swapDoc(CodeMirror.Doc(data, `text/x-${this.FileExtension}`))
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
