import { TextFileView, TFile, WorkspaceLeaf } from "obsidian";
import * as monaco from 'monaco-editor';
import { genEditorSettings } from "../../utils/utils";
import UnitadePlugin from "../../main";

/**
 * The `UNITADE_VIEW_CODE` class provides a code editor view powered by the Monaco Editor.
 * It is designed for the UNITADE plugin and is responsible for handling file loading, saving,
 * and providing an enhanced code editing experience within Obsidian.
 */
export class UNITADE_VIEW_CODE extends TextFileView {

    value = "";
    monacoEditor!: monaco.editor.IStandaloneCodeEditor;

    constructor(leaf: WorkspaceLeaf, private plugin: UnitadePlugin) {
        super(leaf);
    }

    /**
     * Executes when the view is opened. Initializes necessary components.
     */
    async onOpen() {
        await super.onOpen();
    }

    async onLoadFile(file: TFile) {
        const setting = genEditorSettings(this.plugin.settings, this.file?.extension ?? "");

        this.monacoEditor = monaco.editor.create(this.contentEl, setting);
        this.monacoEditor.onDidChangeModelContent(() => {
            this.requestSave();
        });

        this.addCtrlKeyWheelEvents();
        this.addKeyEvents();

        this.plugin.statusBarConfig.update({
            cursor_columns: this.monacoEditor.getPosition() ? this.monacoEditor.getPosition()!.column : 0,
            cursor_lines: this.monacoEditor.getPosition() ? this.monacoEditor.getPosition()!.lineNumber : 0,
            processor: this.monacoEditor.getModel() ? this.monacoEditor.getModel()!.id : this.plugin.locale.getLocaleItem('STATUS_BAR')[0]!,
            display: this.monacoEditor.getModel()?.getLanguageId() ? this.monacoEditor.getModel()?.getLanguageId() : this.plugin.locale.getLocaleItem('STATUS_BAR')[0]!,
        });

        this.plugin.updateStatusBar();

        this.monacoEditor.onDidChangeCursorPosition(() => {
            const cursor = this.monacoEditor.getPosition();

            if (cursor)
                this.plugin.statusBarConfig.update({
                    cursor_columns: cursor.column,
                    cursor_lines: cursor.lineNumber
                });

            this.plugin.updateStatusBar();
        });

        await super.onLoadFile(file);
    }

    async onUnloadFile(file: TFile) {
        this.containerEl.removeEventListener('keydown', this.__keyHandler, true);
        this.containerEl.removeEventListener('wheel', this.__mousewheelHandler);

        await super.onUnloadFile(file);

        await this.__saveFontSize();

        this.monacoEditor.dispose();
    }

    async onClose() {
        this.containerEl.removeEventListener('keydown', this.__keyHandler, true);
        this.containerEl.removeEventListener('wheel', this.__mousewheelHandler);

        await super.onClose();

        await this.__saveFontSize();
    }

    onResize() {
        this.monacoEditor.layout();
    }

    /**
     * Retrieves the view type for this instance.
     * 
     * @returns The view type as a string.
     */
    getViewType(): string {
        return 'codeview';
    }

    getContext(file?: TFile) {
        return file?.path ?? this.file?.path;
    }

    getViewData = (): string => {
        return this.monacoEditor.getValue();
    }

    setViewData = (data: string, clear: boolean) => {
        if (clear) {
            this.monacoEditor.getModel()?.setValue(data);
        } else {
            this.monacoEditor.setValue(data);
        }
    }

    clear = () => {
        this.monacoEditor.setValue('');
    }

    private addKeyEvents = () => {
        this.containerEl.addEventListener('keydown', this.__keyHandler, true);

        // Bind custom paste handler to Ctrl+V (or Cmd+V on Mac)
        if (this.plugin.settings.code_editor_settings.force_vanilla_paste) {
            this.monacoEditor.addCommand(
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV,
                () => this.__handlePaste()
            );
        }

        // Bind custom paste handler to Shift+Insert
        this.monacoEditor.addCommand(
            monaco.KeyMod.Shift | monaco.KeyCode.Insert,
            () => this.__handlePaste()
        );
    }


    private addCtrlKeyWheelEvents = () => {
        if (this.plugin.settings.code_editor_settings.enable_zoom)
            this.containerEl.addEventListener('wheel', this.__mousewheelHandler, {
                capture: this.plugin.settings.code_editor_settings.enable_zoom,
                passive: !this.plugin.settings.code_editor_settings.enable_zoom,
            });
    }

    private __handlePaste = async () => {
        try {
            this.monacoEditor.focus();

            // Get the current clipboard contents
            const text = await navigator.clipboard.readText();

            // Get the current selection in the editor
            const selection = this.monacoEditor.getSelection();
            if (!selection) {
                return;
            }

            // Replace the current selection with the text from the clipboard
            this.monacoEditor.executeEdits("clipboard", [{
                range: selection,
                text: text,
                forceMoveMarkers: true,
            }]);

            // Move cursor to end of pasted text
            const lines = text.split('\n');
            const endLineNumber = selection.startLineNumber + lines.length - 1;
            const endColumn = lines.length === 1
                ? selection.startColumn + text.length
                : lines[lines.length - 1].length + 1;

            this.monacoEditor.setPosition({
                lineNumber: endLineNumber,
                column: endColumn
            });
        } catch (error) {
            console.error('Failed to paste from clipboard:', error);
            // If clipboard API fails, let Monaco try its default behavior
        }
    }

    private __keyHandler = async (event: KeyboardEvent) => {
        if (this.getViewType() !== 'codeview') return;

        const KEYMAP = new Map<string, string>([
            ['f', 'actions.find'],
            ['h', 'editor.action.startFindReplaceAction'],
            ['/', 'editor.action.commentLine'],
            ['Enter', 'editor.action.insertLineAfter'],
            ['[', 'editor.action.outdentLines'],
            [']', 'editor.action.indentLines'],
            ['d', 'editor.action.copyLinesDownAction'],
        ]);

        if (event.ctrlKey) {
            const trigger_name = KEYMAP.get(event.key);

            if (trigger_name)
                this.monacoEditor.trigger('', trigger_name, null);
        }

        if (event.altKey) {
            if (event.key === 'z') {
                const next = {
                    ...this.plugin.settings,
                    code_editor_settings: {
                        ...this.plugin.settings.code_editor_settings,
                        word_wrapping: !this.plugin.settings.code_editor_settings.word_wrapping,
                    },
                };

                await this.plugin.uptSettings(next);

                this.monacoEditor.updateOptions({
                    wordWrap: this.plugin.settings.code_editor_settings.word_wrapping ? "on" : "off",
                });
            }
        }
    }

    private __mousewheelHandler = async (event: WheelEvent) => {
        if (event.ctrlKey) {
            const delta = event.deltaY > 0 ? 1 : -1;

            this.monacoEditor!.updateOptions({
                fontSize: (this.monacoEditor.getOption(monaco.editor.EditorOption.fontSize) + delta),
            });

            event.stopPropagation();
        }
    }

    private __saveFontSize = async () => {
        // await this.plugin.uptSettingsVisuals({
        //     code_editor_settings: {
        //         ...this.plugin.settings.code_editor.visuals,
        //         font_size: this.monacoEditor.getOption(monaco.editor.EditorOption.fontSize)
        //     });
    }
}
