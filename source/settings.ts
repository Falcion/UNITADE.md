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

export interface UNITADE_SETTINGS {
    markdown_overcharge: boolean,
    extensions: string,
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
    compatibility_module: boolean
}

export const DEFAULT_SETTINGS: UNITADE_SETTINGS = {
    markdown_overcharge: false,
    extensions: 'txt',
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
    compatibility_module: false,
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
            new CompatibilityModule(app, plugin).start();
        }
    }

    display(): void {
        let {
            containerEl
        } = this;

        containerEl.empty();

        containerEl.createEl('h3', { text: this.locale.getLocaleItem('UNITADE_SETTINGS_COMMON')[0]! });

        new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_MD_OVERRIDE')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_MD_OVERRIDE')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.markdown_overcharge)
                    .onChange(async (value) => {
                        let next = {
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

        let configInput = new TextAreaComponent(containerEl)
            .setPlaceholder('txt; conf; config; data; logs')
            .setValue(this.plugin.settings.extensions)
            .onChange(async (value) => {
                let next = {
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

        configInput.inputEl.style.width = '100%';
        configInput.inputEl.style.height = '48px';
        configInput.inputEl.style.minHeight = '36px';

        this._configMobile = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_MOBILE_SPECIFIC')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_MOBILE_SPECIFIC')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.mobile_settings.enable)
                    .onChange(async (value) => {
                        let next = {
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

        let mobileConfigInp = new TextAreaComponent(containerEl)
            .setPlaceholder('txt; conf; config; data; logs')
            .setValue(this.plugin.settings.mobile_settings.extensions ? this.plugin.settings.mobile_settings.extensions : '')
            .onChange(async (value) => {
                let next = {
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

        mobileConfigInp.inputEl.style.width = '100%';
        mobileConfigInp.inputEl.style.height = '48px';
        mobileConfigInp.inputEl.style.minHeight = '36px';

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
            })

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
                    .setIcon('reload')
                    .onClick(async (event) => {
                        if (this.plugin.settings.debug_mode)
                            console.info(`[${event.timeStamp}]: CAUSED RELOADING FUNCTION!`);

                        this.plugin.unapply();
                        this.plugin.apply();

                        this.plugin.applyDefaults();
                    });

                return button;
            });

        containerEl.createEl('h2', { text: this.locale.getLocaleItem('UNITADE_SETTINGS_COMMON')[1]! });
        this._errors = containerEl.createEl('p', { text: 'None' });
        this._errors.style.whiteSpace = 'pre-line';

        this.__updateErrors();

        containerEl.createEl('h3', { text: this.locale.getLocaleItem('UNITADE_SETTINGS_COMMON')[2]! });

        let forcedMsg = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_FORCED_EXTENSIONS')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_FORCED_EXTENSIONS')[1]!)

        let forcedWarn = document.createElement('div');
        forcedWarn.style.fontSize = '80%';
        forcedWarn.style.margin = '10px';
        forcedWarn.style.color = 'green';
        forcedWarn.innerHTML = this.locale.getLocaleItem('SETTINGS_FORCED_EXTENSIONS')[2]!

        forcedMsg.nameEl.appendChild(forcedWarn);

        let frcExtInp = new TextAreaComponent(containerEl)
            .setPlaceholder('txt; md; ; data; db;')
            .setValue(this.plugin.settings.forced_extensions)
            .onChange(async (value) => {
                let next = {
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

        frcExtInp.inputEl.style.width = '100%';
        frcExtInp.inputEl.style.height = '48px';
        frcExtInp.inputEl.style.minHeight = '36px';

        let onRfAttention = document.createElement('div');
        onRfAttention.style.fontSize = '80%';
        onRfAttention.style.margin = '10px';
        onRfAttention.style.color = 'darkRed';
        onRfAttention.innerHTML = this.locale.getLocaleItem('SETTINGS_WARNING_MSG')[0]!;

        let onRfInfo = document.createElement('div');
        onRfInfo.style.fontWeight = 'bold';
        onRfInfo.style.fontSize = '80%';
        onRfInfo.innerHTML = this.locale.getLocaleItem('SETTINGS_ONLOAD_REGISTRY')[2]!;

        const onRfStg = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_ONLOAD_REGISTRY')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_ONLOAD_REGISTRY')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.is_onload)
                    .onChange(async (value) => {
                        let next = {
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

        let onRuAttention = document.createElement('div');
        onRuAttention.style.fontSize = '80%';
        onRuAttention.style.margin = '10px';
        onRuAttention.style.color = 'darkRed';
        onRuAttention.innerHTML = this.locale.getLocaleItem('SETTINGS_WARNING_MSG')[0]!;

        let onRuInfo = document.createElement('div');
        onRuInfo.style.fontWeight = 'bold';
        onRuInfo.style.fontSize = '80%';
        onRuInfo.innerHTML = this.locale.getLocaleItem('SETTINGS_ONLOAD_UNSAFE')[2]!

        const onRuStg = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_ONLOAD_UNSAFE')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_ONLOAD_UNSAFE')[1]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.is_onload_unsafe)
                    .onChange(async (value) => {
                        let next = {
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
                        let next = {
                            ...this.plugin.settings,
                            barefiling: value
                        };

                        await this.plugin.uptSettings(next);

                        if (this.plugin.settings.barefiling) {
                            this.plugin.tryApply('', 'markdown');
                        } else {
                            /**@ts-expect-error */
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
                        let next = {
                            ...this.plugin.settings,
                            is_ignore: value,
                        };

                        await this.plugin.uptSettings(next);

                        await this.__uptIgnConfig(
                            [ignoreExtInp, ignoreMskInp],
                            [ignoreExtMsg, ignoreMskMsg],
                            this.plugin.settings.is_ignore,
                        );

                        this.__updateErrors();
                    });

                return toggle;
            });

        let ignoreWarn = document.createElement('div');
        ignoreWarn.style.fontSize = '80%';
        ignoreWarn.style.margin = '10px';
        ignoreWarn.style.color = 'yellow';
        ignoreWarn.innerHTML = this.locale.getLocaleItem('SETTINGS_IGNORE_MSG')[0]!;

        this._configIgnore.nameEl.appendChild(ignoreWarn);

        let ignoreExtMsg = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_IGNORE_EXTENSIONS')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_IGNORE_EXTENSIONS')[1]!);

        let ignoreExtInp = new TextAreaComponent(containerEl)
            .setPlaceholder('txt; conf; config; data; logs')
            .setValue(this.plugin.settings.ignore_extensions)
            .onChange(async (value) => {
                let next = {
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

        ignoreExtInp.inputEl.style.width = '100%';
        ignoreExtInp.inputEl.style.height = '48px';
        ignoreExtInp.inputEl.style.minHeight = '36px';

        let ignoreMskMsg = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_IGNORE_FILES')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_IGNORE_FILES')[1]!);

        let ignoreMskInp = new TextAreaComponent(containerEl)
            .setPlaceholder('\\.(txt|md)$; doc_[a-z]; file_\\d{3}; file1')
            .setValue(this.plugin.settings.ignore_masks)
            .onChange(async (value) => {
                let next = {
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

        ignoreMskInp.inputEl.style.width = '100%';
        ignoreMskInp.inputEl.style.height = '48px';
        ignoreMskInp.inputEl.style.minHeight = '36px';

        this.__uptIgnConfig(
            [ignoreExtInp, ignoreMskInp],
            [ignoreExtMsg, ignoreMskMsg],
            this.plugin.settings.is_ignore,
        );

        let groupMsg = new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_GROUP_EXTENSIONS')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_GROUP_EXTENSIONS')[1]!)
            .setTooltip(this.locale.getLocaleItem('SETTINGS_GROUP_EXTENSIONS')[2]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.is_grouped)
                    .onChange(async (value) => {
                        let next = {
                            ...this.plugin.settings,
                            is_grouped: value,
                        };

                        await this.plugin.uptSettings(next);

                        this.__updateErrors();
                    });

                return toggle;
            });

        let groupedWarn = document.createElement('div');
        groupedWarn.style.fontSize = '80%';
        groupedWarn.style.margin = '10px';
        groupedWarn.style.color = 'yellow';
        groupedWarn.innerHTML = this.locale.getLocaleItem('SETTINGS_GROUP_MSG')[0]!;

        groupMsg.nameEl.appendChild(groupedWarn);

        let groupExtInp = new TextAreaComponent(containerEl)
            .setPlaceholder('md: json, txt, pgb; json: data, md, txt;')
            .setValue(this.plugin.settings.grouped_extensions)
            .onChange(async (value) => {
                let next = {
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

        groupExtInp.inputEl.style.width = '100%';
        groupExtInp.inputEl.style.height = '48px';
        groupExtInp.inputEl.style.minHeight = '36px';

        containerEl.createEl('h3', { text: this.locale.getLocaleItem('UNITADE_SETTINGS_COMMON')[3]! });

        new Setting(containerEl)
            .setName(this.locale.getLocaleItem('SETTINGS_DEBUG_MODE')[0]!)
            .setDesc(this.locale.getLocaleItem('SETTINGS_DEBUG_MODE')[1]!)
            .setTooltip(this.locale.getLocaleItem('SETTINGS_DEBUG_MODE')[2]!)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.debug_mode)
                    .onChange(async (value) => {
                        let next = {
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
                        let next = {
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
                        let next = {
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
            })
    }

    private __uptMbConfig(mbConfigInput: TextAreaComponent, mbConfigEnabled: boolean): void {
        mbConfigInput.inputEl.style.display = mbConfigEnabled ? 'block' : 'none';
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
            this._errors!.innerHTML = `Errors: <ul>${Object.keys(this.plugin.settings.errors)
                .map((k) => `<li><b>${k}</b>: ${this.plugin.settings.errors[k]}</li>`)
                .join('')}</ul>`;
            this._errors!.style.color = 'red';
        }
    }
}
