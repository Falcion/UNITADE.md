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

        this.plugin.StatusBarInfo.update({
            cursor_columns: this.monacoEditor.getPosition() ? this.monacoEditor.getPosition()!.column : 0,
            cursor_lines: this.monacoEditor.getPosition() ? this.monacoEditor.getPosition()!.lineNumber : 0,
            processor: this.monacoEditor.getModel() ? this.monacoEditor.getModel()!.id : this.plugin.locale.getLocaleItem('STATUS_BAR')[0]!,
            display: this.monacoEditor.getModel()?.getLanguageId() ? this.monacoEditor.getModel()?.getLanguageId() : this.plugin.locale.getLocaleItem('STATUS_BAR')[0]!,
        });

        this.plugin.updateStatusBar();

        this.monacoEditor.onDidChangeCursorPosition(() => {
            const cursor = this.monacoEditor.getPosition();

            if (cursor)
                this.plugin.StatusBarInfo.update({
                    cursor_columns: cursor.column,
                    cursor_lines: cursor.lineNumber
                });

            this.plugin.updateStatusBar();
        });

        await super.onLoadFile(file);
    }

    async onUnloadFile(file: TFile) {
        this.containerEl.removeEventListener('keydown', this.keyboardHandler, true);
        this.containerEl.removeEventListener('wheel', this.mouseWheelHandler);

        await super.onUnloadFile(file);

        this.monacoEditor.dispose();
    }

    async onClose() {
        this.containerEl.removeEventListener('keydown', this.keyboardHandler, true);
        this.containerEl.removeEventListener('wheel', this.mouseWheelHandler);

        await super.onClose();
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
        this.containerEl.addEventListener('keydown', this.keyboardHandler, true);

        // Bind custom paste handler to Ctrl+V (or Cmd+V on Mac)
        if (this.plugin.settings.code_editor_settings.force_vanilla_paste) {
            this.monacoEditor.addCommand(
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV,
                () => this.customHandlePaste()
            );
        }

        // Bind custom paste handler to Shift+Insert
        this.monacoEditor.addCommand(
            monaco.KeyMod.Shift | monaco.KeyCode.Insert,
            () => this.customHandlePaste()
        );
    }


    private addCtrlKeyWheelEvents = () => {
        if (this.plugin.settings.code_editor_settings.enable_zoom)
            this.containerEl.addEventListener('wheel', this.mouseWheelHandler, {
                capture: this.plugin.settings.code_editor_settings.enable_zoom,
                passive: !this.plugin.settings.code_editor_settings.enable_zoom,
            });
    }

    private customHandlePaste = async () => {
        try {
            this.monacoEditor.focus();

            const text = await navigator.clipboard.readText();

            const selection = this.monacoEditor.getSelection();
            if (!selection) {
                return;
            }

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

            // If custom handle fails, try to call for standard API callback
            navigator.clipboard.readText().then((clipboard) => {
                this.monacoEditor.trigger('', 'paste', { text: clipboard });
            })
        }
    }

    private keyboardHandler = async (event: KeyboardEvent) => {
        if (this.getViewType() !== 'codeview') return;

        const modEnabled = event.ctrlKey || event.metaKey;

        const KEYMAP = new Map<string, string>([
            ['f', 'actions.find'],
            ['h', 'editor.action.startFindReplaceAction'],
            ['/', 'editor.action.commentLine'],
            ['Enter', 'editor.action.insertLineAfter'],
            ['[', 'editor.action.outdentLines'],
            [']', 'editor.action.indentLines'],
            ['d', 'editor.action.copyLinesDownAction'],
        ]);

        if (modEnabled) {
            const trigger_name = KEYMAP.get(event.key);

            if (trigger_name) {
                event.preventDefault();
                event.stopPropagation();

                // We don't need to use "Paste" trigger since we
                // have {handlePaste}

                if (trigger_name === 'copy') {
                    const selection = this.monacoEditor.getSelection();
                    const model = this.monacoEditor.getModel();

                    if (selection && model)
                        navigator.clipboard.writeText(model.getValueInRange(selection));

                }
                else if (trigger_name === 'cut') {
                    const selection = this.monacoEditor.getSelection();
                    const model = this.monacoEditor.getModel();
                    if (selection && model) {
                        navigator.clipboard.writeText(model.getValueInRange(selection));

                        this.monacoEditor.executeEdits('cut', [{
                            range: selection,
                            text: '',
                            forceMoveMarkers: true
                        }]);
                    }
                }
                else
                    this.monacoEditor.trigger('', trigger_name, null);
            }
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

    private mouseWheelHandler = async (event: WheelEvent) => {
        const modEnabled = event.ctrlKey || event.metaKey;

        if (modEnabled) {
            const delta = event.deltaY > 0 ? 1 : -1;

            this.monacoEditor!.updateOptions({
                fontSize: (this.monacoEditor.getOption(monaco.editor.EditorOption.fontSize) + delta),
            });

            event.stopPropagation();
        }
    }
}
