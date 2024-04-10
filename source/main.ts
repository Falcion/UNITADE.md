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
            const filename: string[] = file.name.split('.').splice(1);

            if (this.settings.is_ignore) {
                for (const mask of this.settings.ignore_masks.split(';')) {
                    const _mask = mask.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                    try {
                        const regex = new RegExp(_mask);
                        if (regex.test(file.name)) {
                            return;
                        }
                    } catch (error) {
                        console.error('Error creating regular expression:', error);
                    }
                }
            }


            if (this.settings.is_onload) {
                if (this.settings.ignore_extensions.split(';').includes(filename.last()!) && this.settings.is_ignore)
                    return;
                if (this.settings.extensions.split(';').includes(filename.last()!))
                    return;
                if (this.settings.mobile_settings.enable &&
                    this.settings.mobile_settings.extensions.split(';').includes(filename.last()!))
                    return;

                try {
                    this.__tryApply(filename.last()!, 'markdown');

                    let __settings = this.settings.extensions.split(';');

                    __settings.push(`${filename.last()!}`);

                    this.settings.extensions = __settings.join(';');

                    if (this.settings.mobile_settings.enable) {

                        let __mb_settings = this.settings.mobile_settings.extensions.split(';');

                        __mb_settings.push(`${filename.last()!}`);

                        this.settings.mobile_settings.extensions = __mb_settings.join(';');
                    }
                } catch (err: any) {
                    new Notification('Error from UNITADE plugin:', { body: `Error with on-load registry of: ${filename.last()!}};` });

                    console.error(err);
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

                        let __settings = this.settings.extensions.split(';');

                        __settings.push(`${extension}`);

                        this.settings.extensions = __settings.join(';');

                        if (this.settings.mobile_settings.enable) {
                            let __mb_settings = this.settings.mobile_settings.extensions.split(';');

                            __mb_settings.push(`${extension}`);

                            this.settings.mobile_settings.extensions = __mb_settings.join(';');
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

        this.app.workspace.layoutReady ? this.ltReady() : this.app.workspace.on('active-leaf-change', this.ltReady);

        this.__apply();
    }

    ltReady = () => {
        this.app.workspace.off('layout-ready', this.ltReady);
        this.leafRfsh();
    }

    leafRfsh = () => {
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

            this.settings.errors['markdown_override'] = `Error with reregistering extensions: ${err}`;
        }

        for (const key in CodeMirror.modes) {
            if (CodeMirror.modes.hasOwnProperty(key) && !['hypermd', 'markdown', 'null', 'xml'].includes(key))
                delete CodeMirror.modes[key];
        }

        this.leafRfsh();
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
                new Notification('Error from UNITADE plugin:', { body: `${err}` });

                this.settings.errors[extension] = `Error from UNITADE plugin: ${err}`;

                console.error(err);
            }
        }
    }

    public apply(): void {
        this.__apply();
    }

    private __tryApply(filetype: string, view: string) {
        if (!this.settings.markdown_overcharge && ['md', 'mdown', 'markdown'].includes(filetype))
            return;

        /**@ts-expect-error */
        if (this.app.viewRegistry.isExtensionRegistered(filetype))
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

    private __applyCfg(extensions: string, view: string): void {
        this.settings.errors = {};

        if (this.settings.debug_mode)
            //@ts-expect-error
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

    private __unapplyCfg(extensions: string, markdown_charge: boolean) {
        const ext_arr: string[] = extensions.split(';').map(s => s.trim());

        for (const extension of ext_arr)
            if (markdown_charge || extension !== 'md')
                if (!this._settings.errors[extension]) {
                    try {
                        /**@ts-expect-error */
                        this.app.viewRegistry.unregisterExtensions([extension]);
                    } catch (err: any) {
                        const _msg = `Couldn't unregistry extension: ${extension};`

                        new Notification('Error from UNITADE plugin:', { body: _msg });

                        this.settings.errors[extension] = _msg;

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

function parsegroup(input: string): { [key: string]: string[] } {
    const settings: { [key: string]: string[] } = {};

    const settings_parsed = input.split(';');

    for (const setting of settings_parsed) {
        const [key, values] = setting.trim().split(':');

        if (values !== undefined) {
            const arr_values = values.split(',').map(value => value.trim());

            settings[key.trim()] = arr_values;
        } else {
            settings[key.trim()] = [];
        }
    }

    return settings;
}
