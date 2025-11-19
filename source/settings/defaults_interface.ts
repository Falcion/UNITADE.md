/*
 * MIT License
 *
 * Copyright (c) 2023-2025 Falcion
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

/**
 * @description
 * All of the settings of the plugin.
 * @interface
 * Interface with all the settings of plugin in it, including
 * system and self-categorized interfaces.
 * @see
 * <https://github.com/Falcion/UNITADE.md/wiki/>
 */
export interface ISettings {
    /**
     * @private
     * Represents system setting to hold errors and to read/display them in settings.
     * @since
     * Implemented in v2*
     */
    ERRORS: Record<string, string>,
    /**
     * @private
     * Represents current manifest version of plugin: allows compatibility module to
     * parse previous settings and features more smoothly and with lesser chance for
     * any anomalies and parsing errors.
     * @since
     * Implemented in v2*
     */
    SYS_MANIFEST_VERSION: string,
    /**
     * @private
     * Represents system setting to hold system maximum font size in the code editor:
     * this setting is created for better scaling of font size bar settings.
     * @since
     * Implemented in v3*
     */
    SYS_FONTSIZE_MAX: number,
    /**
     * @private
     * Represents system setting to hold system minimum font size in the code editor:
     * this setting is created for better scaling of font size bar settings.
     * @since
     * Implemented in v3*
     */
    SYS_FONTSIZE_MIN: number,
    /**
     * Represents custom-defined feature which allows user to remove
     * markdown-defined views from the registry.
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Markdown-overcharge>
     * @version
     * Implemented in v2*
     */
    markdown_overcharge: boolean,
    /**
     * Represents extensions as markdown default configuration for vault.
     * Relates to many other settings in the plugin.
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Extensions>
     * @since
     * Implemented in v1*
     * @param {boolean} stable 
     * Is this module stable
     * @param {string}  extensions 
     * Which file extensions are treated by this module
     */
    default: {
        /** Is this module stable */
        stable: boolean,
        /** Which file extensions are treated by this module */
        extensions: string,
    }
    /**
     * Represents special configuration of extensions as markdown which
     * is enabled on mobile devices (or externally by user).
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Mobile-extensions>
     * @since
     * Implemented in v2*
     * @param {boolean} enable 
     * Is this module enabled
     * @param {boolean} stable 
     * Is this module stable
     * @param {string}  extensions 
     * Which file extensions are treated by this module
     */
    mobile: {
        /** Is this module enabled */
        enable: boolean,
        /** Is this module stable */
        stable: boolean,
        /** Which file extensions are treated by this module */
        extensions: string,
    },
    /**
     * Represents ignore module which allows you to set up files and patterns
     * to be ignored by plugin and it's features.
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Ignore-mode>
     * @since
     * Implemented in v2*
     * @param {boolean} enable 
     * Is this module enabled
     * @param {string}  masks 
     * Which regular expression are treated by this module: regular expressions define standard JS regexps for glob patterns
     * @param {string}  extensions 
     * Which file extensions are treated by this module
     */
    ignore: {
        /** Is this module enabled */
        enable: boolean,
        /** Which regular expression are treated by this module: regular expressions define standard JS regexps for glob patterns */
        masks: string,
        /** Which file extensions are treated by this module */
        extensions: string,
    }
    /**
     * Represents highly-advanced feature which allows user to assign extensions
     * by views within custom user input: configurable with other plugins.
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Grouped-extensions>
     * @since
     * Implemented in v2*
     * @param {boolean} enable 
     * Is this module enabled
     * @param {string}  patterns
     * Record which contains extensions assigned by views as keys: converts to the dictionary in the plugin
     */
    grouped: {
        /** Is this module enabled */
        enable: boolean,
        /** Record which contains extensions assigned by views as keys: converts to the dictionary in the plugin */
        patterns: string,
    },
    /**
     * Represents part of legacy options - forced extensions, which were
     * using CM (codemirror-way) way of implementing file editing.
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Forced-extensions>
     * @since
     * Implemented in v2*
     * @deprecated 
     * After v3.3* is part of legacy-debug mode
     */
    forced_extensions: string,
    /**
     * Represents an on-load registry (OLR) system: dynamically reads extensions
     * of new files, parses and enters them into the config of extensions.
     * @desc
     * Resulting type of extensions (as code or as markdown) defined by other
     * settings and their correspondive behaviours.
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/On-load-registry>
     * @since
     * Implemented in v2*
     * @listens is_onload_unsafe
     */
    is_onload: boolean,
    /**
     * Represents an on-load unsafe registry (OLUR) system: splits extension
     * into subextensions, parses and enters them into the config of extensions.
     * @desc
     * Resulting type of extensions (as code or as markdown) defined by other
     * settings and their correspondive behaviours.
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/On-load-unsafe-registry>
     * @since
     * Implemented in v2*
     * @listens is_onload
     */
    is_onload_unsafe: boolean,
    /**
     * Represents case-insensitive toggle which makes extensions WINDOWS-compatible:
     * makes no difference between upper or lower-case.
     * @see
     * https://github.com/Falcion/UNITADE.md/wiki/Case-insensitive-extensions-mode
     * @since
     * Implemented in v2*
     */
    is_case_insensitive: boolean,
    /**
     * @private
     * This is developer settings, while they are not publicly available, they also
     * are not system settings, user needs console or other instrument to access them.
     * @see
     * TODO
     * @since
     * Debug and error signatures implemented in v2*, legacy implemented in v3*
     * @param {boolean} debug
     * Enables debug mode for the plugin, interlopes with more log output and custom behaviour
     * @param {boolean} stale
     * Enables legacy mode for the plugin, allowing user to work with deprecated features and settings
     * @param {string}  error_signatures
     * Record of error messages by which they would be sorted out and silenced on application level: part of advanced error silencing system
     * @param {number}  input_debouncing
     * Milliseconds input debounce (lag) which defines pause before reading user input
     */
    developer: {
        /** Enables debug mode for the plugin, interlopes with more log output and custom behaviour */
        debug: boolean,
        /** Enables legacy mode for the plugin, allowing user to work with deprecated features and settings */
        stale: boolean,
        /** Record of error messages by which they would be sorted out and silenced on application level: part of advanced error silencing system */
        error_signatures: string,
        /** Milliseconds input debounce (lag) which defines pause before reading user input */
        input_debouncing: number,
    },
    /**
     * Represents support for files without extensions, interlopes within empty or null
     * string as input in extensions modules: hard-coded feature.
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Barefiling-(barefiles-support)>
     * @since
     * Implemented in v2*
     */
    barefiling: boolean,
    /**
     * Represents externals and different specialized modules for big features like
     * compatiblity, languages support and etc., including security issues.
     * @see
     * TODO
     * @since
     * Partially, implemented in v2*, maintained and completed since v3*
     * @param {boolean} compat
     * Enables compatiblity module for plugin. 
     * About it: \
     * <https://github.com/Falcion/UNITADE.md/wiki/Compatibility-module>
     * @param {boolean} safe
     * Enables safe mode for binary and meta-sensitive files within extensions as markdown settings.
     * About it: \
     * <https://github.com/Falcion/UNITADE.md/wiki/Safe-mode>
     * @param {boolean} safe_case
     * TODO
     * @param {boolean} silencing
     * Enables silencing errors from the plugin only: used on pair within debug mode to output silenced errors.
     * About it: \
     * <https://github.com/Falcion/UNITADE.md/wiki/Silencing-errors>
     */
    externals: {
        /** Enables compatiblity module for plugin. */
        compat: boolean,
        /** Enables safe mode for binary and meta-sensitive files within extensions as markdown settings. */
        safe: boolean,
        //TODO
        safe_case: boolean,
        /** Enables silencing errors from the plugin only: used on pair within debug mode to output silenced errors. */
        silencing: boolean,
    },
    /**
     * Represents status bar configuration with control what information to display
     * and what not to: relates to it's own category.
     * @inheritdoc
     */
    status_bar: ISettingsStatusBar,
    /**
     * Represents configuration for module of forcing specified by app editing views
     * to extensions or patterns provided by grouped-forcing setup.
     * @inheritdoc
     */
    forced_view: ISettingsForcedView,
    /**
     * Represents code editor feature as self-sustained monaco-editor technology
     * integration: heavy module created to work with binary files and code environment within app.
     * @inheritdoc
     */
    code_editor: ISettingsCodeEditor,
}

