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

import { ISettings } from '@settings/defaults_interface';

export const DEFAULT_SETTINGS: ISettings = {
    ERRORS: {},
    SYS_MANIFEST_VERSION: '',
    SYS_FONTSIZE_MAX: 32,
    SYS_FONTSIZE_MIN: 5,
    markdown_overcharge: false,
    default: {
        stable: true,
        extensions: 'txt'
    },
    mobile: {
        enable: false,
        stable: true,
        extensions: 'txt'
    },
    ignore: {
        enable: false,
        stable: true,
        masks: '',
        extensions: ''
    },
    grouped: {
        enable: false,
        stable: true,
        patterns: ''
    },
    forced_extensions: '',
    is_onload: false,
    is_onload_unsafe: false,
    is_case_insensitive: false,
    developer: {
        debug: false,
        stale: false,
        error_signatures: '',
        input_debouncing: 1000
    },
    barefiling: false,
    externals: {
        compat: false,
        safe: true,
        safe_case: true,
        silencing: true
    },
    status_bar: {
        enable: true,
        registered_extensions: {
            enable: false,
            include_extensions_markdown: false,
            include_extensions_grouped: false,
            include_extensions_code: false
        },
        registered_views: false,
        current_processor: true,
        current_display: true,
        cursor_position: true
    },
    forced_view: {
        enable: false,
        extensions: '',
        mode: 'live-preview',
        advanced: {
            enable: false,
            groups: ''
        }
    },
    code_editor: {
        enable: true,
        enable_default_extensions: true,
        extensions: '',
        visuals: {
            folding: true,
            line_numbering: true,
            words_wrapping: true,
            minimapping: true,
            theme: 'auto',
            font_size: 14,
            font_family: "'Cascadia Code', 'Fira Code', Consolas, 'Courier New', monospace",
            font_ligatures: true
        },
        validations: {
            syntax: true,
            semantic: true
        },
        externals: {
            enable_zooming: false,
            enable_vanilla_pasting: true
        }
    }
}
