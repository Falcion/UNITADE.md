import {
    TextFileView,
    WorkspaceLeaf,
} from "obsidian";

import CodeMirror from './../../lib/codemirror';

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

    onChange = async (instance: CodeMirror.Editor, changes: CodeMirror.EditorChange[]) => {
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
        return this._extension;
    }
}