/**
 * @description
 * Interface with settings for code editor feature.
 * @interface
 * Represents status bar configuration with control what information to display
 * and what not to: relates to it's own category.
 * @see
 * <https://github.com/Falcion/UNITADE.md/wiki/Status-bar>
 * @since
 * Maintained since v3*
 */
export interface ISettingsStatusBar {
    /** Enables entire status bar information feature */
    enable: boolean,
    /**
     * Configuration about displaying amount of registered extensions:
     * can configure counting between different registering extensions categories. 
     * @param {boolean} enable 
     * Enable counting registered extensions
     * @param {boolean} include_extensions_markdown
     * Enables counting registered extensions as markdown
     * @param {boolean} include_extensions_grouped
     * Enables counting registered extensions in grouped extensions setting
     * @param {boolean} include_extensions_code
     * Enables counting registered extensions as code
     */
    registered_extensions: {
        /** Enable counting registered extensions */
        enable: boolean,
        /** Enables counting registered extensions as markdown */
        include_extensions_markdown: boolean,
        /** Enables counting registered extensions in grouped extensions setting */
        include_extensions_grouped: boolean,
        /** Enables counting registered extensions as code */
        include_extensions_code: boolean,
    },
    registered_views: boolean,
    /** Enables display of what model/markdown-processor works on currently opened file */
    current_processor: boolean,
    /** Enables display of what typeview/render is used for currently opened file */
    current_display: boolean,
    /** Enables display of static cursor position with column and line */
    cursor_position: boolean,
}

