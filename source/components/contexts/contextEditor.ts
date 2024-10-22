
import * as monaco from 'monaco-editor';

import UNITADE_PLUGIN from './../../main';
import { genEditorSettings } from './../../utils/utils';

export class ContextEditor {
	contentEl: HTMLElement;
	value = "";
	monacoEditor: monaco.editor.IStandaloneCodeEditor;
	plugin: UNITADE_PLUGIN;

	constructor(contentEl: HTMLElement, plugin: UNITADE_PLUGIN, code: string, language: string, miniMap: boolean = true, wordWrap: boolean = false) {
		this.contentEl = contentEl;
		this.plugin = plugin;
		this.value = code;

		const setting = genEditorSettings(this.plugin.settings, language, miniMap, wordWrap);

		this.monacoEditor = monaco.editor.create(this.contentEl, setting);
		this.monacoEditor.setValue(this.value);
	}

	getValue() {
		return this.monacoEditor.getValue();
	}
}
