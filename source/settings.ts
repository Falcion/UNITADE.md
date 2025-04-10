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

import {
    App,
    Setting,
    PluginSettingTab,
    TextAreaComponent,
} from 'obsidian';

import UNITADE_PLUGIN from './main';
import LocalesModule from './locales/core';
import CompatibilityModule from './addons/compatibility';
import CONSTANTS from './utils/constants';
import { getThemeObsidian } from './utils/utils';

export interface UNITADE_SETTINGS {
    markdown_overcharge: boolean,
    extensions: string,
    is_case_insensitive: boolean,
    is_onload: boolean,
    is_onload_unsafe: boolean,
    forced_extensions: string,
    is_ignore: boolean,
    ignore_extensions: string,
    ignore_masks: string,
    is_grouped: boolean,
    grouped_extensions: string,

    mobile_settings: {
        enable: boolean,
        extensions: string,
        stable: boolean,
    },

    barefiling: boolean,

    stable: boolean,
    errors: Record<string, string>,

    debug_mode: boolean,
    silence_errors: boolean,
    manifest_version: string,
    compatibility_module: boolean,
    safe_mode: boolean,

    code_editor_settings: {
        enabled: boolean,
        use_default_extensions: boolean,
        extensions: string,
        folding: boolean,
        line_numbers: boolean,
        word_wrapping: boolean,
        minimapping: boolean,
        validation_semantic: boolean,
        validation_syntax: boolean,
        theme: string,
        force_vanilla_paste: boolean,
        enable_zoom: boolean,
        font_size: number,
        font_family: string,
        font_ligatures: boolean;
    },

    SYS_FONTSIZE_MAX: number,
    SYS_FONTSIZE_MIN: number,

    status_bar: {
        enabled: boolean,
        registered_extensions: {
            enabled: boolean,
            include_extensions: boolean,
            include_extensions_grouped: boolean,
            include_code_editor_extensions: boolean,
        },
        registered_views: boolean,
        current_processor: boolean,
        current_display: boolean,
        cursor_position: boolean,
    },

    advanced_silencing_errors: {
        signatures: string,
        observer_errors: boolean,
        require2_errors: boolean,
    }
}

export const DEFAULT_SETTINGS: UNITADE_SETTINGS = {
    markdown_overcharge: false,
    extensions: 'txt',
    is_case_insensitive: false,
    is_onload: false,
    is_onload_unsafe: false,
    forced_extensions: '',
    is_ignore: false,
    ignore_extensions: '',
    ignore_masks: '',
    is_grouped: false,
    grouped_extensions: '',

    mobile_settings: {
        enable: false,
        extensions: 'txt',
        stable: true,
    },

    barefiling: true,

    stable: true,
    errors: {},

    debug_mode: false,
    silence_errors: false,
    manifest_version: '',

    compatibility_module: true,
    safe_mode: true,

    code_editor_settings: {
        enabled: true,
        use_default_extensions: true,
        extensions: '',
        folding: true,
        line_numbers: true,
        word_wrapping: false,
        minimapping: true,
        validation_semantic: true,
        validation_syntax: true,
        theme: 'auto',
        force_vanilla_paste: false,
        enable_zoom: true,
        font_size: 14,
        font_family: "'Cascadia Code', 'Fira Code', Consolas, 'Courier New', monospace",
        font_ligatures: true,
    },

    SYS_FONTSIZE_MAX: 32,
    SYS_FONTSIZE_MIN: 5,

    status_bar: {
        enabled: true,
        registered_extensions: {
            enabled: false,
            include_extensions: true,
            include_extensions_grouped: true,
            include_code_editor_extensions: false,
        },
        registered_views: false,
        current_processor: true,
        current_display: true,
        cursor_position: true,
    },

    advanced_silencing_errors: {
        signatures: "ResizeObserver loop completed with undelivered notifications.\nrequire2 is not a function",
        observer_errors: true,
        require2_errors: true,
    }
}

export default class UNITADE_SETTINGS_TAB extends PluginSettingTab {
    plugin: UNITADE_PLUGIN;
    locale: LocalesModule = new LocalesModule();

    private _config: Setting | undefined;
    private _configMobile: Setting | undefined;
    private _configIgnore: Setting | undefined;

    private _errors: HTMLParagraphElement | undefined;

    private defaults?: {
        color: string;
        borderColor: string;
        borderWidth: string;
    } = undefined;

    constructor(app: App, plugin: UNITADE_PLUGIN) {
        super(app, plugin);

        this.plugin = plugin;

        if (this.plugin.settings.compatibility_module) {
            const compatModule = new CompatibilityModule(app, plugin);
            compatModule.start().then((result) => {
                if (!result) {
                    const next = {
                        ...this.plugin.settings,
                        manifest_version: compatModule.current_manifest.version || '',
                    };

                    this.plugin.uptSettings(next);
                }
            });
        }
    }

