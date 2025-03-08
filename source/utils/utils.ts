/*
 * MIT License
 *
 * Copyright (c) 2023-2024
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

import {
    TFile,
    TFolder,
    TAbstractFile,
} from "obsidian";

import { UNITADE_SETTINGS } from "./../settings";

import * as monaco from 'monaco-editor';

/**
 * Determines whether the provided file is an instance of `TFile` from the Obsidian API.
 * 
 * @param {TAbstractFile} file - The file to check, which can be either a `TFile`, `TFolder`, or other `TAbstractFile` type.
 * @returns {boolean} - Returns `true` if the file is an instance of `TFile`, otherwise `false`.
 * 
 * @example
 * const isFile = isTFile(someFile);
 * console.log(isFile); // true if someFile is a TFile, false otherwise
 */
export function isTFile(file: TAbstractFile | null): boolean {
    return (file instanceof TFile);
}

export function asTFile(file: TAbstractFile | null): TFile {
    if (file instanceof TFile)
        return file as TFile;

    throw new Error('Error occured when tried to parse TAbstractFile as TFile')
}

/**
 * Determines whether the provided file is an instance of `TFolder` from the Obsidian API.
 * 
 * @param {TAbstractFile} file - The file to check, which can be either a `TFile`, `TFolder`, or other `TAbstractFile` type.
 * @returns {boolean} - Returns `true` if the file is an instance of `TFolder`, otherwise `false`.
 * 
 * @example
 * const isFolder = isTFolder(someFile);
 * console.log(isFolder); // true if someFile is a TFolder, false otherwise
 */
export function isTFolder(file: TAbstractFile | null): boolean {
    return (file instanceof TFolder);
}

export function asTFolder(file: TAbstractFile | null): TFolder {
    if (file instanceof TFolder)
        return file as TFolder;

    throw new Error('Error occured when tried to parse TAbstractFile as TFolder')
}

/**
 * Determines the programming or markup language associated with a given file extension.
 * 
 * The function maps file extensions to their respective language names that are used in code
 * editors or syntax highlighting systems. If the provided extension doesn't match any predefined
 * extensions, the function returns `"plaintext"` as the default language.
 * 
 * ### Supported Languages:
 * - JavaScript, TypeScript, Python, HTML, CSS, C++, SQL, and many more.
 * - Handles various file extensions for each language (e.g., `.js`, `.jsx`, `.ts`, `.tsx`, etc.).
 * 
 * ### Example:
 * ```typescript
 * const lang = getLanguage('js');
 * console.log(lang); // Outputs: "javascript"
 * ```
 * 
 * @param {string} extension - The file extension (without the leading dot) to check.
 * @returns {string} - The name of the programming or markup language corresponding to the extension.
 */
