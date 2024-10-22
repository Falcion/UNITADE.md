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
    EventRef,
    Platform,
    Plugin,
    WorkspaceLeaf,
} from 'obsidian';

import UNITADE_SETTINGS_TAB, {
    UNITADE_SETTINGS,
    DEFAULT_SETTINGS,
} from './settings';

import UNITADE_VIEW from './components/view';

import CodeMirror from './../lib/codemirror';

import {
    TFileEdit
} from './components/file-edit';
import {
    TFileCreate
} from './components/file-create';
import {
    TFilesEdit
} from './components/files-edit';
import {
    TFolderEdit
} from './components/folder-edit';

import {
    isTFolder
} from './utils/utils';

import {
    formatString,
    gencase,
    parsegroup
} from './utils/functions';
import { TFilesRename } from './components/files-rename';
import CONSTANTS from './utils/constants';
import LocalesModule from './locales/core';

export default class UNITADE_PLUGIN extends Plugin {
    private _settings: UNITADE_SETTINGS = DEFAULT_SETTINGS;
    private _locale: LocalesModule = new LocalesModule();

    public get settings(): UNITADE_SETTINGS {
        return this._settings;
    }

    public get locale(): LocalesModule {
        return this._locale;
    }

    public get is_mobile(): boolean {
        return Platform.isMobile && this.settings.mobile_settings.enable;
    }

    async onload(): Promise<void> {
        super.onload();

        await this.ldSettings();

        this.app.vault.on('create', async (file) => {
            const filename: string[] = file.name.split('.').splice(1);

            if (isTFolder(file)) return;

            if (this.settings.is_ignore) {
                for (const mask of this.settings.ignore_masks.split(';')) {
                    const _mask = mask.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                    try {
                        const regex = new RegExp(_mask);
                        if (regex.test(file.name)) {
                            return;
                        }
                    } catch (error) {
                        if (!this.settings.silence_errors) {
                            console.error(error);
                        } else {
                            console.debug(`[UNITADE-ERROR]: ERROR IS SILENCED, ERROR: ${error}`);
                        }
                    }
                }
            }

            if (this.settings.is_onload) {
                const total_extension = filename.join('.');

                if (this.settings.ignore_extensions.split(';').includes(total_extension!) && this.settings.is_ignore)
                    return;
                if (this.settings.extensions.split(';').includes(total_extension!))
                    return;
                if (this.settings.mobile_settings.enable &&
                    this.settings.mobile_settings.extensions.split(';').includes(total_extension!))
                    return;

                try {
                    this.__tryApply(total_extension!, 'markdown');

                    const __settings = this.settings.extensions.split(';');

                    __settings.push(`${total_extension!}`);

                    this.settings.extensions = __settings.join(';');

                    if (this.settings.mobile_settings.enable) {

                        const __mb_settings = this.settings.mobile_settings.extensions.split(';');

                        __mb_settings.push(`${total_extension!}`);

                        this.settings.mobile_settings.extensions = __mb_settings.join(';');
                    }
                } catch (err: any) {
                    if (!this.settings.silence_errors) {
                        new Notification(this.locale.getLocaleItem('ERROR_COMMON_MESSAGE')[0]!, { body: `${err}` });

                        console.error(err);
                    } else {
                        console.debug(`[UNITADE-ERROR]: ERROR IS SILENCED, ERROR: ${err}`);
                    }
                }
            }

            if (this.settings.is_onload_unsafe) {
                const extensions: string[] = filename;

                for (const extension of extensions) {
                    if (this.settings.ignore_extensions.split(';').includes(extension) && this.settings.is_ignore)
                        return;
                    if (this.settings.extensions.split(';').includes(extension))
                        return;
                    if (this.settings.mobile_settings.enable &&
                        this.settings.mobile_settings.extensions.split(';').includes(extension))
                        return;

                    try {
                        this.__tryApply(extension, 'markdown');

                        const __settings = this.settings.extensions.split(';');

                        __settings.push(`${extension}`);

                        this.settings.extensions = __settings.join(';');

                        if (this.settings.mobile_settings.enable) {
                            const __mb_settings = this.settings.mobile_settings.extensions.split(';');

                            __mb_settings.push(`${extension}`);

                            this.settings.mobile_settings.extensions = __mb_settings.join(';');
                        }
                    } catch (err: any) {
                        if (!this.settings.silence_errors) {
                            new Notification(this.locale.getLocaleItem('ERROR_COMMON_MESSAGE')[0]!, { body: `${extensions}` });

                            console.error(err);
                        } else {
                            console.debug(`[UNITADE-ERROR]: ERROR IS SILENCED, ERROR: ${err}`);
                        }
                    }
                }
            }
        })

        if (this._settings.markdown_overcharge)
            /**@ts-expect-error: viewRegistry exists in runtime, but not in Obsidian's public API */
            this.app.viewRegistry.unregisterExtensions(['md']);

        this.addSettingTab(new UNITADE_SETTINGS_TAB(this.app, this));

        this.app.workspace.layoutReady ? this.ltReady(this.app) : this.app.workspace.on('layout-change', () => { this.ltReady(this.app); });

        this.registerEvent(this.__ctxEditExt());
        this.registerEvent(this.__ctxEditExts());

        this.__apply();
    }