    display(): void {
        const {
            containerEl
        } = this;

        containerEl.empty();

        //#region Basic settings (initial page)
        containerEl.createEl('h3', { text: this.locale.getLocaleItem('UNITADE_SETTINGS_COMMON')[0]! });

        new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_MD_OVERRIDE')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_MD_OVERRIDE')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.markdown_overcharge)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            markdown_overcharge: value,
                        };

                        await this.plugin.uptSettings(next);
                    });

                return toggle;
            });

        this._config = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_EXTENSIONS')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_EXTENSIONS')[1]!);

        const configInput = new TextAreaComponent(containerEl)
            .setPlaceholder('txt> conf> config> data> logs')
            .setValue(this.plugin.settings.extensions)
            .onChange(async (value) => {
                const next = {
                    ...this.plugin.settings,
                };

                if (value !== "" && value !== null && value !== undefined) {
                    try {
                        next.stable = true;
                        next.extensions = value;
                    } catch {
                        next.stable = false;
                    }
                } else {
                    next.stable = false;
                    next.extensions = value;
                }

                this.__uptState(
                    configInput,
                    this.plugin.settings.stable,
                    next.stable
                );

                await this.plugin.uptSettings(next);

                this.__updateErrors();
            });

        const configWarning = document.createElement('div');
        configWarning.addClasses(['unitade-addition-text', `unitade-warning-${getThemeObsidian()}`]);
        configWarning.innerHTML = this.locale.getLocaleItem('SETTINGS_EXTENSIONS')[2]!;

        this._config.infoEl.appendChild(configWarning);

        const caseInsenstiveExtensions = new Setting(containerEl)
            .setName(this.plugin.locale.getLocaleItem('SETTINGS_CASE_INSENSITIVE')[0]!)
            .setDesc(this.plugin.locale.getLocaleItem('SETTINGS_CASE_INSENSITIVE')[1]!)
            .setTooltip(this.plugin.locale.getLocaleItem('SETTINGS_CASE_INSENSITIVE')[2]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.is_case_insensitive)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            is_case_insensitive: value,
                        };

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();
                    });

                return toggle;
            });

        const onCaseInsensWarning = document.createElement('div');
        onCaseInsensWarning.addClasses(['unitade-addition-text', `unitade-attention-${getThemeObsidian()}`]);
        onCaseInsensWarning.innerHTML = this.locale.getLocaleItem('SETTINGS_CASE_INSENSITIVE')[3]!;

        caseInsenstiveExtensions.infoEl.appendChild(onCaseInsensWarning);

        configInput.inputEl.addClass('unitade-input-style');

        this._configMobile = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_MOBILE_SPECIFIC')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_MOBILE_SPECIFIC')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.mobile_settings.enable)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            mobile_settings: {
                                ...this.plugin.settings.mobile_settings,
                                enable: value,
                            }
                        };

                        await this.plugin.uptSettings(next);

                        this.__uptMbConfig(mobileConfigInp, value);

                        this.__updateErrors();
                    });

                return toggle;
            });

        const mobileConfigInp = new TextAreaComponent(containerEl)
            .setPlaceholder('txt> conf> config> data> logs')
            .setValue(this.plugin.settings.mobile_settings.extensions ? this.plugin.settings.mobile_settings.extensions : '')
            .onChange(async (value) => {
                const next = {
                    ...this.plugin.settings,
                    mobile_settings: {
                        ...this.plugin.settings.mobile_settings,
                        extensions: '',
                    }
                }

                if (value !== "" && value !== null && value !== undefined) {
                    try {
                        next.mobile_settings.stable = true;
                        next.mobile_settings.extensions = value;
                    } catch {
                        next.mobile_settings.stable = false;
                    }
                } else {
                    next.mobile_settings.stable = false;
                    next.mobile_settings.extensions = value;
                }

                this.__uptState(
                    mobileConfigInp,
                    this.plugin.settings.mobile_settings.stable,
                    next.mobile_settings.stable
                );

                await this.plugin.uptSettings(next);

                this.__updateErrors();
            });

        mobileConfigInp.inputEl.addClass('unitade-input-style');

        this.__uptMbConfig(mobileConfigInp, this.plugin.settings.mobile_settings.enable);

        new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_HARD_DELETE')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_HARD_DELETE')[1]!)
            .addButton(button => {
                button
                    .setButtonText('Hard-delete')
                    .setIcon('upload')
                    .setWarning()
                    .onClick(async (event) => {
                        if (this.plugin.settings.debug_mode)
                            console.info(`[${event.timeStamp}]: CAUSED FORCE-DELETING FUNCTION!`);

                        this.plugin.unapplyRegistry();
                    });

                return button;
            });

        new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_FORCE_UNLOAD')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_FORCE_UNLOAD')[1]!)
            .addButton(button => {
                button
                    .setButtonText('Force-unload')
                    .setIcon('upload')
                    .onClick(async (event) => {
                        if (this.plugin.settings.debug_mode)
                            console.info(`[${event.timeStamp}]: CAUSED UNLOADING FUNCTION!`);

                        this.plugin.unapply();
                    });

                return button;
            });

        new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_HARD_LOAD')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_HARD_LOAD')[1]!)
            .addButton(button => {
                button
                    .setButtonText('Force-load')
                    .setIcon('download')
                    .onClick(async (event) => {
                        if (this.plugin.settings.debug_mode)
                            console.info(`[${event.timeStamp}]: CAUSED LOADING FUNCTION!`);

                        this.plugin.apply();
                    });

                return button;
            });

        new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_RELOAD_REGISTRIES')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_RELOAD_REGISTRIES')[1]!)
            .addButton(button => {
                button
                    .setButtonText('Reload')
                    .setIcon('refresh-ccw')
                    .onClick(async (event) => {
                        if (this.plugin.settings.debug_mode)
                            console.info(`[${event.timeStamp}]: CAUSED RELOADING FUNCTION!`);

                        this.plugin.unapply();
                        this.plugin.apply();

                        this.plugin.applyDefaults();
                    });

                return button;
            });
        //#endregion
        //#region Errors
        containerEl.createEl('h2', { text: this.locale.getLocaleItem('UNITADE_SETTINGS_COMMON')[1]! });
        this._errors = containerEl.createEl('p', { text: 'None' });
        this._errors.style.whiteSpace = 'pre-line';

        this.__updateErrors();
        //#endregion
        //#region Advanced settings tab
        containerEl.createEl('h3', { text: this.locale.getLocaleItem('UNITADE_SETTINGS_COMMON')[2]! });

        const forcedMsg = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_FORCED_EXTENSIONS')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_FORCED_EXTENSIONS')[1]!)

        const forcedWarn = document.createElement('div');
        forcedWarn.addClasses(['unitade-addition-text', `unitade-commentary-${getThemeObsidian()}`]);
        forcedWarn.innerHTML = this.locale.getLocaleItem('SETTINGS_FORCED_EXTENSIONS')[2]!

        forcedMsg.nameEl.appendChild(forcedWarn);

        const frcExtInp = new TextAreaComponent(containerEl)
            .setPlaceholder('txt> md> > data> db')
            .setValue(this.plugin.settings.forced_extensions)
            .onChange(async (value) => {
                const next = {
                    ...this.plugin.settings,
                };

                if (value !== "" && value !== null && value !== undefined) {
                    try {
                        next.stable = true;
                        next.forced_extensions = value;
                    } catch {
                        next.stable = false;
                    }
                } else {
                    next.stable = false;
                    next.forced_extensions = value;
                }

                this.__uptState(
                    configInput,
                    this.plugin.settings.stable,
                    next.stable
                );

                await this.plugin.uptSettings(next);

                this.__updateErrors();
            });

        frcExtInp.inputEl.addClass('unitade-input-style');

        const safeModeToggle = new Setting(containerEl)
            .setName(this.plugin.locale.getLocaleItem('SAFE_MODE')[0]!)
            .setDesc(this.plugin.locale.getLocaleItem('SAFE_MODE')[1]!)
            .setTooltip(this.plugin.locale.getLocaleItem('SAFE_MODE')[4]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.safe_mode)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            safe_mode: value,
                        };

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();
                    });

                return toggle;
            });

        const safeModeToggleWarning = document.createElement('div');
        safeModeToggleWarning.addClasses(['unitade-addition-text', `unitade-attention-${getThemeObsidian()}`]);
        safeModeToggleWarning.innerHTML = this.locale.getLocaleItem('SAFE_MODE')[2]!;

        safeModeToggle.infoEl.appendChild(safeModeToggleWarning);

        const onRfAttention = document.createElement('div');
        onRfAttention.addClasses(['unitade-addition-text', `unitade-attention-${getThemeObsidian()}`]);
        onRfAttention.innerHTML = this.locale.getLocaleItem('SETTINGS_WARNING_MSG')[0]!;

        const onRfInfo = document.createElement('div');
        onRfInfo.addClass('unitade-info-style');
        onRfInfo.innerHTML = this.locale.getLocaleItem('SETTINGS_ONLOAD_REGISTRY')[2]!;

        const onRfStg = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_ONLOAD_REGISTRY')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_ONLOAD_REGISTRY')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.is_onload)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            is_onload: value,
                            is_onload_unsafe: this.plugin.settings.is_onload_unsafe ? false : this.plugin.settings.is_onload_unsafe,
                        };

                        await this.plugin.uptSettings(next);
                    });

                return toggle;
            });

        onRfStg.nameEl.parentElement!.appendChild(onRfAttention);
        onRfStg.nameEl.parentElement!.appendChild(onRfInfo);

        const onRuAttention = document.createElement('div');
        onRuAttention.addClasses(['unitade-addition-text', `unitade-attention-${getThemeObsidian()}`]);
        onRuAttention.innerHTML = this.locale.getLocaleItem('SETTINGS_WARNING_MSG')[0]!;

        const onRuInfo = document.createElement('div');
        onRuInfo.addClass('unitade-info-style');
        onRuInfo.innerHTML = this.locale.getLocaleItem('SETTINGS_ONLOAD_UNSAFE')[2]!

        const onRuStg = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_ONLOAD_UNSAFE')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_ONLOAD_UNSAFE')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.is_onload_unsafe)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            is_onload_unsafe: value,
                            is_onload: this.plugin.settings.is_onload ? false : this.plugin.settings.is_onload,
                        };

                        await this.plugin.uptSettings(next);
                    });

                return toggle;
            });

        onRuStg.nameEl.parentElement!.appendChild(onRuAttention);
        onRuStg.nameEl.parentElement!.appendChild(onRuInfo);

        new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_BAREFILES')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_BAREFILES')[1]!)
            .setTooltip(this.locale.getLocaleItem('SETTINGS_BAREFILES')[2]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.barefiling)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            barefiling: value
                        };

                        await this.plugin.uptSettings(next);

                        if (this.plugin.settings.barefiling) {
                            this.plugin.tryApply('', 'markdown');
                        } else {
                            this.plugin.app.viewRegistry.unregisterExtensions(['']);
                        }
                    })
            });

        this._configIgnore = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_IGNORE_MODE')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_IGNORE_MODE')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.is_ignore)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            is_ignore: value,
                        };

                        await this.plugin.uptSettings(next);

                        this.__uptIgnConfig(
                            [ignoreExtInp, ignoreMskInp],
                            [ignoreExtMsg, ignoreMskMsg],
                            this.plugin.settings.is_ignore
                        );

                        this.__updateErrors();
                    });

                return toggle;
            });

        const ignoreWarn = document.createElement('div');
        ignoreWarn.addClasses(['unitade-addition-text', `unitade-warning-${getThemeObsidian()}`]);
        ignoreWarn.innerHTML = this.locale.getLocaleItem('SETTINGS_IGNORE_MSG')[0]!;

        this._configIgnore.nameEl.appendChild(ignoreWarn);

        const ignoreExtMsg = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_IGNORE_EXTENSIONS')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_IGNORE_EXTENSIONS')[1]!);

        const ignoreExtInp = new TextAreaComponent(containerEl)
            .setPlaceholder('txt> conf> config> data> logs')
            .setValue(this.plugin.settings.ignore_extensions)
            .onChange(async (value) => {
                const next = {
                    ...this.plugin.settings,
                };

                if (value !== "" && value !== null && value !== undefined) {
                    try {
                        next.stable = true;
                        next.ignore_extensions = value;
                    } catch {
                        next.stable = false;
                    }
                } else {
                    next.stable = false;
                    next.ignore_extensions = value;
                }

                this.__uptState(
                    configInput,
                    this.plugin.settings.stable,
                    next.stable
                );

                await this.plugin.uptSettings(next);

                this.__updateErrors();
            });

        ignoreExtInp.inputEl.addClass('unitade-input-style');

        const ignoreMskMsg = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_IGNORE_FILES')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_IGNORE_FILES')[1]!);

        const ignoreMskInp = new TextAreaComponent(containerEl)
            .setPlaceholder('\\.(txt|md)$> doc_[a-z]> file_\\d{3}> file1')
            .setValue(this.plugin.settings.ignore_masks)
            .onChange(async (value) => {
                const next = {
                    ...this.plugin.settings,
                };

                if (value !== "" && value !== null && value !== undefined) {
                    try {
                        next.stable = true;
                        next.ignore_masks = value;
                    } catch {
                        next.stable = false;
                    }
                } else {
                    next.stable = false;
                    next.ignore_masks = value;
                }

                this.__uptState(
                    configInput,
                    this.plugin.settings.stable,
                    next.stable
                );

                await this.plugin.uptSettings(next);

                await this.__updateErrors();
            });

        ignoreMskInp.inputEl.addClass('unitade-input-style');

        this.__uptIgnConfig(
            [ignoreExtInp, ignoreMskInp],
            [ignoreExtMsg, ignoreMskMsg],
            this.plugin.settings.is_ignore,
        );

        const groupMsg = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_GROUP_EXTENSIONS')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_GROUP_EXTENSIONS')[1]!)
            .setTooltip(this.locale.getLocaleItem('SETTINGS_GROUP_EXTENSIONS')[2]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.is_grouped)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            is_grouped: value,
                        };

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();
                    });

                return toggle;
            });

        const groupedWarn = document.createElement('div');
        groupedWarn.addClasses(['unitade-addition-text', `unitade-warning-${getThemeObsidian()}`]);
        groupedWarn.innerHTML = this.locale.getLocaleItem('SETTINGS_GROUP_MSG')[0]!;

        groupMsg.nameEl.appendChild(groupedWarn);

        const groupExtInp = new TextAreaComponent(containerEl)
            .setPlaceholder('markdown: json> txt> pgb; pdf: pdf; video: webm;')
            .setValue(this.plugin.settings.grouped_extensions)
            .onChange(async (value) => {
                const next = {
                    ...this.plugin.settings,
                };

                if (value !== "" && value !== null && value !== undefined) {
                    try {
                        next.stable = true;
                        next.grouped_extensions = value;
                    } catch {
                        next.stable = false;
                    }
                } else {
                    next.stable = false;
                    next.grouped_extensions = value;
                }

                this.__uptState(
                    configInput,
                    this.plugin.settings.stable,
                    next.stable
                );

                await this.plugin.uptSettings(next);

                this.__updateErrors();
            });

        groupExtInp.inputEl.addClass('unitade-input-style');
        //#endregion
        //#region Code editor settings tab

        containerEl.createEl('h3', { text: this.locale.getLocaleItem('UNITADE_SETTINGS_COMMON')[3]! });

        new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_CODE_EDITOR')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_CODE_EDITOR')[1]!)
            .setTooltip(this.locale.getLocaleItem('SETTINGS_CODE_EDITOR')[2]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.code_editor_settings.enabled)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            code_editor_settings: {
                                ...this.plugin.settings.code_editor_settings,
                                enabled: value
                            },
                        };

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();

                        this._uptMSConfig([
                            useDefaultExtensions, editorExtensionsInput, codeExtensionsWarn, editorTheme,
                            editorFolding, editorWordWrapping, editorLineNumbers, editorMinimapping,
                            editorValidationSemantic, editorValidationSyntax, editorFontSize,
                            editorFontFamily, editorFontLigatures, forceVanillaPaste, enableZoomSetting,
                        ], value);
                    })

                return toggle;
            });

        const useDefaultExtensions = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('CODE_EDITOR_USE_DEFAULT')[0]!)
            .setDesc(this.locale.getLocaleItem('CODE_EDITOR_USE_DEFAULT')[1]!)
            .setTooltip(this.locale.getLocaleItem('CODE_EDITOR_USE_DEFAULT')[2]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.code_editor_settings.use_default_extensions)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            code_editor_settings: {
                                ...this.plugin.settings.code_editor_settings,
                                use_default_extensions: value,
                            },
                        }

                        await this.plugin.uptSettings(next);

                        this._uptMSConfig([editorExtensionsInput, codeExtensionsWarn], !value);

                        if (this.plugin.settings.debug_mode)
                            console.debug(`HIDE EDITOR EXTENSIONS? =${value ? 'NO.' : 'YES.'}`);
                    });

                return toggle;
            });

        const editorExtensionsInput = new TextAreaComponent(containerEl)
            .setPlaceholder('txt> conf> config> data> logs')
            .setValue(this.plugin.settings.code_editor_settings.extensions)
            .onChange(async (value) => {
                const next = {
                    ...this.plugin.settings,
                    code_editor_settings: {
                        ...this.plugin.settings.code_editor_settings,
                        extensions: '',
                    },
                };

                if (value !== "" && value !== null && value !== undefined) {
                    try {
                        next.stable = true;
                        next.code_editor_settings.extensions = value;
                    } catch {
                        next.stable = false;
                    }
                } else {
                    next.stable = false;
                    next.code_editor_settings.extensions = value;
                }

                this.__uptState(
                    editorExtensionsInput,
                    this.plugin.settings.stable,
                    next.stable
                );

                await this.plugin.uptSettings(next);

                this.__updateErrors();
            });

        const codeExtensionsWarn = new Setting(containerEl)
            .setName('')
            .setDesc('');

        const codeExtensionsText = document.createElement('div');
        codeExtensionsText.addClasses(['unitade-addition-text', `unitade-commentary-${getThemeObsidian()}`]);
        codeExtensionsText.innerHTML = this.locale.getLocaleItem('CODE_EDITOR_USE_DEFAULT')[3]!;

        codeExtensionsWarn.infoEl.appendChild(codeExtensionsText);

        editorExtensionsInput.inputEl.addClass('unitade-input-style');

        this._uptMSConfig([editorExtensionsInput, codeExtensionsWarn], !this.plugin.settings.code_editor_settings.use_default_extensions);

        const editorFolding = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('CODE_EDITOR_FOLDING')[0]!)
            .setDesc(this.locale.getLocaleItem('CODE_EDITOR_FOLDING')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.code_editor_settings.folding)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            code_editor_settings: {
                                ...this.plugin.settings.code_editor_settings,
                                folding: value,
                            },
                        };

                        await this.plugin.uptSettings(next);
                    });

                return toggle;
            });

        const editorLineNumbers = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('CODE_EDITOR_LINE_NUMBERS')[0]!)
            .setDesc(this.locale.getLocaleItem('CODE_EDITOR_LINE_NUMBERS')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.code_editor_settings.line_numbers)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            code_editor_settings: {
                                ...this.plugin.settings.code_editor_settings,
                                line_numbers: value,
                            },
                        };

                        await this.plugin.uptSettings(next);
                    });

                return toggle;
            });

        const editorWordWrapping = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('CODE_EDITOR_WORD_WRAPPING')[0]!)
            .setDesc(this.locale.getLocaleItem('CODE_EDITOR_WORD_WRAPPING')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.code_editor_settings.word_wrapping)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            code_editor_settings: {
                                ...this.plugin.settings.code_editor_settings,
                                word_wrapping: value,
                            },
                        };

                        await this.plugin.uptSettings(next);
                    });

                return toggle;
            });

        const editorMinimapping = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('CODE_EDITOR_MINIMAPPING')[0]!)
            .setDesc(this.locale.getLocaleItem('CODE_EDITOR_MINIMAPPING')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.code_editor_settings.minimapping)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            code_editor_settings: {
                                ...this.plugin.settings.code_editor_settings,
                                minimapping: value,
                            },
                        };

                        await this.plugin.uptSettings(next);
                    });

                return toggle;
            });

        const editorValidationSemantic = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('CODE_EDITOR_SEMANTIC_VALIDATION')[0]!)
            .setDesc(this.locale.getLocaleItem('CODE_EDITOR_SEMANTIC_VALIDATION')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.code_editor_settings.validation_semantic)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            code_editor_settings: {
                                ...this.plugin.settings.code_editor_settings,
                                validation_semantic: value,
                            },
                        };

                        await this.plugin.uptSettings(next);
                    });

                return toggle;
            });

        const editorValidationSyntax = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('CODE_EDITOR_SYNTAX_VALIDATION')[0]!)
            .setDesc(this.locale.getLocaleItem('CODE_EDITOR_SYNTAX_VALIDATION')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.code_editor_settings.validation_syntax)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            code_editor_settings: {
                                ...this.plugin.settings.code_editor_settings,
                                validation_syntax: value,
                            },
                        };

                        await this.plugin.uptSettings(next);
                    });

                return toggle;
            });

        const editorTheme = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('CODE_EDITOR_EDIT_THEME')[0]!)
            .setDesc(this.locale.getLocaleItem('CODE_EDITOR_EDIT_THEME')[1]!)
            .addDropdown(dropdown => {
                dropdown
                    .addOptions(CONSTANTS.themes)
                    .setValue(this.plugin.settings.code_editor_settings.theme)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            code_editor_settings: {
                                ...this.plugin.settings.code_editor_settings,
                                theme: value,
                            },
                        };

                        if (this.plugin.settings.debug_mode)
                            console.debug('CAUGHT THEME FOR THE EDITOR:' + `${value};`);

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();

                    });

                return dropdown;
            });

        const forceVanillaPaste = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_FORCE_VANILLA_PASTE')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_FORCE_VANILLA_PASTE')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.code_editor_settings.force_vanilla_paste)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            code_editor_settings: {
                                ...this.plugin.settings.code_editor_settings,
                                force_vanilla_paste: value
                            }
                        };

                        this.plugin.uptSettings(next);
                    });

                return toggle;
            });

        const enableZoomSetting = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('CODE_EDITOR_ZOOM_OPTION')[0]!)
            .setDesc(this.locale.getLocaleItem('CODE_EDITOR_ZOOM_OPTION')[1]!)
            .setTooltip(this.locale.getLocaleItem('CODE_EDITOR_ZOOM_OPTION')[2]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.code_editor_settings.enable_zoom)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            code_editor_settings: {
                                ...this.plugin.settings.code_editor_settings,
                                enable_zoom: value,
                            },
                        };

                        this.plugin.uptSettings(next);
                    });

                return toggle;
            });

        const forceVanillaPasteText = document.createElement('div');
        forceVanillaPasteText.addClasses(['unitade-addition-text', `unitade-attention-${getThemeObsidian()}`]);
        forceVanillaPasteText.innerHTML = this.locale.getLocaleItem('SETTINGS_FORCE_VANILLA_PASTE')[2]!;

        forceVanillaPaste.infoEl.appendChild(forceVanillaPasteText);

        containerEl.createEl('h4', { text: this.locale.getLocaleItem('SETTINGS_CODE_EDITOR')[3]! });

        const editorFontSize = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('CODE_EDITOR_FONT_SIZE')[0]!)
            .addSlider(slider => {
                slider
                    .setValue(this.plugin.settings.code_editor_settings.font_size)
                    .setDynamicTooltip()
                    .setLimits(this.plugin.settings.SYS_FONTSIZE_MIN, this.plugin.settings.SYS_FONTSIZE_MAX, 1)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            code_editor_settings: {
                                ...this.plugin.settings.code_editor_settings,
                                font_size: value,
                            },
                        };

                        await this.plugin.uptSettings(next);
                    });

                return slider;
            });

        const editorFontFamily = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('CODE_EDITOR_FONT_FAMILY')[0]!)
            .setDesc(this.locale.getLocaleItem('CODE_EDITOR_FONT_FAMILY')[1]!)
            .addTextArea(text => {
                text
                    .setValue(this.plugin.settings.code_editor_settings.font_family)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            code_editor_settings: {
                                ...this.plugin.settings.code_editor_settings,
                                font_family: value,
                            },
                        };

                        await this.plugin.uptSettings(next);
                    });

                return text;
            });

        const editorFontLigatures = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('CODE_EDITOR_FONT_LIGATURES')[0]!)
            .setDesc(this.locale.getLocaleItem('CODE_EDITOR_FONT_LIGATURES')[1]!)
            .setTooltip(this.locale.getLocaleItem('CODE_EDITOR_FONT_LIGATURES')[2]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.code_editor_settings.font_ligatures)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            code_editor_settings: {
                                ...this.plugin.settings.code_editor_settings,
                                font_ligatures: value,
                            },
                        };

                        await this.plugin.uptSettings(next);
                    });

                return toggle;
            });

        //#endregion
        //#region Additionals settings tab

        containerEl.createEl('h3', { text: this.locale.getLocaleItem('UNITADE_SETTINGS_COMMON')[4]! });

        new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_DEBUG_MODE')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_DEBUG_MODE')[1]!)
            .setTooltip(this.locale.getLocaleItem('SETTINGS_DEBUG_MODE')[2]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.debug_mode)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            debug_mode: value,
                        };

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();
                    });

                return toggle;
            });

        new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_SILENCE_ERRORS')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_SILENCE_ERRORS')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.silence_errors)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            silence_errors: value,
                        };

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();
                    });

                return toggle;
            });

        new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_COMPATIBILITY')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_COMPATIBILITY')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.compatibility_module)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            compatibility_module: value,
                        };

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();
                    });

                return toggle;
            });

        new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_COMPATIBILITY_BUTTON')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_COMPATIBILITY_BUTTON')[1]!)
            .addButton(button => {
                button
                    .setButtonText('Start')
                    .setIcon('arrow-up-down')
                    .onClick(async (event) => {
                        if (this.plugin.settings.debug_mode)
                            console.info(`[${event.timeStamp}]: STARTED COMPATIBILITY PROCESS.`);

                        await new CompatibilityModule(this.app, this.plugin).start();
                    });

                return button;
            });

        new Setting(containerEl)
            .setName(this.locale.getLocaleItem('BUTTON_WIKI')[0]!)
            .setDesc(this.locale.getLocaleItem('BUTTON_WIKI')[1]!)
            .addButton(button => {
                button
                    .setButtonText(this.locale.getLocaleItem('BUTTON_WIKI')[3]!)
                    .setTooltip(this.locale.getLocaleItem('BUTTON_WIKI')[2]!)
                    .onClick(async (event) => {
                        if (this.plugin.settings.debug_mode)
                            console.info(`[${event.timeStamp}]: REFER EXTERNAL LINK.`);

                        window.open('https://github.com/Falcion/UNITADE.md/wiki');
                    });

                return button;
            });

        //

        const resetToDefaults = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_RESET_TO_DEFAULTS')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_RESET_TO_DEFAULTS')[1]!)
            .addButton(button => {
                button
                    .setButtonText(this.locale.getLocaleItem('SETTINGS_RESET_TO_DEFAULTS')[2]!)
                    .setIcon('list-restart')
                    .setWarning()
                    .setTooltip(this.locale.getLocaleItem('SETTINGS_RESET_TO_DEFAULTS')[3]!)
                    .onClick(async (event) => {
                        if (this.plugin.settings.debug_mode)
                            console.debug('[UNITADE]: Reset settings to defaults:', event);

                        this.plugin.uptSettings(DEFAULT_SETTINGS);
                    });
            });

        const resetToDefaultsWarn = document.createElement('div');
        resetToDefaultsWarn.addClasses(['unitade-addition-text', `unitade-attention-${getThemeObsidian()}`]);
        resetToDefaultsWarn.innerHTML = this.locale.getLocaleItem('SETTINGS_RESET_TO_DEFAULTS')[4]!;

        resetToDefaults.infoEl.appendChild(resetToDefaultsWarn);

        //#endregion
        //#region UI/UX
        containerEl.createEl('h3', { text: this.locale.getLocaleItem('UNITADE_SETTINGS_COMMON2')[0]! });

        new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_STATUS_BAR')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_STATUS_BAR')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.status_bar.enabled)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            status_bar: {
                                ...this.plugin.settings.status_bar,
                                enabled: value
                            },
                        };

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();

                        this._uptMSConfig([
                            registerExtensions,
                            registeredViews,
                            displayCurrentWorker,
                            displayCurrentLanguage,
                            displayCursorPosition
                        ], value);

                        /* Hide specifically only if register extensions status bar settings
                           are enabled, so we need only to show them when register extensions is true and
                           always hide specifically.
                        */
                        if (value === true && this.plugin.settings.status_bar.registered_extensions.enabled) {
                            this._uptMSConfig([
                                registerExtensionsVanilla,
                                registerExtensionsGrouped,
                                registerExtensionsCodeEditor
                            ], value);
                        }
                        if (value === false)
                            this._uptMSConfig([
                                registerExtensionsVanilla,
                                registerExtensionsGrouped,
                                registerExtensionsCodeEditor
                            ], value);
                    });

                return toggle;
            });

        const registerExtensions = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_STATUS_BAR_EXTS')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_STATUS_BAR_EXTS')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.status_bar.registered_extensions.enabled)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            status_bar: {
                                ...this.plugin.settings.status_bar,
                                registered_extensions: {
                                    ...this.plugin.settings.status_bar.registered_extensions,
                                    enabled: value,
                                },
                            },
                        };

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();

                        this._uptMSConfig([
                            registerExtensionsVanilla,
                            registerExtensionsGrouped,
                            registerExtensionsCodeEditor
                        ], value);
                    });

                return toggle;
            });

        const registerExtensionsVanilla = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_STATUS_BAR_EXTS_DEFAULT')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_STATUS_BAR_EXTS_DEFAULT')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.status_bar.registered_extensions.include_extensions)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            status_bar: {
                                ...this.plugin.settings.status_bar,
                                registered_extensions: {
                                    ...this.plugin.settings.status_bar.registered_extensions,
                                    include_extensions: value,
                                },
                            },
                        };

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();
                    });

                return toggle;
            });

        const registerExtensionsGrouped = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_STATUS_BAR_EXTS_GROUPED')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_STATUS_BAR_EXTS_GROUPED')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.status_bar.registered_extensions.include_extensions_grouped)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            status_bar: {
                                ...this.plugin.settings.status_bar,
                                registered_extensions: {
                                    ...this.plugin.settings.status_bar.registered_extensions,
                                    include_extensions_grouped: value,
                                },
                            },
                        };

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();
                    });

                return toggle;
            });

        const registerExtensionsCodeEditor = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_STATUS_BAR_EXTS_CODE_EDITOR')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_STATUS_BAR_EXTS_CODE_EDITOR')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.status_bar.registered_extensions.include_code_editor_extensions)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            status_bar: {
                                ...this.plugin.settings.status_bar,
                                registered_extensions: {
                                    ...this.plugin.settings.status_bar.registered_extensions,
                                    include_code_editor_extensions: value,
                                },
                            },
                        };

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();
                    });

                return toggle;
            });

        const registeredViews = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_STATUS_BAR_VIEWS')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_STATUS_BAR_VIEWS')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.status_bar.registered_views)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            status_bar: {
                                ...this.plugin.settings.status_bar,
                                registered_views: value,
                            },
                        };

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();
                    });

                return toggle;
            });

        const displayCurrentWorker = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_STATUS_BAR_PROCESSOR')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_STATUS_BAR_PROCESSOR')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.status_bar.current_processor)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            status_bar: {
                                ...this.plugin.settings.status_bar,
                                current_processor: value,
                            },
                        };

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();
                    });

                return toggle;
            });

        const displayCurrentLanguage = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_STATUS_BAR_LANGUAGE_MODEL')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_STATUS_BAR_LANGUAGE_MODEL')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.status_bar.current_display)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            status_bar: {
                                ...this.plugin.settings.status_bar,
                                current_display: value,
                            },
                        };

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();
                    });

                return toggle;
            });

        const displayCursorPosition = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_STATUS_BAR_CURSOR_POSITION')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_STATUS_BAR_CURSOR_POSITION')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.status_bar.cursor_position)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            status_bar: {
                                ...this.plugin.settings.status_bar,
                                cursor_position: value,
                            },
                        };

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();
                    });

                return toggle;
            });
    }

    // update mobile config
    private __uptMbConfig(mbConfigInput: TextAreaComponent, mbConfigEnabled: boolean): void {
        mbConfigInput.inputEl.style.display = mbConfigEnabled ? 'block' : 'none';
    }

    // update module system config
    private _uptMSConfig(configModuleElements: (TextAreaComponent | Setting)[], configModuleEnabled: boolean): void {
        for (const configCodeEditorElement of configModuleElements) {
            if (configCodeEditorElement instanceof TextAreaComponent) {
                configCodeEditorElement.inputEl.style.display = configModuleEnabled ? 'block' : 'none';
            } else if (configCodeEditorElement instanceof Setting) {
                configCodeEditorElement.settingEl.style.display = configModuleEnabled ? 'block' : 'none';
            } else {
                throw new Error('Unknown type of throwable entity.');
            }

        }
    }

    private __uptIgnConfig(ignInps: TextAreaComponent[], ignMsgs: Setting[], ignConfigEnabled: boolean): void {
        ignInps[0].inputEl.style.display = ignConfigEnabled ? 'block' : 'none';
        ignMsgs[0].settingEl.style.display = ignConfigEnabled ? 'block' : 'none';
        ignInps[1].inputEl.style.display = ignConfigEnabled ? 'block' : 'none';
        ignMsgs[1].settingEl.style.display = ignConfigEnabled ? 'block' : 'none';
    }

    private __uptState(data: TextAreaComponent, prev: boolean, next: boolean): void {
        if (prev !== next)
            if (prev) {
                if (!this.defaults) {
                    this.defaults = {
                        color: data.inputEl.style.color,
                        borderColor: data.inputEl.style.borderColor,
                        borderWidth: data.inputEl.style.borderWidth,
                    };
                }

                data.inputEl.style.color = 'red';
                data.inputEl.style.borderColor = 'red';
                data.inputEl.style.borderWidth = '4px';
            } else if (this.defaults) {
                data.inputEl.style.color = this.defaults.color;
                data.inputEl.style.borderColor = this.defaults.borderColor;
                data.inputEl.style.borderWidth = this.defaults.borderWidth;
            }
    }

    private __updateErrors(): void {
        if (Object.keys(this.plugin.settings.errors).length === 0) {
            this._errors!.innerHTML = 'None';
            this._errors!.style.color = 'green';
        } else {
            this._errors!.innerHTML = `<ul>${Object.keys(this.plugin.settings.errors)
                .map((k) => `<li><b>${k}</b>: ${this.plugin.settings.errors[k]}</li>`)
                .join('')}</ul>`;
            this._errors!.style.color = 'red';
        }
    }
}
