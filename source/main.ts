import {
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

export default class UNITADE_PLUGIN extends Plugin {
    private _settings: UNITADE_SETTINGS = DEFAULT_SETTINGS;

    public get settings(): UNITADE_SETTINGS {
        return this._settings;
    }

    public get is_mobile(): boolean {
        return Platform.isMobile && this.settings.mobile_settings.enable;
    }

    async onload(): Promise<void> {
        super.onload();

        await this.ldSettings();

        this.app.vault.on('create', async (file) => {
            const filename: string[] = file.name.split('.');

            if (this.settings.is_onload) {
                if (this.settings.ignore_extensions.split(',').includes(filename.last()!))
                    return;
                if (this.settings.extensions.split(',').includes(filename.last()!))
                    return;
                if (this.settings.mobile_settings.enable &&
                    this.settings.mobile_settings.extensions.split(',').includes(filename.last()!))
                    return;

                try {
                    this.__tryApply(filename.last()!, 'markdown');

                    let __settings = this.settings.extensions.split(',');

                    __settings.push(`${filename.last()!}`);

                    this.settings.extensions = __settings.join(',');

                    if (this.settings.mobile_settings.enable) {

                        let __mb_settings = this.settings.mobile_settings.extensions.split(',');

                        __mb_settings.push(`, ${filename.last()!}`);

                        this.settings.mobile_settings.extensions = __mb_settings.join(',');
                    }
                } catch (err: any) {
                    new Notification('Error from UNITADE plugin:', { body: `Error with on-load registry of: ${filename.last()!}};` });

                    console.error(err);
                }
            }

            if (this.settings.is_onload_unsafe) {
                const extensions: string[] = filename.splice(0);

                for (const extension of extensions) {
                    if (this.settings.ignore_extensions.split(',').includes(extension))
                        continue;
                    if (this.settings.extensions.split(',').includes(extension))
                        return;
                    if (this.settings.mobile_settings.enable &&
                        this.settings.mobile_settings.extensions.split(',').includes(extension))
                        return;

                    try {
                        this.__tryApply(extension, 'markdown');

                        let __settings = this.settings.extensions.split(',');

                        __settings.push(`, ${extension}`);

                        this.settings.extensions = __settings.join(',');

                        if (this.settings.mobile_settings.enable) {
                            let __mb_settings = this.settings.mobile_settings.extensions.split(',');

                            __mb_settings.push(`, ${extension}`);

                            this.settings.mobile_settings.extensions = __mb_settings.join(', ');
                        }
                    } catch (err: any) {
                        new Notification('Error from UNITADE plugin:', { body: `Error with on-load registry of: ${extensions}` });

                        console.error(err);
                    }
                }
            }
        })

        if (this._settings.markdown_overcharge)
            /**@ts-expect-error */
            this.app.viewRegistry.unregisterExtensions(['md']);

        this.addSettingTab(new UNITADE_SETTINGS_TAB(this.app, this));

        this.app.workspace.layoutReady ? this.layoutReady() : this.app.workspace.on('active-leaf-change', this.layoutReady);

        this.__apply();
    }

    layoutReady = () => {
        this.app.workspace.off('layout-ready', this.layoutReady);
        this.refreshLeaves();
    }

    refreshLeaves = () => {
        /**@ts-expect-error */
        this.app.workspace.iterateCodeMirrors(cm => cm.setOption("mode", cm.getOption("mode")));
    }

    async onunload(): Promise<void> {
        super.onunload();

        this.__unapply(this.settings);

        try {
            this.registerExtensions(['.md'], 'markdown');
        } catch (err: any) {
            console.error(err);
        }

        for (const key in CodeMirror.modes) {
            if (CodeMirror.modes.hasOwnProperty(key) && !['hypermd', 'markdown', 'null', 'xml'].includes(key))
                delete CodeMirror.modes[key];
        }

        this.refreshLeaves();
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

    private __apply(): void {
        if (this.is_mobile) {
            this.__applyCfg(this.settings.mobile_settings.extensions ?? this.settings.extensions);
        } else {
            this.__applyCfg(this.settings.extensions);
        }

        if (this.settings.is_forced) {
            const forced_extensions = this.settings.forced_extensions.split(',').map(s => s.trim());

            for (const extension of forced_extensions) {
                try {
                    this.registerView(extension, (leaf: WorkspaceLeaf) => {
                        return new UNITADE_VIEW(leaf, extension);
                    });
                } catch (err: any) {
                    new Notification('Error from UNITADE plugin:', { body: `${err}` });

                    console.error(err);
                }
            }
        }
    }

    private __tryApply(filetype: string, view: string) {
        if (!this.settings.markdown_overcharge && ['md', 'mdown', 'markdown'].includes(filetype))
            return;

        /**@ts-expect-error */
        if (Object.keys(this.app.viewRegistry.typeByExtension).includes(filetype))
            return;

        try {
            this.registerExtensions([filetype], view);
        } catch (err: any) {
            /**@ts-expect-error */
            let curr: string = this.app.viewRegistry.getTypeByExtension(filetype);

            let _msg: string;

            if (curr) {
                _msg = `Could not register extension: ${filetype} to view as ${view}.\nIt's already registered.`;
            } else {
                _msg = `Could not register extension: ${filetype} to view as ${view}.\n${err}`;
            }

            new Notification('Error from UNITADE plugin:', { body: _msg });

            console.error(_msg);

            this._settings.errors[filetype] = _msg;
        }
    }

    private __applyCfg(extensions: string): void {
        this._settings.errors = {};

        const extensions_arr: string[] = extensions.split(',').map(s => s.trim());

        for (const extension of extensions_arr) {
            const rnd_filetype = gencase(extension);

            for (const type of rnd_filetype)
                this.__tryApply(type, 'markdown');
        }
    }

    private __unapply(upt_settings: UNITADE_SETTINGS): void {
        if (this.is_mobile) {
            this.__unapplyCfg(this.settings.mobile_settings.extensions ?? this.settings.extensions, upt_settings.markdown_overcharge);
        } else {
            this.__unapplyCfg(this.settings.extensions, upt_settings.markdown_overcharge);
        }
    }

    private __unapplyCfg(extensions: string, markdown_charge: boolean) {
        const ext_arr: string[] = extensions.split(',').map(s => s.trim());

        for (const extension of ext_arr)
            if (markdown_charge || extension !== 'md')
                if (!this._settings.errors[extension]) {
                    try {
                        /**@ts-expect-error */
                        this.app.viewRegistry.unregisterExtensions([extension]);
                    } catch (err: any) {
                        const _msg = `Couldn't unregistry extension: ${extension};`

                        new Notification('Error from UNITADE plugin:', { body: _msg });

                        console.error(_msg);
                    }
                }
    }
}

function gencase(input: string): string[] {
    const variations: string[] = [];

    function gen(current: string, index: number) {
        if (index === input.length) {
            variations.push(current);
            return;
        }

        const char = input[index];
        gen(current + char.toLowerCase(), index + 1);
        gen(current + char.toUpperCase(), index + 1);
    }

    gen('', 0);

    return variations;
}
