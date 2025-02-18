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

import UNITADE_VIEW from './components/views/view_codemirror';

import CodeMirror from './../lib/codemirror';

import {
    TFileEdit
} from './components/modals/file-edit';
import {
    TFileCreate
} from './components/modals/file-create';
import {
    TFilesEdit
} from './components/modals/files-edit';
import {
    TFolderEdit
} from './components/modals/folder-edit';

import {
    getWorker,
    isTFolder
} from './utils/utils';

import {
    formatString,
    gencase,
    parsegroup
} from './utils/functions';
import { TFilesRename } from './components/modals/files-rename';
import CONSTANTS from './utils/constants';
import LocalesModule from './locales/core';
import { UNITADE_VIEW_CODE } from './components/views/view_monaco';
import { ContextEditor } from './components/contexts/contextEditor';
import { FenceEditModal } from './components/modals/codeblock-edit';
import { ContextEditCodeblocks } from './components/contextEditCodeblock';

declare module "obsidian" {
    interface Workspace {
        on(
            name: "hover-link",
            callback: (e: MouseEvent) => any,
            ctx?: any,
        ): EventRef;
    }
}

export default class UNITADE_PLUGIN extends Plugin {
    private _settings: UNITADE_SETTINGS = DEFAULT_SETTINGS;
    private _locale: LocalesModule = new LocalesModule();
    private _observer!: MutationObserver;

    public hover: {
        linkText: string;
        sourcePath: string;
        event: MouseEvent;
    } = {
            linkText: "",
            sourcePath: "",
            event: new MouseEvent(""),
        };

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

        window.MonacoEnvironment = {
            getWorker(_: string, label: string) {
                return getWorker(label);
            }
        }