export function getLanguage(extension: string): string {
    switch (extension) {
        case "js":
        case "es6":
        case "jsx":
        case "cjs":
        case "mjs":
            return "javascript";
        case "ts":
        case "tsx":
        case "cts":
        case "mts":
            return "typescript";
        case "json":
            return "json";
        case "py":
        case "rpy":
        case "pyu":
        case "cpy":
        case "gyp":
        case "gypi":
            return "python";
        case "css":
            return "css";
        case "html":
        case "htm":
        case "shtml":
        case "xhtml":
        case "mdoc":
        case "jsp":
        case "asp":
        case "aspx":
        case "jshtm":
            return "html";
        case "cpp":
        case "c++":
        case "cc":
        case "cxx":
        case "hpp":
        case "hh":
        case "hxx":
            return "cpp";
        case "graphql":
        case "gql":
            return "graphql";
        case "java":
        case "jav":
            return "java";
        case "php":
        case "php4":
        case "php5":
        case "phtml":
        case "ctp":
            return "php";
        case "sql":
            return "sql";
        case "yaml":
        case "yml":
            return "yaml";
        case "bat":
        case "batch":
            return "bat";
        case "lua":
            return "lua";
        case "rb":
        case "rbx":
        case "rjs":
        case "gemspec":
            return "ruby";
        case "markdown":
        case "mdown":
        case "mkdn":
        case "mkd":
        case "mdwn":
        case "mdtxt":
        case "mdtext":
        case "mdx":
            return "markdown";
        case "r":
        case "rhistory":
        case "rmd":
        case "rprofile":
        case "rt":
            return "r";
        case "ftl":
        case "ftlh":
        case "ftlx":
            return "freemarker2";
        case "rst":
            return "restructuredtext";
        case "hcl":
        case "tf":
        case "tfvars":
            return "hcl";
        case "ini":
        case "properties":
        case "gitconfig":
            return "ini";
        case "pug":
        case "jade":
            return "pug";
        case "dart":
            return "dart";
        case "rs":
        case "rlib":
            return "rust";
        case "less":
            return "less";
        case "cls":
            return "apex";
        case "tcl":
            return "tcl";
        case "abap":
            return "abap";
        case "ecl":
            return "ecl";
        case "pla":
            return "pla";
        case "cmd":
            return "bat";
        case "vb":
            return "vb";
        case "sb":
            return "sb";
        case "m3":
        case "i3":
        case "mg":
        case "ig":
            return "m3";
        case "go":
            return "go";
        case "s":
            return "mips";
        case "pl":
        case "pm":
            return "perl";
        case "wgsl":
            return "wgsl";
        case "twig":
            return "twig";
        case "scss":
            return "scss";
        case "redis":
            return "redis";
        case "sh":
        case "bash":
            return "shell";
        case "scala":
        case "sc":
        case "sbt":
            return "scala";
        case "jl":
            return "julia";
        case "dax":
        case "msdax":
            return "msdax";
        case "lex":
            return "lexon";
        case "cshtml":
            return "razor";
        case "bicep":
            return "bicep";
        case "azcli":
            return "azcli";
        case "swift":
        case "Swift":
            return "swift";
        case "flow":
            return "flow9";
        case "xml":
        case "xsd":
        case "dtd":
        case "ascx":
        case "csproj":
        case "config":
        case "props":
        case "targets":
        case "wxi":
        case "wxl":
        case "wxs":
        case "xaml":
        case "svgz":
        case "opf":
        case "xslt":
        case "xsl":
            return "xml";
        case "kt":
        case "kts":
            return "kotlin";
        case "cypher":
        case "cyp":
            return "cypher";
        case "coffee":
            return "coffeescript";
        case "fs":
        case "fsi":
        case "ml":
        case "mli":
        case "fsx":
        case "fsscript":
            return "fsharp";
        case "scm":
        case "ss":
        case "sch":
        case "rkt":
            return "scheme";
        case "rq":
            return "sparql";
        case "aes":
            return "aes";
        case "liquid":
        case "html.liquid":
            return "liquid";
        case "pas":
        case "p":
        case "pp":
            return "pascal";
        case "ex":
        case "exs":
            return "elixir";
        case "qs":
            return "qsharp";
        case "cs":
        case "csx":
        case "cake":
            return "csharp";
        case "clj":
        case "cljs":
        case "cljc":
        case "edn":
            return "clojure";
        case "mligo":
            return "cameligo";
        case "sol":
            return "sol";
        case "proto":
            return "proto";
        case "dats":
        case "sats":
        case "hats":
            return "postiats";
        case "ligo":
            return "pascaligo";
        case "dockerfile":
            return "dockerfile";
        case "handlebars":
        case "hbs":
            return "handlebars";
        case "pq":
        case "pqm":
            return "powerquery";
        case "m":
            return "objective-c";
        case "sv":
        case "svh":
            return "systemverilog";
        case "v":
        case "vh":
            return "verilog";
        case "st":
        case "iecst":
        case "iecplc":
        case "lc3lib":
            return "st";
        case "c":
        case "h":
            return "c";
        default:
            return "plaintext";
    }
}

import 'monaco-editor/esm/vs/basic-languages/css/css.contribution'
import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'

import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker';
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker';

