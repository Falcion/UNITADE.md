import { DEFAULT_SETTINGS } from "@settings/defaults";
import { IVersionConverter } from "./converters_interface";
import replaceDelimiter from "../utils/functions/replace_delim";

export const CONVERTERS: IVersionConverter[] = [
    /**
     * version 1.* - initial release
     */
    {
        version: '1.*',
        detect: (data: any) => {
            return (
                data.version === undefined &&
                data.barefiling === undefined &&
                data.debug_mode === undefined &&
                data.grouped_extensions === undefined
            );
        },
        convert: (data: any) => ({
            default: {
                ...DEFAULT_SETTINGS.default,
                extensions: replaceDelimiter(data.extensions, ',', '>') ?? 'txt',
            },
            forced_extensions: replaceDelimiter(data.forced_extensions, ',', '>') ?? '',
            is_onload: Boolean(data.is_dynamic_on),
            mobile: {
                ...DEFAULT_SETTINGS.mobile,
                extensions: replaceDelimiter(data.mobile_settings?.extensions, ',', '>') ?? 'txt',
            },
        })
    },
    /** 
     * version 2.0* - introduced grouped extensions and semicolon delimiters
     */
    {
        version: '2.0',
        detect: (data: any) => {
            return (
                data.version === undefined &&
                data.barefiling === undefined &&
                data.debug_mode === undefined &&
                data.grouped_extensions !== undefined
            );
        },
        convert: (data: any) => ({
            default: {
                ...DEFAULT_SETTINGS.default,
                extensions: replaceDelimiter(data.extensions, ';', '>') ?? 'txt',
            },
            grouped: {
                ...DEFAULT_SETTINGS.grouped,
                patterns: replaceDelimiter(data.grouped_extensions, ';', '>') ?? '',
            },
            mobile: {
                ...DEFAULT_SETTINGS.mobile,
                extensions: replaceDelimiter(data.mobile_settings?.extensions, ';', '>') ?? 'txt',
            },
        })
    },
    /** 
     *  version 2.1* - introduced debug mode and other features with addition of
     *  semicolon delimiters for all list-type fields for consistency
     */
    {
        version: '2.1',
        detect: (data: any) => {
            return (
                data.version === undefined &&
                data.barefiling === undefined &&
                data.debug_mode !== undefined
            );
        },
        convert: (data: any) => ({
            grouped: {
                ...DEFAULT_SETTINGS.grouped,
                patterns: replaceDelimiter(data.grouped_extensions, ';', '>') ?? '',
            },
            default: {
                ...DEFAULT_SETTINGS.default,
                extensions: replaceDelimiter(data.extensions, ';', '>') ?? 'txt',
            },
            forced_extensions: replaceDelimiter(data.forced_extensions, ';', '>') ?? '',
            ignore: {
                ...DEFAULT_SETTINGS.ignore,
                extensions: replaceDelimiter(data.ignore_extensions, ';', '>') ?? '',
                masks: replaceDelimiter(data.ignore_masks, ';', '>') ?? '',
            },
            mobile: {
                ...DEFAULT_SETTINGS.mobile,
                extensions: replaceDelimiter(data.mobile_settings?.extensions, ';', '>') ?? 'txt',
            },
        })
    },
    /** 
     * version 2.4* - introduced barefiling feature 
     */
    {
        version: '2.4',
        detect: (data: any) => {
            return (
                data.version === undefined &&
                data.barefiling !== undefined
            );
        },
        convert: (data: any) => ({
            grouped: {
                ...DEFAULT_SETTINGS.grouped,
                patterns: replaceDelimiter(data.grouped_extensions, ',', '>') ?? '',
            },
            default: {
                ...DEFAULT_SETTINGS.default,
                extensions: replaceDelimiter(data.extensions, ';', '>') ?? 'txt',
            },
            forced_extensions: replaceDelimiter(data.forced_extensions, ';', '>') ?? '',
            ignore: {
                ...DEFAULT_SETTINGS.ignore,
                extensions: replaceDelimiter(data.ignore_extensions, ';', '>') ?? '',
                masks: replaceDelimiter(data.ignore_masks, ';', '>') ?? '',
            },
            mobile: {
                ...DEFAULT_SETTINGS.mobile,
                extensions: replaceDelimiter(data.mobile_settings?.extensions, ';', '>') ?? 'txt',
            },
            barefiling: Boolean(data.barefiling),
        })
    },
    /**
     * versions 3.2.* - major refactoring and nested structure (pre-4.0.0)
     */
    {
        version: '3.2.*',
        detect: (data: any) => {
            /**
             * Use heuristic detection based on presence of old fields and absence of new fields to identify pre-4.* versions, since explicit version identifiers were not consistently used pre-4.*
             */
            const flagNamings = (
                data.code_editor_settings !== undefined ||
                data.is_ignore !== undefined ||
                data.is_grouped !== undefined ||
                data.stable !== undefined ||
                data.errors !== undefined ||
                data.debug_mode !== undefined ||
                data.safe_mode !== undefined ||
                data.compatibility_module !== undefined
            );

            return (
                flagNamings &&
                /** 
                 * ensure it's post-3.2.4 versioning by checking feature
                 * of advanced silencing signatures
                 */
                (
                    data.advanced_silencing_errors === undefined ||
                    data.advanced_silencing_errors?.signatures === undefined
                ) &&
                /** versions of 3.*-generation use old naming for manifest version */
                (
                    data.manifest_version !== undefined &&
                    data.SYS_MANIFEST_VERSION === undefined
                ));
        },
        convert: (data: any) => {
            /** map old flat/semi-flat structure to new nested structure  */
            return {
                /** top-level fields that changed names or moved */
                default: {
                    stable: data.stable ?? DEFAULT_SETTINGS.default.stable,
                    extensions: data.extensions ?? DEFAULT_SETTINGS.default.extensions,
                },
                mobile: {
                    enable: data.mobile_settings?.enable ?? DEFAULT_SETTINGS.mobile.enable,
                    stable: data.mobile_settings?.stable ?? DEFAULT_SETTINGS.mobile.stable,
                    extensions: data.mobile_settings?.extensions ?? DEFAULT_SETTINGS.mobile.extensions,
                },
                ignore: {
                    enable: data.is_ignore ?? DEFAULT_SETTINGS.ignore.enable,
                    stable: DEFAULT_SETTINGS.ignore.stable,
                    masks: data.ignore_masks ?? DEFAULT_SETTINGS.ignore.masks,
                    extensions: data.ignore_extensions ?? DEFAULT_SETTINGS.ignore.extensions,
                },
                grouped: {
                    enable: data.is_grouped ?? DEFAULT_SETTINGS.grouped.enable,
                    stable: DEFAULT_SETTINGS.grouped.stable,
                    patterns: data.grouped_extensions ?? DEFAULT_SETTINGS.grouped.patterns,
                },
                ERRORS: data.errors ?? DEFAULT_SETTINGS.ERRORS,
                developer: {
                    debug: data.debug_mode ?? DEFAULT_SETTINGS.developer.debug,
                    stale: DEFAULT_SETTINGS.developer.stale,
                    error_signatures: data.advanced_silencing_errors?.signatures ?? DEFAULT_SETTINGS.developer.error_signatures,
                    input_debouncing: DEFAULT_SETTINGS.developer.input_debouncing,
                },
                externals: {
                    compat: data.compatibility_module ?? DEFAULT_SETTINGS.externals.compat,
                    safe: data.safe_mode ?? DEFAULT_SETTINGS.externals.safe,
                    safe_case: DEFAULT_SETTINGS.externals.safe_case,
                    silencing: data.silence_errors ?? DEFAULT_SETTINGS.externals.silencing,
                },
                status_bar: {
                    enable: data.status_bar?.enabled ?? DEFAULT_SETTINGS.status_bar.enable,
                    register_extensions: {
                        enable: data.status_bar?.registered_extensions?.enabled ?? DEFAULT_SETTINGS.status_bar.register_extensions.enable,
                        extensions_markdown: data.status_bar?.registered_extensions?.include_extensions ?? DEFAULT_SETTINGS.status_bar.register_extensions.extensions_markdown,
                        extensions_grouped: data.status_bar?.registered_extensions?.include_extensions_grouped ?? DEFAULT_SETTINGS.status_bar.register_extensions.extensions_grouped,
                        extensions_code: data.status_bar?.registered_extensions?.include_code_editor_extensions ?? DEFAULT_SETTINGS.status_bar.register_extensions.extensions_code,
                    },
                    register_views: data.status_bar?.registered_views ?? DEFAULT_SETTINGS.status_bar.register_views,
                    current_processor: data.status_bar?.current_processor ?? DEFAULT_SETTINGS.status_bar.current_processor,
                    current_display: data.status_bar?.current_display ?? DEFAULT_SETTINGS.status_bar.current_display,
                    cursor_position: data.status_bar?.cursor_position ?? DEFAULT_SETTINGS.status_bar.cursor_position,
                },
                code_editor: {
                    enable: data.code_editor_settings?.enabled ?? DEFAULT_SETTINGS.code_editor.enable,
                    enable_default_extensions: data.code_editor_settings?.use_default_extensions ?? DEFAULT_SETTINGS.code_editor.enable_default_extensions,
                    extensions: data.code_editor_settings?.extensions ?? DEFAULT_SETTINGS.code_editor.extensions,
                    visuals: {
                        folding: data.code_editor_settings?.folding ?? DEFAULT_SETTINGS.code_editor.visuals.folding,
                        line_numbering: data.code_editor_settings?.line_numbers ?? DEFAULT_SETTINGS.code_editor.visuals.line_numbering,
                        words_wrapping: data.code_editor_settings?.word_wrapping ?? DEFAULT_SETTINGS.code_editor.visuals.words_wrapping,
                        minimapping: data.code_editor_settings?.minimapping ?? DEFAULT_SETTINGS.code_editor.visuals.minimapping,
                        theme: data.code_editor_settings?.theme ?? DEFAULT_SETTINGS.code_editor.visuals.theme,
                        font_size: data.code_editor_settings?.font_size ?? DEFAULT_SETTINGS.code_editor.visuals.font_size,
                        font_family: data.code_editor_settings?.font_family ?? DEFAULT_SETTINGS.code_editor.visuals.font_family,
                        font_ligatures: data.code_editor_settings?.font_ligatures ?? DEFAULT_SETTINGS.code_editor.visuals.font_ligatures,
                    },
                    validations: {
                        syntax: data.code_editor_settings?.validation_syntax ?? DEFAULT_SETTINGS.code_editor.validations.syntax,
                        semantic: data.code_editor_settings?.validation_semantic ?? DEFAULT_SETTINGS.code_editor.validations.semantic,
                    },
                    externals: {
                        enable_zooming: data.code_editor_settings?.enable_zoom ?? DEFAULT_SETTINGS.code_editor.externals.enable_zooming,
                        enable_vanilla_pasting: data.code_editor_settings?.force_vanilla_paste ?? DEFAULT_SETTINGS.code_editor.externals.enable_vanilla_pasting,
                    },
                },
            };
        }
    },
];

