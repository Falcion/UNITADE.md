
import UnitadePlugin from "@main";

import {
    TextFileView,
    WorkspaceLeaf,
    TFile
} from "obsidian";

import { IUnitadeView } from "@views/interface_view";
import IUnitadeStatusBarPayload from "@typings/components/status/bar_config";

import * as monaco from 'monaco-editor';

import { genEditorSettings } from "../../utils/utils";

export class UnitadeViewCode extends TextFileView implements IUnitadeView {
    editor!: monaco.editor.IStandaloneCodeEditor
    extension: string = '';

    constructor(leaf: WorkspaceLeaf, private plugin: UnitadePlugin) {
        super(leaf);
    }

    async onOpen() {
        await super.onOpen();
    }

    async onLoadFile(file: TFile) {
        const context = genEditorSettings(this.plugin.settings, this.file?.extension ?? "");

        this.plugin.updateStatusBarInfo(this.prepStatusBarInfo());

        this.editor = monaco.editor.create(this.contentEl, context);
        this.editor.onDidChangeModelContent(() => {
            this.requestSave();
        });
        this.editor.onDidChangeCursorPosition(() => {
            this.plugin.updateStatusBarInfo(this.prepStatusBarInfo());
        });

        this.addKeyActions();
        this.addMouseActions();

        await super.onLoadFile(file);
    }

    async onUnloadFile(file: TFile) {
        this.removeKeyActions();
        this.removeMouseActions();

        await super.onUnloadFile(file);

        this.editor.dispose();
    }

    async onClose() {
        this.removeKeyActions();
        this.removeMouseActions();

        await super.onClose();
        this.editor.dispose();
    }

    //#region Interface callbacks
    onResize() {
        this.editor.layout();
    }

    getViewType(): string {
        return 'codeview';
    }

    getContext(file?: TFile) {
        return file?.path ?? this.file?.path;
    }

    getViewData = (): string => {
        return this.editor.getValue();
    }

    setViewData = (data: string, clear: boolean) => {
        if (clear) {
            this.editor.getModel()?.setValue(data);
        } else {
            this.editor.setValue(data);
        }
    }

    clear = () => {
        this.editor.setValue('');
    }
    //#endregion

    private prepStatusBarInfo(): IUnitadeStatusBarPayload {
        return {
            cursor_lines:
                this.editor.getPosition()?.lineNumber,
            cursor_columns:
                this.editor.getPosition()?.column,
            display:
                this.editor.getModel()?.getLanguageId(),
            processor:
                this.editor.getModel()?.id
        }
    }

    private addKeyActions(): void {
    }
    private removeKeyActions(): void {
    }

    private addMouseActions(): void {
    }
    private removeMouseActions(): void {
    }
}
