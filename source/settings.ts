import {
    App,
    PluginSettingTab,
    Setting,
    TextAreaComponent
} from 'obsidian';

import UNITADE_PLUGIN from './main';
import SETTING_LOCALE from './settings.text';

export interface UNITADE_SETTINGS {
    markdown_overcharge: boolean,
    extensions: string,
    is_forced: boolean,
    is_onload: boolean,
    is_onload_unsafe: boolean,
    forced_extensions: string,
    ignore_extensions: string,
    is_grouped: boolean,
    grouped_extensions: string,

    mobile_settings: {
        enable: boolean,
        extensions: string,
        stable: boolean,
    },

    stable: boolean,
    errors: Record<string, string>,
}

export const DEFAULT_SETTINGS: UNITADE_SETTINGS = {
    markdown_overcharge: false,
    extensions: 'txt',
    is_forced: false,
    is_onload: false,
    is_onload_unsafe: false,
    forced_extensions: '',
    ignore_extensions: '',
    is_grouped: false,
    grouped_extensions: '',

    mobile_settings: {
        enable: false,
        extensions: 'txt',
        stable: true,
    },

    stable: true,
    errors: {},
}

export default class UNITADE_SETTINGS_TAB extends PluginSettingTab {
    plugin: UNITADE_PLUGIN;

    private _config: Setting | undefined;
    private _configMobile: Setting | undefined;

    private _errors: HTMLParagraphElement | undefined;

    private defaults?: {
        color: string;
        borderColor: string;
        borderWidth: string;
    } = undefined;

    constructor(app: App, plugin: UNITADE_PLUGIN) {
        super(app, plugin);

        this.plugin = plugin;
    }

    display(): void {
        let {
            containerEl
        } = this;

        containerEl.empty();

        containerEl.createEl('h2', { text: 'UNITADE\'s settings:' });

        new Setting(containerEl)
            .setName(SETTING_LOCALE.getMdOv().name)
            .setDesc(SETTING_LOCALE.getMdOv().desc)
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
            .setName(SETTING_LOCALE.getCfgRt().name)
            .setDesc(SETTING_LOCALE.getCfgRt().desc);

        let configInput = new TextAreaComponent(containerEl)
            .setPlaceholder('txt, conf, config, data, logs')
            .setValue(this.plugin.settings.extensions)
            .onChange(async (value) => {
                let parsed: any = null;

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
            .setName(SETTING_LOCALE.getCfgMb().name)
            .setDesc(SETTING_LOCALE.getCfgMb().desc)
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.mobile_settings.enable)
                    .onChange(async (value) => {
                        let next = {
                            ...this.plugin.settings,
                            mobile_settings: {
                                ...this.plugin.settings.mobile_settings,
                                enable: true,
                            }
                        };

                        await this.plugin.uptSettings(next);

                        this.__uptMbConfig(mobileConfigInp, value);

                        this.__updateErrors();
                    });

                return toggle;
            });

        let mobileConfigInp = new TextAreaComponent(containerEl)
            .setPlaceholder('txt, conf, config, data, logs')
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

        containerEl.createEl('h3', { text: 'Errors' });
        this._errors = containerEl.createEl('p', { text: 'None' });
        this._errors.style.whiteSpace = 'pre-line';

        this.__updateErrors();

        containerEl.createEl('h2', { text: 'Advanced block' });

        const input1 = new Setting(containerEl)
            .setName(SETTING_LOCALE.getOnRf().name)
            .setDesc(SETTING_LOCALE.getOnRf().desc)
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

        new Setting(containerEl)
            .setName(SETTING_LOCALE.getOnRu().name)
            .setDesc(SETTING_LOCALE.getOnRu().desc)
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
    }

    private __uptMbConfig(mbConfigInput: TextAreaComponent, mbConfigEnabled: boolean): void {
        mbConfigInput.inputEl.style.display = mbConfigEnabled ? 'block' : 'none';
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