    private __ctxEditExt(): EventRef {
        return this.app.workspace.on('file-menu', (menu, file) => {
            menu
                .addItem((item) => {
                    item.setTitle(this.locale.getLocaleItem('MODAL_EDIT_EXTENSION')[0]!);
                    item
                        .setIcon('pencil')
                        .onClick(() => {
                            if (isTFolder(file)) {
                                new TFolderEdit(this, file)
                                    .open();
                            } else {
                                new TFileEdit(this, file)
                                    .open();
                            }
                        });
                })
                .addItem((item) => {
                    item.setTitle(this.locale.getLocaleItem('MODAL_CREATE_WITH_EXTENSION')[0]!);
                    item
                        .setIcon('pencil')
                        .onClick(() => {
                            if (isTFolder(file)) {
                                new TFileCreate(this, file.path)
                                    .open();
                            } else {
                                new TFileCreate(this, file.parent!.path)
                                    .open();
                            }
                        });
                });
        });
    }

    private __ctxEditExts(): EventRef {
        return this.app.workspace.on('files-menu', (menu, files) => {
            menu
                .addItem((item) => {
                    item.setTitle(this.locale.getLocaleItem('MODAL_EDIT_MULTIPLE')[0]!);
                    item
                        .setIcon('pencil')
                        .onClick(() => {
                            new TFilesEdit(this, files)
                                .open();
                        });
                })
                .addItem((item) => {
                    item.setTitle(this.locale.getLocaleItem('MODAL_EDIT_MULTIPLE')[1]!);
                    item
                        .setIcon('pencil')
                        .onClick(() => {
                            new TFilesRename(this, files)
                                .open();
                        })
                });
        });
    }

    ltReady(_app: App): void {
        try {
            _app.workspace.off('layout-ready', () => { this.ltReady(_app); });

            this.leafRef(_app);
        } catch (error) {
            console.warn('CAUGHT AN ERROR VIA LAYOUT-READY EVENT.');
        }
    }

    leafRef(_app: App): void {
        try {
            /**@ts-expect-error: not part of public API, accessing through runtime. */
            _app.workspace.iterateCodeMirrors(cm => cm.setOption("mode", cm.getOption("mode")));
        } catch (error) {
            console.warn('CAUGHT AN ERROR VIA LEAF-ITERATE EVENT.');
        }
    }

    async onunload(): Promise<void> {
        super.onunload();

        this.__unapply(this.settings);

        try {
            this.registerExtensions(['.md'], 'markdown');
        } catch (err: any) {
            if (!this.settings.silence_errors) {
                new Notification(this.locale.getLocaleItem('ERROR_COMMON_MESSAGE')[0]!, { body: err });

                console.error(err);
            } else {
                console.debug(`[UNITADE-ERROR]: ERROR IS SILENCED, ERROR: ${err}`);
            }

            this.settings.errors['markdown_override'] = formatString(this.locale.getLocaleItem('ERROR_REGISTRY_EXTENSION')[3]!, err);
        }

        for (const key in CodeMirror.modes) {
            if (Object.prototype.hasOwnProperty.call(CodeMirror.modes, key) && !['hypermd', 'markdown', 'null', 'xml'].includes(key))
                delete CodeMirror.modes[key];
        }

        this.leafRef(this.app);
    }

