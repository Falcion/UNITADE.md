import { App, PluginManifest } from "obsidian";
import UNITADE_PLUGIN from "source/main";
import { DEFAULT_SETTINGS } from "source/settings";

export default class CompatibilityModule {
    private _app: App;
    private _plugin: UNITADE_PLUGIN;
    current_manifest: PluginManifest;

    constructor(app: App, plugin: UNITADE_PLUGIN) {
        this._app = app;
        this._plugin = plugin;
        /**@ts-expect-error */
        this.current_manifest = this._app.plugins.manifests['unitade'];
    }

    async start(): Promise<void> {
        const data = await this._plugin.loadData();
        const version = this.getVersion(data);

        if (version === this._plugin.settings.manifest_version) return;

        await this.convert(data, version);
    }

    private getVersion(data: any): string {
        if (data['version'] !== undefined) return `${data['version']}`;
        if (data['barefiling'] !== undefined) return '2.4';
        if (data['debug_mode'] !== undefined) return '2.1';
        if (data['grouped_extensions'] !== undefined) return '2.0';
        return '1.*';
    }

    private async convert(data: any, version: string): Promise<boolean> {
        const settingsMap: { [key: string]: any } = {
            '1.*': {
                extensions: data['extensions'].replace(',', ';'),
                forced_extensions: data['force_extensions'].replace(',', ';'),
                is_onload: Boolean(data['is_dynamic_on']),
            },
            '2.0': {
                extensions: data['extensions'].replace(',', ';'),
                grouped_extensions: data['grouped_extensions'].replace(',', '>'),
            },
            '2.1': {
                grouped_extensions: data['grouped_extensions'].replace(',', '>'),
            },
            '2.4': {
                grouped_extensions: data['grouped_extensions'].replace(',', '>'),
            },
        };

        const next = {
            ...DEFAULT_SETTINGS,
            ...this._plugin.settings,
            ...settingsMap[version],
            manifest_version: this.current_manifest.version,
        };

        await this._plugin.uptSettings(next);

        return true;
    }
}
