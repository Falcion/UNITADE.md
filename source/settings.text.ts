export default class SETTING_LOCALES {
    static getCfgRt(): { name: string, desc: string } {
        return {
            name: "Extensions:",
            desc: "Enter the file extensions that should be registered with the vault and with which the application should start registering (taking into account): input must be separated by semicolons (';').",
        };
    }

    static getCfgMb(): { name: string, desc: string } {
        return {
            name: "Mobile-specific:",
            desc: "Both this module's extensions and default specific extensions (if mobile settings are not set up) will be used on mobile devices if this mode is enabled.",
        };
    }

    static getMdOv(): { name: string, desc: string } {
        return {
            name: "Enable markdown override:",
            desc: "If enabled, on plugin's initialization, disables markdown from OBSIDIAN's registry."
        };
    }

    static getUlrd(): { name: string, desc: string } {
        return {
            name: "Unload plugin's registry",
            desc: "On click, causes imitation of disabling plugin, meaning, reloading registry of extensions in vault to default mode.",
        };
    }

    static getHlrd(): { name: string, desc: string } {
        return {
            name: "Hard-load plugin's registry",
            desc: "On click, causes imitation of enabling plugin, meaning, reloading registries which are defined and set up within user's settings."
        }
    }

    static getFrcInf(): { name: string, desc: string, msg: string } {
        return {
            name: "Forced-view extenions:",
            desc: "Entered extensions, would be tried to be initialized through codemirror setup of editors enabling extension's view in OBSIDIAN app.",
            msg: "This functionality is in semi-demo because of OBSIDIAN's API unsupport for such features, it is more unstable on mobile devices.",
        };
    }

    static getOnRf(): { name: string, desc: string, info: string } {
        return {
            name: "On-load extension registry",
            desc: "If enabled, plugin will now registry every file's extension (this setting: last part of extensions sequence) when OBSIDIAN catches event of new file appearing in vault.",
            info: "This mode is interchangeable (that is, disabled) when an unsafe on-load registry is enabled."
        };
    }

    static getOnRu(): { name: string, desc: string, info: string } {
        return {
            name: "On-load unsafe extension registry",
            desc: "If enabled, plugin will now registry every file's extension (this setting: every part of extensions sequence) when OBSIDIAN catches event of new file appearing in vault.",
            info: "This mode is interchangeable (that is, disabled) when an normal on-load registry is enabled."
        };
    }

    static getOnMsg(): { msg: string } {
        return {
            msg: "ATTENTION: this setting can cause a “spam attack” with extensions in the OBSIDIAN extension registry and damage some files due to the editing format of the application itself, be careful when using this functionality.",
        }
    }

    static getIgnInf(): { name: string, desc: string } {
        return {
            name: "Ignore mode:",
            desc: "If enabled, plugin now would ignore specified type extensions by user input and files by regular expressions.",
        };
    }

    static getIgnExt(): { name: string, desc: string } {
        return {
            name: "Ignore extensions:",
            desc: "Enter the file extensions that should be ignored by plugin before add to registry by on-load registry.",
        };
    }

    static getIgnMsk(): { name: string, desc: string } {
        return {
            name: "Ignore files (regular expressions):",
            desc: "Enter the file masks (regular expressions) by which files should be ignored by plugin.",
        };
    }

    static getIgnMsg(): { msg: string } {
        return {
            msg: "This settings works only for on-load registry functionality: meaning that ignoring extensions and files only works with only that functionality when the files are added to the vault.",
        };
    }

    static getGrpInf(): { name: string, desc: string } {
        return {
            name: "Grouped extensions:",
            desc: "Enter by specified syntax extensions which you want to treat as other custom extensions (groups are separated by (';') semicolons while values are separated by (',') commas).",
        };
    }

    static getGrpMsg(): { msg: string } {
        return {
            msg: "Keep in mind, this setting is unstable due entire infrastructure of plugin and OBSIDIAN's API, it is recommended to turn off every other setting and clear them if possible before using this module: you can setup every other module just in this block.",
        };
    }
}
