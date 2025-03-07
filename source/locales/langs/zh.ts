/*
 * MIT License
 *
 * Copyright (c) 2023-2024 Falcion
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 * Any code and/or API associated with OBSIDIAN behaves as stated in their distribution policy.
 */

/**
 * JSON for translation of
 * `zh: "简体中文"`
 */
export const LOCALES_ZH = {
    "UNITADE_SETTINGS_COMMON": {
        "0": "UNITADE's settings:",
        "1": "Errors:",
        "2": "Advanced block",
        "3": "Code editor block",
        "4": "Additionals"
    },
    "SETTINGS_EXTENSIONS": {
        "0": "Extensions:",
        "1": "Enter the file extensions that should be registered with the vault and with which the application should start registering (taking into account): input must be separated by \"greater-than sign\" ('>').",
        "2": "Be careful with typing extensions in this block, it may start to \"spam\" errors and notifications: to avoid this, you can turn on silencing errors feature in additionals block of settings."
    },
    "SETTINGS_MOBILE_SPECIFIC": {
        "0": "Mobile-specific:",
        "1": "Both this module's extensions and default specific extensions (if mobile settings are not set up) will be used on mobile devices if this mode is enabled."
    },
    "SETTINGS_MD_OVERRIDE": {
        "0": "Enable markdown override:",
        "1": "If enabled, on plugin's initialization, disables markdown from OBSIDIAN's registry."
    },
    "SETTINGS_HARD_DELETE": {
        "0": "Hard-delete registry",
        "1": "On click, causes full hot-deletion of entire registry of extensions, every extension which Obsidian could read will be deleted. Use with caution or for debug."
    },
    "SETTINGS_HARD_LOAD": {
        "0": "Hard-load plugin's registry",
        "1": "On click, causes imitation of enabling plugin, meaning, reloading registries which are defined and set up within plugin's settings."
    },
    "SETTINGS_FORCED_EXTENSIONS": {
        "0": "Forced-view extensions:",
        "1": "Entered extensions, would be tried to be initialized through codemirror setup of editors enabling extension's view in OBSIDIAN app.",
        "2": "This functionality is in semi-demo because of OBSIDIAN's API unsupport for such features, it is more unstable on mobile devices."
    },
    "SETTINGS_ONLOAD_REGISTRY": {
        "0": "On-load extension registry:",
        "1": "If enabled, plugin will now registry every file's extension (this setting: last part of extensions sequence) when OBSIDIAN catches event of new file appearing in vault.",
        "2": "This mode is interchangeable (that is, disabled) when an unsafe on-load registry is enabled."
    },
    "SETTINGS_ONLOAD_UNSAFE": {
        "0": "On-load unsafe extension registry:",
        "1": "If enabled, plugin will now registry every file's extension (this setting: every part of extensions sequence) when OBSIDIAN catches event of new file appearing in vault.",
        "2": "This mode is interchangeable (that is, disabled) when a normal on-load registry is enabled."
    },
    "SETTINGS_WARNING_MSG": {
        "0": "ATTENTION: this setting can cause a “spam attack” with extensions in the OBSIDIAN extension registry and damage some files due to the editing format of the application itself, be careful when using this functionality."
    },
    "SETTINGS_IGNORE_MODE": {
        "0": "Ignore mode:",
        "1": "If enabled, plugin now would ignore specified type extensions by user input and files by regular expressions."
    },
    "SETTINGS_IGNORE_EXTENSIONS": {
        "0": "Ignore extensions:",
        "1": "Enter the file extensions that should be ignored by plugin before add to registry by on-load registry."
    },
    "SETTINGS_IGNORE_FILES": {
        "0": "Ignore files (regular expressions):",
        "1": "Enter the file masks (regular expressions) by which files should be ignored by plugin."
    },
    "SETTINGS_IGNORE_MSG": {
        "0": "This settings works only for on-load registry functionality: meaning that ignoring extensions and files only works with only that functionality when the files are added to the vault."
    },
    "SETTINGS_GROUP_EXTENSIONS": {
        "0": "Grouped extensions:",
        "1": "Enter by specified syntax extensions which you want to treat as other custom extensions (groups are separated by (';') semicolons while values are separated by ('>') symbols).",
        "2": "For list of views view the docs of the plugin, more information on the wiki."
    },
    "SETTINGS_GROUP_MSG": {
        "0": "Keep in mind, this setting is unstable due entire infrastructure of plugin and OBSIDIAN's API, it is recommended to turn off every other setting and clear them if possible before using this module: you can setup every other module just in this block."
    },
    "SETTINGS_BAREFILES": {
        "0": "Barefiles on-load registry:",
        "1": "If enabled, plugin will try to register files without extensions (so-called bare files): for files with only extension (so-called dot files) use on-load extension registry.",
        "2": "This settings registries empty extension, which could be done manually within extension settings block."
    },
    "MODALS_INCLUDE_REGISTRY": {
        "0": "Include in extensions registry:",
        "1": "If enabled, generated file's extension would be inserted in extensions array."
    },
    "SETTINGS_FORCE_UNLOAD": {
        "0": "Force-unload",
        "1": "On click, causes imitation of disabling plugin, meaning, reloading registry of extensions in vault to default mode."
    },
    "SETTINGS_RELOAD_REGISTRIES": {
        "0": "Reload registries",
        "1": "Reloads views and registries extensions providing new settings and data to the app and keeping experience up-to-date with config."
    },
    "SETTINGS_DEBUG_MODE": {
        "0": "Debug mode:",
        "1": "This mode starts output in application's console about actions you do.",
        "2": "Do not use this mode if you are not developer or familliar with console."
    },
    "SETTINGS_SILENCE_ERRORS": {
        "0": "Silence errors:",
        "1": "This mode silences every error and disables notifications: could help in case of error spamming."
    },
    "MODAL_EDIT_EXTENSION": {
        "0": "Edit extension"
    },
    "MODAL_CREATE_WITH_EXTENSION": {
        "0": "Create with extension"
    },
    "MODAL_EDIT_MULTIPLE": {
        "0": "Edit multiple extensions",
        "1": "Rename multiple files"
    },
    "SETTINGS_COMPATIBILITY": {
        "0": "Compatibility module:",
        "1": "If turned on, plugin on it's start would try to parse configs of it's past versions to new config with old data: may be unstable, turned on by default."
    },
    "SETTINGS_COMPATIBILITY_BUTTON": {
        "0": "Make config compatible",
        "1": "Upon click, plugin would try to make config compatible with it's new functionality and config iteration."
    },
    "BUTTON_WIKI": {
        "0": "Open plugin's wiki",
        "1": "Upon click, redirects to the GitHub's wiki page of project which contains documentation about entire plugin.",
        "2": "This would redirect you in external link. Internet access required.",
        "3": "Open wiki"
    },
    "MODAL_INCLUDE_IN_REGISTRY": {
        "0": "Include in extensions registry:",
        "1": "If enabled, generated file's extension would be inserted in extensions array."
    },
    "ERROR_REGISTRY_EXTENSION": {
        "0": "Could not register extension: {0} to view as {1}.\nIt's already registered.",
        "1": "Could not register extension: {0} to view as {1}.\n{2}",
        "2": "Couldn't unregistry extension: {0}.",
        "3": "Error with registering extensions:"
    },
    "ERROR_COMMON_MESSAGE": {
        "0": "Error from UNITADE plugin:"
    },
    "SETTINGS_CASE_INSENSITIVE": {
        "0": "Case insensitive mode:",
        "1": "If turned on, plugin would registry every upper and lower case variations of extension to provide Windows-like experience for extension.",
        "2": "Unstable on UNIX-systems.",
        "3": "CAUTION: this mode can potentially \"infinitly\" crash your Vault if you got too many extensions and/or massive extensions, be extra cautious when using this mode!"
    },
    "MODAL_EDIT_FENCE": {
        "0": "Edit code fence"
    },
    "SETTINGS_CODE_EDITOR": {
        "0": "Enable code editor module:",
        "1": "This mode will enable code editor functionalities like syntax highlighting, IntelliSence and etc.",
        "2": "May cause lags and other issues.",
        "3": "Font settings for code editor:"
    },
    "CODE_EDITOR_USE_DEFAULT": {
        "0": "Use default extensions:",
        "1": "If disabled, code editor module will require to input its own extensions, otherwise, it would use \"simple\" extensions from config.",
        "2": "This block also can be replaced by grouped extensions.",
        "3": "Be aware, this extensions must be excluding from every other, otherwise error with rendering may occure, to \"clone\" extensions, use specified feature."
    },
    "CODE_EDITOR_FOLDING": {
        "0": "Enable folding:",
        "1": "A feature that allows you to hide (collapse) parts of your code to improve readability."
    },
    "CODE_EDITOR_LINE_NUMBERS": {
        "0": "Line numbers:",
        "1": "Feature to display line numbers in the editor."
    },
    "CODE_EDITOR_WORD_WRAPPING": {
        "0": "Word wrapping:",
        "1": "Feature that allows text to automatically wrap to the next line if it exceeds the width of the editor."
    },
    "CODE_EDITOR_MINIMAPPING": {
        "0": "Enable minimapping:",
        "1": "Feature that provides a thumbnail view of the entire document."
    },
    "CODE_EDITOR_SEMANTIC_VALIDATION": {
        "0": "Enable semantic validation:",
        "1": "This process checks the code for logical errors and the correct use of variables, functions, and other elements. Semantic validation takes into account the context and meaning of the code."
    },
    "CODE_EDITOR_SYNTAX_VALIDATION": {
        "0": "Enable syntax validation:",
        "1": "This process checks code for errors related to its structure and syntax. It analyzes whether the code follows the rules of the programming language."
    },
    "CODE_EDITOR_EDIT_THEME": {
        "0": "Editor theme:",
        "1": "Choose specific theme for code editor, visually affects syntax highlighting."
    },
    "CODE_EDITOR_FONT_SIZE": {
        "0": "Font size:"
    },
    "CODE_EDITOR_FONT_FAMILY": {
        "0": "Font family:",
        "1": "Write here existing font families and fonts themselves: input format like in any code editor."
    },
    "CODE_EDITOR_FONT_LIGATURES": {
        "0": "Font ligatures:",
        "1": "If your font supports ligatures, you can turn them on.",
        "2": "If ligatures are not supported by font, this would not work."
    },
    "MODAL_INCLUDE_IN_CODE_EDITOR": {
        "0": "Include in code editor module:",
        "1": "If enabled, created file would be treated with code editor module instead of just default vanilla extensions as markdown system.",
        "2": "If both modes are enabled, it can cause unstable behaviour.",
        "3": "If file is treated with both code editor module and default extensions-as-markdown system it can cause unstable behaviour with rendering system, use both modes if your file is an edge-case.",
        "4": "If code editor module uses default extensions array (with setting \"use default extensions\"), extension would be inserted in default extensions array, otherwise, it would be inserted in code editor extensions array."
    },
    "SAFE_MODE": {
        "0": "Safe mode:",
        "1": "If enabled, the plugin will check if this extension will be damaged when opened via Markdown view.",
        "2": "DISABLE AT YOUR OWN RISK: you will be able to work with all extensions in Markdown representation, but with the risk of damaging files.",
        "3": "Safe-mod is {1}!",
        "4": "Disables defensive tactics for non-text extensions behaviour."
    },
    "STATUS_BAR": {
        "0": "NONE",
        "1": "🛠 Worker: {0} ",
        "2": "exts.: {0}, views: {1} ",
        "3": "col.: {0}, line: {1} ",
        "4": "📋 Render: {0} "
    },
    "UNITADE_SETTINGS_COMMON2": {
        "0": "UI/UX"
    },
    "SETTINGS_STATUS_BAR": {
        "0": "Enable status bar",
        "1": "Upon enabling, allows you not only to see status bar about current instance of file, but also which data to display."
    },
    "SETTINGS_STATUS_BAR_EXTS": {
        "0": "Count registered extensions",
        "1": "Implement counter for registered extensions in statur bar or not."
    },
    "SETTINGS_STATUS_BAR_EXTS_DEFAULT": {
        "0": "Count default extensions",
        "1": "Add to the counter in status bar default extensions (as markdown) to the final sum. If default extensions go to the code editor module, they are not part of the final sum."
    },
    "SETTINGS_STATUS_BAR_EXTS_GROUPED": {
        "0": "Count grouped extensions",
        "1": "Add to the counter in status bar grouped (exclusive) extensions to the final sum. Grouped extensions as markdown or code editor are not included in this sum."
    },
    "SETTINGS_STATUS_BAR_EXTS_CODE_EDITOR": {
        "0": "Count code editor extensions",
        "1": "Add to the counter in the status bar code editor (exclusive) extensions to the final sum. If default as code editor extensions enabled, they are part of this final sum."
    },
    "SETTINGS_STATUS_BAR_VIEWS": {
        "0": "Count views",
        "1": "Enable counter in the status bar which displays amount of registered views in the opened Vault."
    },
    "SETTINGS_STATUS_BAR_PROCESSOR": {
        "0": "Show current processor/worker",
        "1": "Displays language worker (code editor) or registered processor for opened file."
    },
    "SETTINGS_STATUS_BAR_LANGUAGE_MODEL": {
        "0": "Show current language model",
        "1": "Displays current view within which opened file is rendered."
    },
    "SETTINGS_STATUS_BAR_CURSOR_POSITION": {
        "0": "Show cursor position",
        "1": "Displays line and column for text cursor (caret) position in opened file, resets upon opening new files."
    },
    "SETTINGS_RESET_TO_DEFAULTS": {
        "0": "Reset to defaults",
        "1": "Reset settings to their default values.",
        "2": "Reset",
        "3": "Settings won't be saved.",
        "4": "CAUTION: upon clicking, your preferred settings won't be saved in any other way, use with your own risk."
    },
    "COMMAND_TOGGLE_SAFE": {
        "0": "Toggle safe mode"
    },
    "COMMAND_TOGGLE_CASE_INSENSITIVE": {
        "0": "Toggle case insensitive mode"
    },
    "COMMAND_TOGGLE_MD_OVERCHARGE": {
        "0": "Toggle markdown overcharge"
    },
    "COMMAND_ADD_DEFAULT_EXTENSIONS": {
        "0": "Add extensions to the extensions as markdown",
        "1": "Enter your extensions"
    },
    "COMMAND_ADD_CODE_EXTENSIONS": {
        "0": "Add extensions to the extensions as code editor",
        "1": "Enter your extensions"
    },
    "PROMPT_LOCALES": {
        "0": "Input",
        "1": "Submit"
    },
    "SETTINGS_FORCE_VANILLA_PASTE": {
        "0": "Force vanilla paste keybind",
        "1": "In new versions of OBSIDIAN, code editor can paste data only with CTRL+SHIFT+V combination, this setting is created for this versions, returning custom CTRL+V paste function.",
        "2": "CAUTION! This setting needs to be enabled only if default CTRL+V doesn't work."
    }
};
