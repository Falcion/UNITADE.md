import { Editor } from "obsidian";
import UNITADE_PLUGIN from "../main";
import { getLanguage } from "../utils/utils";

export class ContextEditCodeblocks {
	private start = 0;

	private end = 0;

	private editor?: Editor;

	private isInValidFence = false;

	private constructor(private plugin: UNITADE_PLUGIN) {
		this.initializeStartAndEnd();

		this.validateFence();
	}

	static create(plugin: UNITADE_PLUGIN) {
		return new ContextEditCodeblocks(plugin);
	}

	private initializeStartAndEnd() {
		this.editor = this.plugin.app.workspace.activeEditor?.editor;

		const cursor = this.editor?.getCursor();

		if (!this.editor || !cursor) return;

		this.start = cursor.line;
		this.end = cursor.line;
		do {
			this.start--;
		} while (
			this.start >= 0 &&
			!this.editor.getLine(this.start).startsWith("```")
		);
		do {
			this.end++;
		} while (
			this.end < this.editor.lineCount() &&
			!this.editor.getLine(this.end).startsWith("```")
		);
	}

	private validateFence() {
		if (!this.editor) {
			return;
		}

		if (this.start < 0 || this.end >= this.editor.lineCount()) {
			return;
		}

		let fenceLines = 0;

		// Сheck in front the current аence, 
		// if there is an uneven number of fences, we are not in a valid fence.
		for (let i = 0; i < this.start; i++) {
			if (this.editor.getLine(i).startsWith("```")) {
				fenceLines++;
			}
		}

		if (fenceLines % 2 === 1) {
			return;
		}

		this.isInValidFence = true;
	}

	isInFence() {
		return this.isInValidFence;
	}

	getFenceData() {
		if (!this.editor || !this.isInValidFence) return null;

		let editorContent = "";
		for (let i = this.start + 1; i < this.end; i++) {
			editorContent += `${this.editor.getLine(i)}\n`;
		}

		const content = editorContent.slice(0, editorContent.length - 1);
		const langKey = this.editor.getLine(this.start).slice(3).trim();
		const language = getLanguage(langKey);

		return { content, language };
	}

	getEditor() {
		return this.editor;
	}

	getBounds() {
		return [this.start, this.end];
	}

	replaceFenceContent(value: string) {
		this.editor?.replaceRange(
			`${value}\n`,
			{ line: this.start + 1, ch: 0 },
			{ line: this.end, ch: 0 }
		);
	}
}