        this.app.vault.on('create', async (file) => {
            const filename: string[] = file.name.split('.').splice(1);

            if (isTFolder(file)) return;

            if (this.settings.is_ignore) {
                for (const mask of this.settings.ignore_masks.split('>')) {
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

                if (this.settings.ignore_extensions.split('>').includes(total_extension!) && this.settings.is_ignore)
                    return;
                if (this.settings.extensions.split('>').includes(total_extension!))
                    return;
                if (this.settings.mobile_settings.enable &&
                    this.settings.mobile_settings.extensions.split('>').includes(total_extension!))
                    return;

                try {
                    this.__tryApply(total_extension!, 'markdown');

                    const __settings = this.settings.extensions.split('>');

                    __settings.push(`${total_extension!}`);

                    this.settings.extensions = __settings.join('>');

                    if (this.settings.mobile_settings.enable) {

                        const __mb_settings = this.settings.mobile_settings.extensions.split('>');

                        __mb_settings.push(`${total_extension!}`);

                        this.settings.mobile_settings.extensions = __mb_settings.join('>');
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
                    if (this.settings.ignore_extensions.split('>').includes(extension) && this.settings.is_ignore)
                        return;
                    if (this.settings.extensions.split('>').includes(extension))
                        return;
                    if (this.settings.mobile_settings.enable &&
                        this.settings.mobile_settings.extensions.split('>').includes(extension))
                        return;

                    try {
                        this.__tryApply(extension, 'markdown');

                        const __settings = this.settings.extensions.split('>');

                        __settings.push(`${extension}`);

                        this.settings.extensions = __settings.join('>');

                        if (this.settings.mobile_settings.enable) {
                            const __mb_settings = this.settings.mobile_settings.extensions.split('>');

                            __mb_settings.push(`${extension}`);

                            this.settings.mobile_settings.extensions = __mb_settings.join('>');
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
        this.registerEvent(this.__ctxFence());

        this._observer = new MutationObserver(async (mutation) => {
            if (mutation.length !== 1) return;
            if (mutation[0].addedNodes.length !== 1) return;
            if (this.hover.linkText === null) return;

            //@ts-expect-error Accessing runtime API
            if (mutation[0].addedNodes[0].className !== "popover hover-popover") return;
            const file = this.app.metadataCache.getFirstLinkpathDest(this.hover.linkText, this.hover.sourcePath);
            if (!file) return;

            let valid: boolean = false;

            if (!this.settings.code_editor_settings.use_default_extensions)
                valid = this.settings.code_editor_settings.extensions.includes(file.extension);
            else
                valid = this.settings.extensions.includes(file.extension);

            if (valid === false) return;
            const fileContent = await this.app.vault.read(file);

            const node: Node = mutation[0].addedNodes[0];
            const contentEl = createDiv();

            new ContextEditor(
                contentEl,
                this,
                fileContent,
                file.extension,
                false,
                true
            );

            const w = 700;
            const h = 500;
            const gep = 10;
            if (node instanceof HTMLDivElement) {
                const x = this.hover.event.clientX;
                const y = this.hover.event.clientY;
                const target = this.hover.event.target as HTMLElement;
                const targetRect = target.getBoundingClientRect();
                const targetTop = targetRect.top;
                const targetBottom = targetRect.bottom;
                const targeRight = targetRect.right
                node.style.position = "absolute";
                node.style.left = `${x + gep}px`;

                const spaceBelow = window.innerHeight - y - gep * 3;
                const spaceAbove = y - gep * 3;
                if (spaceBelow > h) {
                    node.style.top = `${targetBottom + gep}px`;
                } else if (spaceAbove > h) {
                    node.style.top = `${targetTop - h - gep}px`;
                } else {
                    node.style.top = `${targetTop - (h / 2) - gep}px`;
                    node.style.left = `${targeRight + gep * 2}px`;
                }
            }

            contentEl.setCssProps({
                "width": `${w}px`,
                "height": `${h}px`,
                "padding-top": "10px",
                "padding-bottom": "10px",
            });

            node.empty();
            node.appendChild(contentEl);
        });

        this.registerEvent(this.app.workspace.on("hover-link", async (event: any) => {
            const linkText: string = event.linktext;
            const sourcePath: string = event.sourcePath;

            if (!linkText || !sourcePath) return;

            this.hover.linkText = linkText;
            this.hover.sourcePath = sourcePath;
            this.hover.event = event.event;
        }));

        this._observer.observe(document, { childList: true, subtree: true });

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

    private __ctxFence(): EventRef {
        return this.app.workspace.on("editor-menu", (menu) => {
            if (!ContextEditCodeblocks.create(this).isInFence()) {
                return;
            }
            menu.addItem((item) => {
                item.setTitle(this.locale.getLocaleItem("MODAL_EDIT_FENCE")[0]!)
                    .setIcon("code")
                    .onClick(() => {
                        FenceEditModal.openOnCurrentCode(this);
                    });
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

        this._observer.disconnect();

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
     * and forced extensions and etc, handling each case according to the settings provided by the user.
     * @private
     * @returns {void}
     */
    private __apply(): void {
        /**@ts-expect-error: not part of public API, accessing through runtime. */
        if (this.app.viewRegistry.viewByType['codeview'] === undefined ||
            /**@ts-expect-error: not part of public API, accessing through runtime. */
            this.app.viewRegistry.viewByType['codeview'] === null)
            this.registerView('codeview', leaf => new UNITADE_VIEW_CODE(leaf, this));

        if (this.settings.is_grouped) {
            const data: { [key: string]: string[] } = parsegroup(this.settings.grouped_extensions);

            for (const view in data) {
                this.__applyCfg(data[view].join('>'), view);
            }
        }

        if (this.is_mobile) {
            if (!this.settings.code_editor_settings.use_default_extensions)
                this.__applyCfg(this.settings.mobile_settings.extensions ?? this.settings.extensions, 'markdown');
        } else {
            if (!this.settings.code_editor_settings.use_default_extensions)
                this.__applyCfg(this.settings.extensions, 'markdown');
        }

        if (this.settings.code_editor_settings.enabled) {
            if (this.settings.code_editor_settings.use_default_extensions) {
                if (this.is_mobile)
                    this.__applyCfg(this.settings.mobile_settings.extensions ?? this.settings.extensions, 'codeview');
                else
                    this.__applyCfg(this.settings.extensions, 'codeview');
            }
            else {
                this.__applyCfg(this.settings.code_editor_settings.extensions, 'codeview');
            }
        }

        const forced_extensions = this.settings.forced_extensions.split('>').map(s => s.trim());

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

        const extensions_arr: string[] = extensions.split('>').map(s => s.trim());

        for (const extension of extensions_arr) {
            if (this.settings.safe_mode && view === 'markdown' && CONSTANTS.unsafeExtensions.contains(extension.toLowerCase())) {
                if (this.settings.debug_mode)
                    console.debug('[UNITADE]: Skipped unsafe extension:', extension);

                continue;
            }

            if (this.settings.is_ignore && this.settings.ignore_extensions.split('>').includes(extension))
                continue;

            // If we ignore case difference (example: Windows systems)
            if (this.settings.is_case_insensitive) {
                const rnd_filetype = gencase(extension);

                for (const type of rnd_filetype)
                    this.__tryApply(type, view);
            } // Case sensitive (UNIX-like)
            else {
                this.__tryApply(extension, view);
            }
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
        const ext_arr: string[] = extensions.split('>').map(s => s.trim());

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