export function getWorker(language: string): Worker {
    switch (language) {
        case "javascript":
        case "typescript":
            return new TsWorker();
        case "css":
            return new CssWorker();
        case "html":
            return new HtmlWorker();
        case "json":
            return new JsonWorker();
        // Additional languages mapped to a general editor worker
        case "cpp":
        case "python":
        case "java":
        case "php":
        case "sql":
        case "yaml":
        case "bat":
        case "lua":
        case "ruby":
        case "markdown":
        case "r":
        case "freemarker2":
        case "restructuredtext":
        case "hcl":
        case "ini":
        case "pug":
        case "dart":
        case "rust":
        case "less":
        case "apex":
        case "tcl":
        case "abap":
        case "ecl":
        case "pla":
        case "vb":
        case "sb":
        case "m3":
        case "go":
        case "mips":
        case "perl":
        case "wgsl":
        case "twig":
        case "scss":
        case "redis":
        case "shell":
        case "scala":
        case "julia":
        case "msdax":
        case "lexon":
        case "razor":
        case "bicep":
        case "azcli":
        case "swift":
        case "flow9":
        case "xml":
        case "kotlin":
        case "cypher":
        case "coffeescript":
        case "fsharp":
        case "scheme":
        case "sparql":
        case "aes":
        case "liquid":
        case "pascal":
        case "elixir":
        case "qsharp":
        case "csharp":
        case "clojure":
        case "cameligo":
        case "sol":
        case "proto":
        case "postiats":
        case "pascaligo":
        case "dockerfile":
        case "handlebars":
        case "powerquery":
        case "objective-c":
        case "systemverilog":
        case "verilog":
        case "st":
        case "c":
            return new EditorWorker();
        default:
            return new EditorWorker(); // Default worker for unsupported languages
    }
}

/**
 * Generates editor settings for the Monaco editor based on user preferences and provided options.
 * 
 * The function configures various editor settings such as language, theme, line numbers, word wrap,
 * minimap, font settings, and additional options like semantic highlighting and folding.
 * 
 * ### Example:
 * ```typescript
 * const editorSettings = genEditorSettings(userSettings, 'ts', true, true);
 * ```
 * 
 * @param {EditorSettings} setting - The base editor settings defined by the user or system.
 * @param {string} language - The language to set for the editor (e.g., 'javascript', 'typescript').
 * @param {boolean} [minimap=true] - Whether the minimap is enabled or disabled in the editor.
 * @param {boolean} [wordwrap=false] - Whether word wrap is enabled or disabled in the editor.
 * @returns {monaco.editor.IStandaloneEditorConstructionOptions} - The constructed editor configuration options.
 */
export function genEditorSettings(
    setting: UNITADE_SETTINGS,
    language: string,
    minimap: boolean = true,
    wordwrap: boolean = false
): monaco.editor.IStandaloneEditorConstructionOptions {

    // Set the minimap flag based on the provided argument or the setting.
    const minimapFlag = minimap === false ? false : setting.code_editor_settings.minimapping;

    const minimapOptions: monaco.editor.IEditorMinimapOptions = {
        enabled: minimapFlag,
    };

    const wordwrapFlag = wordwrap === true ? wordwrap : setting.code_editor_settings.word_wrapping;

    const settings: monaco.editor.IStandaloneEditorConstructionOptions = {
        automaticLayout: true,
        language: getLanguage(language),
        theme: setting.code_editor_settings.theme !== 'auto' ? setting.code_editor_settings.theme : getTheme(),
        lineNumbers: setting.code_editor_settings.line_numbers ? "on" : "off",
        wordWrap: wordwrapFlag ? "on" : "off",
        minimap: minimapOptions,
        folding: setting.code_editor_settings.folding,
        fontSize: setting.code_editor_settings.font_size,
        fontFamily: setting.code_editor_settings.font_family,
        fontLigatures: setting.code_editor_settings.font_ligatures,
        // Controls whether characters that can be confused with basic ASCII are highlighted
        unicodeHighlight: { ambiguousCharacters: false, invisibleCharacters: false },
        scrollBeyondLastLine: false,
        'semanticHighlighting.enabled': true,
    };

    if (setting.debug_mode)
        console.debug(settings);

    return settings;
}

export function getTheme(): string {
    return document.body.classList.contains("theme-dark") === true ? "vs-dark" : "vs";
}

export function getThemeObsidian(): string {
    return document.body.classList.contains("theme-dark") === true ? "dark" : "light";
}

