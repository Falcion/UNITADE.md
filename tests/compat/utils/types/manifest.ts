export interface PluginManifest {
    id: string;
    name: string;
    author: string;
    version: string;
    minAppVersion: string;
    description: string;
    authorUrl?: string;
    isDesktopOnly?: boolean;
}
