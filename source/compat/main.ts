import { PluginManifest } from 'obsidian';
import UnitadePlugin from '@main';
import { DEFAULT_SETTINGS } from '@settings/defaults';
import { ISettings } from '@settings/defaults_interface';
import { IVersionConverter } from './versions/converters_interface';
import { CONVERTERS } from '@compat/versions/converters';
import ICompatResult from '@compat/utils/types/compat_result';
import { VersionInfo } from '@compat/utils/types/version';
import makeNotice from '@compat/utils/functions/notice';

export default class modCompat {
    readonly plugin!: UnitadePlugin;
    private readonly _manifest?: PluginManifest;
    private readonly _converters?: IVersionConverter[];

    public get manifest(): PluginManifest {
        return this._manifest ?? this.initManifest();
    }

    public get converters(): IVersionConverter[] {
        return this._converters ?? this.initConverters();
    }

    constructor(plugin: UnitadePlugin) {
        this.plugin = plugin;

        this.init();
    }

    public init(): void {
        this.initManifest();
        this.initConverters();
    }

    /**
     * @description
     * Reads and initializes manifest of the plugin
     * in current vault
     * @throws
     * If manifest is undefined in unstable environments
     */
    public initManifest(): PluginManifest {
        const manifest = this.plugin.manifest;

        if (!manifest)
            throw new Error('Plugin manifest is undefined. Mod cannot be initialized.');

        return manifest;
    }

    private initConverters(): IVersionConverter[] {
        return CONVERTERS;
    }

    public async migrate(): Promise<ICompatResult> {
        try {
            const data = await this.plugin.loadData();

            if (!data) {
                console.info('No existing data found. Fresh installation detected.');

                return { migrated: false };
            }

            const {
                current,
                manifest
            } = this.getVersions(data);

            if (current === manifest) {
                makeNotice('[UNITADE]: SETTINGS ARE UP TO DATE.', 3000);
                //!TODO: debug mode
                return { migrated: false };
            }

            //!TODO: debug here

            return await this.perform(data, current);
        } catch (error) {
            const errors = error instanceof Error ? error.message : String(error);

            //!TODO: debug here

            return {
                migrated: false,
                errors: [errors],
            };
        }
    }

    private getVersions(data: any) {
        const info: VersionInfo = {
            current: undefined,
            manifest: this.plugin.manifest.version
        }

        if (
            (data.version !== undefined && data.version !== '') ||
            (data.manifest_version !== undefined && data.manifest_version !== '') ||
            (data.SYS_MANIFEST_VERSION !== undefined && data.SYS_MANIFEST_VERSION !== '')
        )
            info.current = String(data.version) || String(data.SYS_MANIFEST_VERSION) || String(data.manifest_version);

        if (!info.current)
            for (const converter of this.converters)
                if (converter.detect(data)) {
                    info.current = converter.version;
                    break;
                }

        return info;
    }

    private async perform(data: any, version?: string): Promise<ICompatResult> {
        if (!version)
            throw new Error('Unable to detect settings version for migration');

        const converter = this.converters.find(c => c.version === version);

        if (!converter)
            throw new Error(`No converter found for version: ${version}`);

        //! TODO debug here

        const converted = converter.convert(data);

        /*
         * Priority order: 
         * > versioning
         * > converted
         * > defaults
         */
        const merged: ISettings = {
            ...DEFAULT_SETTINGS,
            ...converted,
            SYS_MANIFEST_VERSION: this.manifest.version,
        };

        await this.plugin.uptSettings(merged);

        makeNotice(`[UNITADE]: MIGRATED SETTINGS FROM v${version} TO v${this.manifest.version}.`, 3000);

        //!TODO debug here

        return {
            migrated: true,
            versionSource: version,
            versionTarget: this.manifest.version,
            errors: [],
        }
    }
}