/**
 * @description
 * Interface with settings for forcing editing views feature.
 * @interface
 * Represents configuration for module of forcing specified by app editing views
 * to extensions or patterns provided by grouped-forcing setup.
 * @see
 * TODO
 * @since
 * Implemented in v3*
 */
export interface ISettingsForcedView {
    /** Enables entire forced editing views feature */
    enable: boolean,
    /** Extensions which are being forced to custom editing view by this feature */
    extensions: string,
    /** Key in the dictionary of supported editing views by the app */
    mode: string,
    /**
     * Subconfiguration of forced view feature which allows user to
     * assign modes to extensions. Works the same way as grouped extensions.
     * @see
     * TODO
     * @param {boolean} enable
     * Enables subconfiguration of grouped editing views
     * @param {string}  groups
     * Record which contains extensions assigned by editing views as keys: converts to the dictionary in the plugin
     */
    advanced: {
        /** Enables subconfiguration of grouped editing views */
        enable: boolean,
        /** Record which contains extensions assigned by editing views as keys: converts to the dictionary in the plugin */
        groups: string,
    }
}

/**
 * @description
 * Interface with settings for code editor feature.
 * @interface
 * Represents code editor feature as self-sustained monaco-editor technology
 * integration: heavy module created to work with binary files and code environment within app.
 * @see
 * <https://github.com/Falcion/UNITADE.md/wiki/Code-editor-module>
 * @since
 * Maintained since v3*
 */
export interface ISettingsCodeEditor {
    /** Enables entire code editor module */
    enable: boolean,
    /** 
     * Enables code editor to use default (as markdown) extensions and ignore itself 
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Working-with-extensions>
     */
    enable_default_extensions: boolean,
    /**
     * Custom extensions which are being read by code editor: this extensions are different in
     * behaviour than default or any other extensions - they override previous view.
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Working-with-extensions>
     */
    extensions: string,
    /**
     * Visual configuration of code editor feature, includes different
     * parameters of quality of life in visual terms, font settings and color theme.
     * @inheritdoc
     */
    visuals: ISettingsCodeEditorVisuals,
    /** 
     * Specialized validation configuration which relates to known both
     * syntax and semantic validations: essential parts of monaco editor environment.
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Validations>
    */
    validations: {
        /**
         * Enables syntax validation which involves checking the code for
         * syntax: keywords, structure, brackets.
         * @deprecated Requires advanced LSP
         */
        syntax: boolean,
        /**
         * Enables semantic validation which involves checking the code for
         * logical errors, type mismatches and other issues not from syntax alone.
         * @deprecated Requires advanced LSP
         */
        semantic: boolean,
    },
    /** 
     * Externals of code editor settings, includes different and highly
     * specialized features and fixes.
     * @see
     * TODO
    */
    externals: {
        /** Enables zoom in the editor by updating font size within scrolling delta */
        enable_zooming: boolean,
        /**
         * Forces editor to accept "Ctrl+C/Ctrl+V" combinations instead of UNIX one
         * @see
         * <https://github.com/Falcion/UNITADE.md/wiki/Copy-paste-problematics>
         */
        enable_vanilla_pasting: boolean,
    }
}

/**
 * @description
 * Interface with visual settings for the code editor.
 * @interface
 * Visual configuration of code editor feature, includes different
 * parameters of quality of life in visual terms, font settings and color theme.
 * @see
 * <https://github.com/Falcion/UNITADE.md/wiki/Visual-parameters>
 */
export interface ISettingsCodeEditorVisuals {
    /** Enables folding feature of editor that allows user to collapse code blocks */
    folding: boolean,
    /** Enables line numbering feature that numbers every line with it's own position numbern */
    line_numbering: boolean,
    /** Enables words wrapping feature that wraps long lines of code ono the next line instead */
    words_wrapping: boolean,
    /**
     * Enables robust feature of minimapping that provides condensed visual overview of the entire code file
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Minimapping>
     */
    minimapping: boolean,
    /** Key for the dictionary of themes which are provided by instance of monaco technology editor */
    theme: string,
    /**
     * Controls font size of the text in the code editor view
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Working-with-fonts>
     */
    font_size: number,
    /**
     * Controls font family of the text in the code editor view
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Working-with-fonts>
     */
    font_family: string,
    /**
     * Enables ligatures of the given font family, if one supports them
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Working-with-fonts>
     */
    font_ligatures: boolean,
}
