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
    TextFileView,
    WorkspaceLeaf,
} from "obsidian";

import CodeMirror from '../../../lib/codemirror';

export default class UNITADE_VIEW extends TextFileView {
    private _codemirror: CodeMirror.Editor;

    private _extension: string = '';

    constructor(leaf: WorkspaceLeaf, extension: string) {
        super(leaf);

        this._extension = extension;


        this._codemirror = CodeMirror(this.contentEl, {
            theme: 'obsidian',
        });

        this._codemirror.on('changes', this.onChange);
    }

    onResize(): void {
        this._codemirror.refresh();
    }

    onChange = async () => {
        this.requestSave();
    }

    getViewData(): string {
        return this._codemirror.getValue();
    }

    setViewData(data: string, clear: boolean): void {
        if (clear)
            this._codemirror.swapDoc(CodeMirror.Doc(data, `text/x-${this._extension}`));
        else
            this._codemirror.setValue(data);
    }

    clear(): void {
        this._codemirror.setValue('');
        this._codemirror.clearHistory();
    }

    getDisplayText(): string {
        if (this.file)
            return this.file.basename;
        else
            return 'no file';
    }

    canAcceptExtension(extension: string): boolean {
        return extension === this._extension;
    }

    getViewType(): string {
        return 'mirrorview';
    }
}
