import { TextFileView, TFile, WorkspaceLeaf } from "obsidian";
import * as monaco from 'monaco-editor';
import { genEditorSettings } from "../../utils/utils";
import UNITADE_PLUGIN from "../../main";

/**
 * The `UNITADE_VIEW_CODE` class provides a code editor view powered by the Monaco Editor.
 * It is designed for the UNITADE plugin and is responsible for handling file loading, saving,
 * and providing an enhanced code editing experience within Obsidian.
 */
export class UNITADE_VIEW_CODE extends TextFileView {

    value = "";
    monacoEditor: monaco.editor.IStandaloneCodeEditor | undefined;

    /**
     * Creates an instance of the `UNITADE_VIEW_CODE`.
     * 
     * @param leaf - The workspace leaf associated with this view.
     * @param plugin - Reference to the `CodeFilesPlugin` instance.
     */
    constructor(leaf: WorkspaceLeaf, private plugin: UNITADE_PLUGIN) {
        super(leaf);
    }

    /**
     * Executes when the view is opened. Initializes necessary components.
     */
    async onOpen() {
        await super.onOpen();
    }

    /**
     * Loads a file into the Monaco editor.
     * 
     * @param file - The TFile instance representing the file to be loaded.
     */
    async onLoadFile(file: TFile) {
        // Generate editor settings based on the plugin's configuration and file extension
        const setting = genEditorSettings(this.plugin.settings, this.file?.extension ?? "");
        this.monacoEditor = monaco.editor.create(this.contentEl, setting);

        // Trigger file save when editor content changes
        this.monacoEditor.onDidChangeModelContent(() => {
            this.requestSave();
        });

        this.addCtrlKeyWheelEvents();
        this.addKeyEvents();

        await super.onLoadFile(file);
    }

    /**
     * Unloads the current file, removes event listeners, and disposes of the Monaco editor.
     * 
     * @param file - The TFile instance representing the file being unloaded.
     */
    async onUnloadFile(file: TFile) {
        window.removeEventListener('keydown', this.keyHandle, true);
        await super.onUnloadFile(file);
        
        this.monacoEditor!.dispose();
    }

    /**
     * Executes when the view is closed.
     */
    async onClose() {
        await super.onClose();
    }

    /**
     * Recalculates the layout of the Monaco editor when the view is resized.
     */
    onResize() {
        this.monacoEditor!.layout();
    }

    /**
     * Retrieves the view type for this instance.
     * 
     * @returns The view type as a string.
     */
    getViewType(): string {
        return 'codeview';
    }

    /**
     * Retrieves the file path for the current context.
     * 
     * @param file - Optional TFile instance representing the current file.
     * @returns The file path or undefined if no file is loaded.
     */
    getContext(file?: TFile) {
        return file?.path ?? this.file?.path;
    }

    /**
     * Retrieves the current content of the editor.
     * 
     * @returns The current editor content as a string.
     */
    getViewData = (): string => {
        return this.monacoEditor!.getValue();
    }

    /**
     * Sets the content of the editor.
     * 
     * @param data - The string content to be set in the editor.
     * @param clear - If true, clears the current content before setting the new data.
     */
    setViewData = (data: string, clear: boolean) => {
        if (clear) {
            this.monacoEditor!.getModel()?.setValue(data);
        } else {
            this.monacoEditor!.setValue(data);
        }
    }

    /**
     * Clears the editor's content.
     */
    clear = () => {
        this.monacoEditor!.setValue('');
    }

    /**
     * Adds event listeners for keyboard shortcuts in the editor.
     */
    private addKeyEvents = () => {
        window.addEventListener('keydown', this.keyHandle, true);
    }

    /**
     * Adds event listeners for handling `Ctrl` + mouse wheel events to adjust font size.
     */
    private addCtrlKeyWheelEvents = () => {
        this.containerEl.addEventListener('wheel', this.mousewheelHandle, true);
    }

    /**
     * Handles specific key events such as `Ctrl + f` for search or `Alt + z` for toggling word wrap.
     * 
     * @param event - The keyboard event.
     */
    private keyHandle = (event: KeyboardEvent) => {
        const ctrlMap = new Map<string, string>([
            ['f', 'actions.find'],
            ['h', 'editor.action.startFindReplaceAction'],
            ['/', 'editor.action.commentLine'],
            ['Enter', 'editor.action.insertLineAfter'],
            ['[', 'editor.action.outdentLines'],
            [']', 'editor.action.indentLines'],
            ['d', 'editor.action.copyLinesDownAction'],
        ]);
        
        if (event.ctrlKey) {
            const triggerName = ctrlMap.get(event.key);
            if (triggerName) {
                this.monacoEditor!.trigger('', triggerName, null);
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

                this.plugin.uptSettings(next);
                this.monacoEditor!.updateOptions({
                    wordWrap: this.plugin.settings.code_editor_settings.word_wrapping ? "on" : "off",
                });
            }
        }
    }

    /**
     * Handles `Ctrl + mouse wheel` events to adjust font size in the editor.
     * 
     * @param event - The wheel event.
     */
    private mousewheelHandle = (event: WheelEvent) => {
        if (event.ctrlKey) {
            const delta = event.deltaY > 0 ? 1 : -1;

            const next = {
                ...this.plugin.settings,
                code_editor_settings: {
                    ...this.plugin.settings.code_editor_settings,
                    font_size: this.plugin.settings.code_editor_settings.font_size += delta,
                },
            }

            this.plugin.uptSettings(next);
            this.monacoEditor!.updateOptions({
                fontSize: this.plugin.settings.code_editor_settings.font_size,
            });

            event.stopPropagation();
        }
    }
}