    async ldSettings(): Promise<void> {
        this._settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async uptSettings(upt_settings: UNITADE_SETTINGS): Promise<void> {
        this.__unapply(upt_settings);

        this._settings = upt_settings;

        await this.saveData(this.settings);

        this.__apply();
    }

    //! MAIN METHOD OF ENTIRE PLUGIN:
    //! Configures and applies everything from the settings.
    /**
     * This method configures and applies the settings for grouped extensions, mobile settings,
     * and forced extensions in the UNITADE plugin. It parses and applies configurations based on
     * the current plugin settings. The method works differently for grouped extensions, mobile extensions,
     * and forced extensions, handling each case according to the settings provided by the user.
     * 
     * ### Grouped Extensions:
     * If the `is_grouped` setting is enabled, it parses the `grouped_extensions` string into key-value pairs
     * where each key is a view (such as 'markdown', 'pdf') and each value is an array of extensions. The method
     * applies these configurations for each view by calling `__applyCfg`.
     * 
     * ### Mobile Settings:
     * If the plugin is running in a mobile environment (`is_mobile` is true), the mobile extensions are configured.
     * It applies either the mobile-specific extensions or falls back to the default extensions, then configures
     * the 'markdown' view for those extensions.
     * 
     * ### Forced Extensions:
     * The method also processes forced extensions, registering custom views for each forced extension defined
     * in the settings. If an error occurs during this registration, it logs the error in the `errors` object and
     * optionally displays a notification or logs a debug message if `silence_errors` is enabled.
     * 
     * @private
     * @returns {void}
     */
    private __apply(): void {
        if (this.settings.is_grouped) {
            const data: { [key: string]: string[] } = parsegroup(this.settings.grouped_extensions);

            for (const view in data) {
                this.__applyCfg(data[view].join(';'), view);
            }
        }

        if (this.is_mobile) {
            this.__applyCfg(this.settings.mobile_settings.extensions ?? this.settings.extensions, 'markdown');
        } else {
            this.__applyCfg(this.settings.extensions, 'markdown');
        }

        const forced_extensions = this.settings.forced_extensions.split(';').map(s => s.trim());

        for (const extension of forced_extensions) {
            try {
                this.registerView(extension, (leaf: WorkspaceLeaf) => {
                    return new UNITADE_VIEW(leaf, extension);
                });
            } catch (err: any) {
                this.settings.errors[extension] = `${this.locale.getLocaleItem('ERROR_COMMON_MESSAGE')[0]!} ${err}`;

                if (!this.settings.silence_errors) {
                    new Notification(this.locale.getLocaleItem('ERROR_COMMON_MESSAGE')[0]!, { body: `${err}` });

                    console.error(err);
                } else {
                    console.debug(`[UNITADE-ERROR]: ERROR IS SILENCED, ERROR: ${err}`);
                }
            }
        }
    }

    public apply(): void {
        this.__apply();
    }

    public applyDefaults(): void {
        for (const defaultView in CONSTANTS.defaultExtensions) {
            this.registerExtensions(CONSTANTS.defaultExtensions[defaultView], defaultView);
        }
    }

    public tryApply(filetype: string, view: string): void {
        this.__tryApply(filetype, view);
    }

    private __tryApply(filetype: string, view: string): void {
        if (!this.settings.markdown_overcharge && ['md', 'mdown', 'markdown'].includes(filetype))
            return;

        /**@ts-expect-error: not part of public API, accessing through runtime. */
        if (this.app.viewRegistry.isExtensionRegistered(filetype))
            return;

        try {
            this.registerExtensions([filetype], view);
        } catch (err: any) {
            /**@ts-expect-error: not part of public API, accessing through runtime. */
            const curr: string = this.app.viewRegistry.getTypeByExtension(filetype);

            let _msg: string;

            if (curr) {
                _msg = formatString(this.locale.getLocaleItem('ERROR_REGISTRY_EXTENSION')[0]!, filetype, view);
            } else {
                _msg = formatString(this.locale.getLocaleItem('ERROR_REGISTRY_EXTENSION')[1]!, filetype, view, err);
            }

            if (!this.settings.silence_errors) {
                new Notification(this.locale.getLocaleItem('ERROR_COMMON_MESSAGE')[0]!, { body: _msg });

                console.error(_msg);
            } else {
                console.debug(`[UNITADE-ERROR]: ERROR IS SILENCED, ERROR: ${_msg}`);
            }

            this._settings.errors[filetype] = _msg;
        }
    }

    private __applyCfg(extensions: string, view: string): void {
        this.settings.errors = {};

        if (this.settings.debug_mode)
            /**@ts-expect-error: not part of public API, accessing through runtime. */
            console.info(this.app.viewRegistry.typeByExtension);

        const extensions_arr: string[] = extensions.split(';').map(s => s.trim());

        for (const extension of extensions_arr) {
            if (this.settings.is_ignore && this.settings.ignore_extensions.split(';').includes(extension))
                continue;

            const rnd_filetype = gencase(extension);

            for (const type of rnd_filetype)
                this.__tryApply(type, view);
        }
    }

    private __unapply(upt_settings: UNITADE_SETTINGS): void {
        if (this.is_mobile) {
            this.__unapplyCfg(this.settings.mobile_settings.extensions ?? this.settings.extensions, upt_settings.markdown_overcharge);
        } else {
            this.__unapplyCfg(this.settings.extensions, upt_settings.markdown_overcharge);
        }
    }

    public unapply(): void {
        this.__unapply(this.settings);
    }

    public unapplyRegistry(): void {
        /**@ts-expect-error: not part of public API, accessing through runtime. */
        for (const extensionKey in this.app.viewRegistry.typeByExtension) {
            /**@ts-expect-error: not part of public API, accessing through runtime. */
            this.app.viewRegistry.unregisterExtensions([extensionKey]);
        }
    }

    private __unapplyCfg(extensions: string, markdown_charge: boolean) {
        const ext_arr: string[] = extensions.split(';').map(s => s.trim());

        for (const extension of ext_arr)
            if (markdown_charge || extension !== 'md')
                if (!this._settings.errors[extension]) {
                    try {
                        /**@ts-expect-error: not part of public API, accessing through runtime. */
                        this.app.viewRegistry.unregisterExtensions([extension]);
                    } catch (err: any) {
                        const _msg = formatString(this.locale.getLocaleItem('ERROR_REGISTRY_EXTENSION')[2]!, extension);

                        this.settings.errors[extension] = _msg;

                        if (!this.settings.silence_errors) {
                            new Notification(this.locale.getLocaleItem('ERROR_COMMON_MESSAGE')[0]!, { body: _msg });

                            console.error(_msg);
                        } else {
                            console.debug(`[UNITADE-ERROR]: ERROR IS SILENCED, ERROR: ${_msg}`);
                        }
                    }
                }
    }
}
