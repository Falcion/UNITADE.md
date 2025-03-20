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
import StatusBarConfig from './externals/samples/statusBarConfig';
import StatusBarParser from './externals/samples/statusBarParser';
import { PromptUserInput } from './components/modals/prompt-user-input';

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

    private _statusBar!: HTMLElement;
    public statusBarConfig: StatusBarConfig = new StatusBarConfig(this._locale);

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

        this._statusBar = this.addStatusBarItem();

        window.MonacoEnvironment = {
            getWorker(_: string, label: string) {
                return getWorker(label);
            }
        }

        //#region Commands
        this.addCommand({
            id: 'unitade-toggle-safe-mode',
            name: this.locale.getLocaleItem('COMMAND_TOGGLE_SAFE')[0]!,
            hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 's' }],
            callback: () => {
                const next = {
                    ...this.settings,
                    safe_mode: !this.settings.safe_mode,
                };

                this.uptSettings(next);
            }
        });

        this.addCommand({
            id: 'unitade-toggle-case-insensitive',
            name: this.locale.getLocaleItem('COMMAND_TOGGLE_CASE_INSENSITIVE')[0]!,
            hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'c' }],
            callback: () => {
                const next = {
                    ...this.settings,
                    is_case_insensitive: !this.settings.is_case_insensitive
                };

                this.uptSettings(next);
            }
        });

        this.addCommand({
            id: 'unitade-toggle-markdown-overcharge',
            name: this.locale.getLocaleItem('COMMAND_TOGGLE_MD_OVERCHARGE')[0]!,
            hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'm' }],
            callback: () => {
                const next = {
                    ...this.settings,
                    markdown_overcharge: !this.settings.markdown_overcharge
                };

                this.uptSettings(next);
            }
        });

        this.addCommand({
            id: 'unitade-add-markdown-extensions',
            name: this.locale.getLocaleItem('COMMAND_ADD_DEFAULT_EXTENSIONS')[0]!,
            callback: () => {
                new PromptUserInput(this.app, this.locale.getLocaleItem('COMMAND_ADD_DEFAULT_EXTENSIONS')[1]!, this.locale, (result) => {
                    const extensions: string = result;
                    if (!extensions) return;

                    const data = extensions.split('>').filter(x => !this.settings.extensions.split('>').includes(x));

                    if (data.length > 0) {

                        const next = {
                            ...this.settings,
                            extensions: (this.settings.extensions + `>${data.join('>')}`)
                        };

                        this.uptSettings(next);
                    }
                }).open();
            }
        });

        this.addCommand({
            id: 'unitade-add-code-extensions',
            name: this.locale.getLocaleItem('COMMAND_ADD_CODE_EXTENSIONS')[0]!,
            callback: () => {
                console.log('Called add code extensions modal!');
                new PromptUserInput(this.app, this.locale.getLocaleItem('COMMAND_ADD_CODE_EXTENSIONS')[1]!, this.locale, (result) => {
                    const extensions: string = result;
                    if (!extensions) return;

                    const data = extensions.split('>').filter(x => !this.settings.code_editor_settings.extensions.split('>').includes(x));

                    if (data.length > 0) {

                        const next = {
                            ...this.settings,
                            code_editor_settings: {
                                ...this.settings.code_editor_settings,
                                extensions: (this.settings.code_editor_settings.extensions + `>${data.join('>')}`)
                            }
                        };

                        this.uptSettings(next);
                    }
                }).open();
            }
        });
        //#endregion

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
        });

        if (this.app.workspace.layoutReady)
            this.updateStatusBar();

        if (this._settings.markdown_overcharge)

            this.app.viewRegistry.unregisterExtensions(['md']);

        this.addSettingTab(new UNITADE_SETTINGS_TAB(this.app, this));

        this.app.workspace.layoutReady ? this.ltReady(this.app) : this.app.workspace.on('layout-change', () => {
            this.ltReady(this.app);
        });

        this.registerEvent(this.__ctxEditExt());
        this.registerEvent(this.__ctxEditExts());
        this.registerEvent(this.__ctxFence());

        this.registerEvent(this.app.workspace.on("editor-change", (editor) => {
            if (this.settings.debug_mode && this.settings.status_bar.cursor_position)
                console.debug('[UNITADE] CHECKED CURSOR POSITION OF EDITOR-CHANGE EVENT:', editor.getCursor());

            this.statusBarConfig.update({
                cursor_columns: editor.getCursor().ch,
                cursor_lines: editor.getCursor().line,
            });

            this.updateStatusBar();
        }));

        this.registerEvent(this.app.workspace.on("active-leaf-change", async (leaf) => {
            if (!leaf)
                return;

            const editor = this.app.workspace.activeEditor?.editor;
            let registered_extensions: number = 0;

            const {
                extensions,
                grouped_extensions,
                code_editor_settings
            } = this.settings;

            const globalExtensionsByView = parsegroup(grouped_extensions);

            if (!globalExtensionsByView['codeview'])
                globalExtensionsByView['codeview'] = [];
            if (!globalExtensionsByView['markdown'])
                globalExtensionsByView['markdown'] = [];

            if (code_editor_settings.enabled)
                globalExtensionsByView['codeview'] = globalExtensionsByView['codeview'].concat(code_editor_settings.use_default_extensions
                    ? extensions.split('>')
                    : code_editor_settings.extensions.split('>'));

            globalExtensionsByView['markdown'] = globalExtensionsByView['markdown'].concat(extensions.split('>'));

            const viewType = leaf.getViewState().type;

            if (this.settings.status_bar.registered_extensions.include_extensions)
                registered_extensions += globalExtensionsByView['markdown'].length;
            if (this.settings.status_bar.registered_extensions.include_code_editor_extensions)
                registered_extensions += globalExtensionsByView['codeview'].length;
            if (this.settings.status_bar.registered_extensions.include_extensions_grouped) {
                const views = Object.keys(globalExtensionsByView).filter(view => (view !== 'markdown' && view !== 'codeview'));

                for (const view in views)
                    try {
                        registered_extensions += globalExtensionsByView[view].length;
                    } catch {
                        registered_extensions += 0;
                    }
            }

            if (!editor)
                return;

            const cursor = editor.getCursor();

            if (this.settings.debug_mode && this.settings.status_bar.cursor_position)
                console.debug('[UNITADE] CHECKED CURSOR POSITION OF LEAF-CHANGE EVENT:', cursor);

            this.statusBarConfig.update({
                cursor_columns: cursor.ch,
                cursor_lines: cursor.line,
                display: viewType,
                processor: 'obsidian',

                registered_views: Object.keys(this.app.viewRegistry.viewByType).length,
                registered_extensions: registered_extensions
            });

            this.updateStatusBar();
        }));

        if (this.settings.debug_mode)
            console.debug('[UNITADE]: Initializing custom markdown postprocessor.');

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

    //#region Status bar update
    public updateStatusBar(): void {
        if (this.settings.status_bar.enabled) {
            const data: string[] = new StatusBarParser(this._locale, this.statusBarConfig).generateText();

            let text: string = '';

            if (this.settings.status_bar.current_processor)
                text += data[0];
            if (this.settings.status_bar.registered_extensions.enabled)
                text += (data[1].split(',')[0] + '');
            if (this.settings.status_bar.registered_views)
                text += data[1].split(',')[1];
            if (this.settings.status_bar.cursor_position)
                text += data[2];
            if (this.settings.status_bar.current_display)
                text += data[3];

            if (this.settings.debug_mode)
                console.debug('[UNITADE] STATUS BAR UPDATE: ' + text);

            this._statusBar.setText(text);
        } else {
            this._statusBar.setText('');
        }
    }
    //#endregion

    //#region Modals block
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
    //#endregion

    //#region Working with leafs
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
    //#endregion

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

        if (this.settings.status_bar.enabled)
            this._statusBar.remove();
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

    /**
     * This function updates specific visual settings and data without reapplying
     * the entire context for the plugin. Useful for updating visuals, dynamic settings, etc.
     * @param partialUpdates Partial settings to update
     */
    async uptSettingsVisuals(partialUpdates: {
        code_editor_settings?: Partial<UNITADE_SETTINGS['code_editor_settings']>;
        status_bar?: Partial<UNITADE_SETTINGS['status_bar']>;
        mobile_settings?: Partial<UNITADE_SETTINGS['mobile_settings']>;
        [key: string]: any;
    }): Promise<void> {
        // Perform a deep merge of current settings 
        // and partial updates
        const deepMerge = (target: any, source: any) => {
            for (const key of Object.keys(source)) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    if (!target[key] || typeof target[key] !== 'object') {
                        target[key] = {};
                    }
                    deepMerge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        };

        deepMerge(this._settings, partialUpdates);

        await this.saveData(this._settings);
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

        if (this.app.viewRegistry.viewByType['codeview'] === undefined ||

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


        if (this.app.viewRegistry.isExtensionRegistered(filetype))
            return;

        try {
            this.registerExtensions([filetype], view);
        } catch (err: any) {

            const curr: string | undefined = this.app.viewRegistry.getTypeByExtension(filetype);

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

        for (const extensionKey in this.app.viewRegistry.typeByExtension) {

            this.app.viewRegistry.unregisterExtensions([extensionKey]);
        }
    }

    private __unapplyCfg(extensions: string, markdown_charge: boolean) {
        const ext_arr: string[] = extensions.split('>').map(s => s.trim());

        for (const extension of ext_arr)
            if (markdown_charge || extension !== 'md')
                if (!this._settings.errors[extension]) {
                    try {
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
