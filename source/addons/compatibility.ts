import { App, PluginManifest } from "obsidian";
import UNITADE_PLUGIN from "../main";
import { DEFAULT_SETTINGS } from "../settings";

export default class CompatibilityModule {
    private _app: App;
    private _plugin: UNITADE_PLUGIN;
    current_manifest: PluginManifest;

    constructor(app: App, plugin: UNITADE_PLUGIN) {
        this._app = app;
        this._plugin = plugin;
        this.current_manifest = this._app.plugins.manifests['unitade'];
    }

    async start(): Promise<boolean> {
        const data = await this._plugin.loadData();

        if (!data) {
            console.debug('[UNITADE]\tCompatibility module tried to read data, while it is installed without any settings (first init).');

            return false;
        }

        const version = this.getVersion(data);

        if (version === this._plugin.settings.manifest_version) return false;

        await this.convert(data, version);

        return true;
    }

    private getVersion(data: any): string {
        if (data.version !== undefined) return `${data.version}`;
        if (data.barefiling !== undefined) return '2.4';
        if (data.debug_mode !== undefined) return '2.1';
        if (data.grouped_extensions !== undefined) return '2.0';
        return '1.*';
    }

    private async convert(data: any, version: string): Promise<boolean> {
        const settingsMap: { [key: string]: any } = {
            '1.*': {
                extensions: data.extensions?.replaceAll(',', '>') ?? '',
                forced_extensions: data.forced_extensions?.replaceAll(',', '>') ?? '',
                is_onload: Boolean(data.is_dynamic_on),
                mobile_settings: {
                    extensions: data.mobile_settings.extensions?.replaceAll(',', '>') ?? '',
                }
            },
            '2.0': {
                extensions: data.extensions?.replaceAll(',', '>') ?? '',
                grouped_extensions: data.grouped_extensions?.replaceAll(',', '>') ?? '',
                mobile_settings: {
                    extensions: data.mobile_settings.extensions?.replaceAll(',', '>') ?? '',
                }
            },
            '2.1': {
                grouped_extensions: data.grouped_extensions?.replaceAll(';', '>') ?? '',
                extensions: data.extensions?.replaceAll(';', '>') ?? '',
                forced_extensions: data.forced_extensions?.replaceAll(';', '>') ?? '',
                ignore_extensions: data.ignore_extensions?.replaceAll(';', '>') ?? '',
                ignore_masks: data.ignore_masks?.replaceAll(';', '>') ?? '',
                mobile_settings: {
                    extensions: data.mobile_settings.extensions?.replaceAll(';', '>') ?? '',
                }
            },
            '2.4': {
                grouped_extensions: data.grouped_extensions?.replaceAll(',', '>') ?? '',
                extensions: data.extensions?.replaceAll(';', '>') ?? '',
                forced_extensions: data.forced_extensions?.replaceAll(';', '>') ?? '',
                ignore_extensions: data.ignore_extensions?.replaceAll(';', '>') ?? '',
                ignore_masks: data.ignore_masks?.replaceAll(';', '>') ?? '',
                mobile_settings: {
                    extensions: data.mobile_settings.extensions?.replaceAll(';', '>') ?? '',
                }
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
