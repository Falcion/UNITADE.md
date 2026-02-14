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
     * @default {}
     */
    ERRORS: Record<string, string>,
    /**
     * @private
     * Represents current manifest version of plugin: allows compatibility module to
     * parse previous settings and features more smoothly and with lesser chance for
     * any anomalies and parsing errors.
     * @since
     * Implemented in v2*
     * @default ''
     */
    SYS_MANIFEST_VERSION: string,
    /**
     * @private
     * Represents system setting to hold system maximum font size in the code editor:
     * this setting is created for better scaling of font size bar settings.
     * @since
     * Implemented in v3*
     * @default 32
     */
    SYS_FONTSIZE_MAX: number,
    /**
     * @private
     * Represents system setting to hold system minimum font size in the code editor:
     * this setting is created for better scaling of font size bar settings.
     * @since
     * Implemented in v3*
     * @default 5
     */
    SYS_FONTSIZE_MIN: number,
    /**
     * Represents custom-defined feature which allows user to remove
     * markdown-defined views from the registry.
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Markdown-overcharge>
     * @since
     * Implemented in v2*
     * @default false
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
        /** 
         * Is this module stable 
         * @default true
         */
        stable: boolean,
        /** 
         * Which file extensions are treated by this module 
         * @default 'txt'
         */
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
        /** 
         * Is this module enabled 
         * @default false
         */
        enable: boolean,
        /** 
         * Is this module stable 
         * @default true
         */
        stable: boolean,
        /** 
         * Which file extensions are treated by this module 
         * @default 'txt'
         */
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
     * @param {boolean} stable
     * Is this module stable
     * @param {string}  masks 
     * Which regular expression are treated by this module: regular expressions 
     * define standard JS regexps for glob patterns
     * @param {string}  extensions 
     * Which file extensions are treated by this module
     */
    ignore: {
        /** 
         * Is this module enabled 
         * @default false
         */
        enable: boolean,
        /** 
         * Is this module stable 
         * @default true
         */
        stable: boolean,
        /** 
         * Which regular expression are treated by this module: regular expressions 
         * define standard JS regexps for glob patterns 
         * @default ''
         */
        masks: string,
        /** 
         * Which file extensions are treated by this module 
         * @default ''
         */
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
     * @param {boolean} stable
     * Is this module stable
     * @param {string}  patterns
     * Record which contains extensions assigned by views as keys: converts to the dictionary in the plugin
     */
    grouped: {
        /** 
         * Is this module enabled 
         * @default false
         */
        enable: boolean,
        /** 
         * Is this module stable 
         * @default true
         */
        stable: boolean,
        /** 
         * Record which contains extensions assigned by views as keys: 
         * converts to the dictionary in the plugin 
         * @default ''
         */
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
     * @default ''
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
     * @listens {@link is_onload_unsafe}
     * @default false
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
     * @listens {@link is_onload}
     * @default false
     */
    is_onload_unsafe: boolean,
    /**
     * Represents case-insensitive toggle which makes extensions WINDOWS-compatible:
     * makes no difference between upper or lower-case.
     * @see
     * https://github.com/Falcion/UNITADE.md/wiki/Case-insensitive-extensions-mode
     * @since
     * Implemented in v2*
     * @default false
     */
    is_case_insensitive: boolean,
    /**
     * @private
     * This is developer settings, while they are not publicly available, they also
     * are not system settings, user needs console or other instrument to access them.
     * @see
     * !TODO
     * @since
     * Debug and error signatures implemented in v2*, legacy implemented in v3*
     * @param {boolean} debug
     * Enables debug mode for the plugin, interlopes 
     * with more log output and custom behaviour
     * @param {boolean} stale
     * Enables legacy mode for the plugin, allowing user to 
     * work with deprecated features and settings
     * @param {string}  error_signatures
     * Record of error messages by which they would be sorted out and 
     * silenced on application level: part of advanced error silencing system
     * @param {number}  input_debouncing
     * Milliseconds input debounce (lag) which defines pause before reading user input
     */
    developer: {
        /** 
         * Enables debug mode for the plugin, interlopes 
         * with more log output and custom behaviour 
         * @default false
         */
        debug: boolean,
        /** 
         * Enables legacy mode for the plugin, allowing user to 
         * work with deprecated features and settings 
         * @default false
         */
        stale: boolean,
        /** 
         * Record of error messages by which they would be sorted out and
         * silenced on application level: part of advanced error silencing system 
         * @default ''
         */
        error_signatures: string,
        /** 
         * Milliseconds input debounce (lag) which defines pause before reading user input 
         * @default 1000
         */
        input_debouncing: number,
    },
    /**
     * Represents support for files without extensions, interlopes within empty or null
     * string as input in extensions modules: hard-coded feature.
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Barefiling-(barefiles-support)>
     * @since
     * Implemented in v2*
     * @default false
     */
    barefiling: boolean,
    /**
     * Represents externals and different specialized modules for big features like
     * compatiblity, languages support and etc., including security issues.
     * @see
     * !TODO
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
     * Enables silencing errors from the plugin only: used on 
     * pair within debug mode to output silenced errors.
     * About it: \
     * <https://github.com/Falcion/UNITADE.md/wiki/Silencing-errors>
     */
    externals: {
        /** 
         * Enables compatiblity module for plugin. 
         * About it: \
         * <https://github.com/Falcion/UNITADE.md/wiki/Compatibility-module>
         * @default false
         */
        compat: boolean,
        /** 
         * Enables safe mode for binary and meta-sensitive files within extensions as markdown settings. 
         * About it: \
         * <https://github.com/Falcion/UNITADE.md/wiki/Safe-mode>
         * @default true
         */
        safe: boolean,
        //!TODO
        /**
         * !TODO
         * @default true
         */
        safe_case: boolean,
        /** 
         * Enables silencing errors from the plugin only: used on 
         * pair within debug mode to output silenced errors.
         * About it: \
         * <https://github.com/Falcion/UNITADE.md/wiki/Silencing-errors>
         * @default true
         */
        silencing: boolean,
    },
    /**
     * Represents status bar configuration with control what information to display
     * and what not to: relates to it's own category.
     * @yields {@link ISettingsStatusBar}
     * @inheritdoc
     */
    status_bar: ISettingsStatusBar,
    /**
     * Represents configuration for module of forcing specified by app editing views
     * to extensions or patterns provided by grouped-forcing setup.
     * @yields {@link ISettingsForcedView}
     * @inheritdoc
     */
    forced_view: ISettingsForcedView,
    /**
     * Represents code editor feature as self-sustained monaco-editor technology
     * integration: heavy module created to work with binary files and code environment within app.
     * @yields {@link ISettingsCodeEditor}
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
    /** 
     * Enables entire status bar information feature 
     * @default true
     */
    enable: boolean,
    /**
     * Configuration about displaying amount of registered extensions:
     * can configure counting between different registering extensions categories. 
     * @param {boolean} enable 
     * Enable counting registered extensions
     * @param {boolean} extensions_markdown
     * Enables counting registered extensions as markdown
     * @param {boolean} extensions_grouped
     * Enables counting registered extensions in grouped extensions setting
     * @param {boolean} extensions_code
     * Enables counting registered extensions as code
     */
    register_extensions: {
        /** 
         * Enable counting registered extensions 
         * @default false
         */
        enable: boolean,
        /** 
         * Enables counting registered extensions as markdown 
         * @default false
         */
        extensions_markdown: boolean,
        /** 
         * Enables counting registered extensions in grouped extensions setting 
         * @default false
         */
        extensions_grouped: boolean,
        /** 
         * Enables counting registered extensions as code 
         * @default false
         */
        extensions_code: boolean,
    },
    /** 
     * Enables display of registered views information 
     * @default false
     */
    register_views: boolean,
    /** 
     * Enables display of what model/markdown-processor works on currently opened file 
     * @default true
     */
    current_processor: boolean,
    /** 
     * Enables display of what typeview/render is used for currently opened file 
     * @default true
     */
    current_display: boolean,
    /** 
     * Enables display of static cursor position with column and line 
     * @default true
     */
    cursor_position: boolean,
}

/**
 * @description
 * Interface with settings for forcing editing views feature.
 * @interface
 * Represents configuration for module of forcing specified by app editing views
 * to extensions or patterns provided by grouped-forcing setup.
 * @see
 * !TODO
 * @since
 * Implemented in v3*
 */
export interface ISettingsForcedView {
    /** 
     * Enables entire forced editing views feature 
     * @default false
     */
    enable: boolean,
    /** 
     * Extensions which are being forced to custom editing view by this feature 
     * @default ''
     */
    extensions: string,
    /** 
     * Key in the dictionary of supported editing views by the app 
     * @default 'live-preview'
     */
    mode: string,
    /**
     * Subconfiguration of forced view feature which allows user to
     * assign modes to extensions. Works the same way as grouped extensions.
     * @see
     * !TODO
     * @param {boolean} enable
     * Enables subconfiguration of grouped editing views
     * @param {string}  groups
     * Record which contains extensions assigned by editing views as keys: converts to the dictionary in the plugin 
     */
    advanced: {
        /** 
         * Enables subconfiguration of grouped editing views 
         * @default false
         */
        enable: boolean,
        /** 
         * Record which contains extensions assigned by editing views as keys: converts to the dictionary in the plugin 
         * @default ''
         */
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
    /** 
     * Enables entire code editor module 
     * @default true
     */
    enable: boolean,
    /** 
     * Enables code editor to use default (as markdown) extensions and ignore itself 
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Working-with-extensions>
     * @default true
     */
    enable_default_extensions: boolean,
    /**
     * Custom extensions which are being read by code editor: this extensions are different in
     * behaviour than default or any other extensions - they override previous view.
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Working-with-extensions>
     * @default ''
     */
    extensions: string,
    /**
     * Visual configuration of code editor feature, includes different
     * parameters of quality of life in visual terms, font settings and color theme.
     * @yields {@link ISettingsCodeEditorVisuals}
     * @inheritdoc
     */
    visuals: ISettingsCodeEditorVisuals,
    /** 
     * Specialized validation configuration which relates to known both
     * syntax and semantic validations: essential parts of monaco editor environment.
     * @deprecated Requires advanced LSP
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Validations>
    */
    validations: {
        /**
         * Enables syntax validation which involves checking the code for
         * syntax: keywords, structure, brackets.
         * @deprecated Requires advanced LSP
         * @default true
         */
        syntax: boolean,
        /**
         * Enables semantic validation which involves checking the code for
         * logical errors, type mismatches and other issues not from syntax alone.
         * @deprecated Requires advanced LSP
         * @default true
         */
        semantic: boolean,
    },
    /** 
     * Externals of code editor settings, includes different and highly
     * specialized features and fixes.
     * @see
     * !TODO
    */
    externals: {
        /** 
         * Enables zoom in the editor by updating font size within scrolling delta 
         * @default false
         */
        enable_zooming: boolean,
        /**
         * Forces editor to accept "Ctrl+C/Ctrl+V" combinations instead of UNIX one
         * @see
         * <https://github.com/Falcion/UNITADE.md/wiki/Copy-paste-problematics>
         * @default true
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
    /** 
     * Enables folding feature of editor that allows user to collapse code blocks 
     * @default true
     */
    folding: boolean,
    /** 
     * Enables line numbering feature that numbers every line with it's own position numbern 
     * @default true
     */
    line_numbering: boolean,
    /** 
     * Enables words wrapping feature that wraps long lines of code ono the next line instead 
     * @default true
     */
    words_wrapping: boolean,
    /**
     * Enables robust feature of minimapping that provides condensed visual overview of the entire code file
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Minimapping>
     * @default true
     */
    minimapping: boolean,
    /** 
     * Key for the dictionary of themes which are provided by instance of monaco technology editor 
     * @default 'auto'
     */
    theme: string,
    /**
     * Controls font size of the text in the code editor view
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Working-with-fonts>
     * @default 14
     */
    font_size: number,
    /**
     * Controls font family of the text in the code editor view
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Working-with-fonts>
     * @default "'Cascadia Code', 'Fira Code', Consolas, 'Courier New', monospace"
     */
    font_family: string,
    /**
     * Enables ligatures of the given font family, if one supports them
     * @see
     * <https://github.com/Falcion/UNITADE.md/wiki/Working-with-fonts>
     * @default true
     */
    font_ligatures: boolean,
}
