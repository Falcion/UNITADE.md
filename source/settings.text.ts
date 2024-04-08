export default class SETTING_LOCALES {
    static getCfgRt(): { name: string, desc: string } {
        return {
            name: "Extensions:",
            desc: "Enter the file extensions that should be registered with the vault and with which the application should start registering (taking into account)."
        };
    }

    static getCfgMb(): { name: string, desc: string } {
        return {
            name: "Mobile-specific:",
            desc: "Both this module's extensions and default specific extensions (if mobile settings are not set up) will be used on mobile devices if this mode is enabled."
        };
    }

    static getMdOv(): { name: string, desc: string } {
        return {
            name: "Enable markdown override:",
            desc: "If enabled, on plugin's initialization, disables markdown from OBSIDIAN's registry."
        };
    }

    static getOnRf(): { name: string, desc: string } {
        return {
            name: "On-load extension registry",
            desc: "If enabled, plugin will now registry every file's extension (last extension of file) when OBSIDIAN catches event of new file appearing in vault."
        };
    }

    static getOnRu(): { name: string, desc: string } {
        return {
            name: "On-load unsafe extension registry",
            desc: "If enabled, plugin will now registry every file's extension (every extension of file) when OBSIDIAN catches event of new file appearing in vault."
        };
    }
}
