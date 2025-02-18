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
    Modal,
    ButtonComponent,
    TextComponent,
    TAbstractFile,
} from "obsidian";

import UNITADE_PLUGIN from "../../main";

export class TFilesRename extends Modal {
    private _new_name: string = '';

    private _integration: boolean;

    private _new_name_queue: string[] = [];

    constructor(
        private plugin: UNITADE_PLUGIN,
        private target: TAbstractFile[]
    ) {
        super(plugin.app);

        this.target ??= [this.plugin.app.vault.getRoot()];

        this._integration = false;
    }

    onOpen(): void {
        const { contentEl } = this;

        const form = contentEl.createEl("div");
        const disp = contentEl.createEl("span");

        const input = new TextComponent(form);

        contentEl.style.cssText =
            `
            display:          flex;
            align-items:    center;
            flex-direction: column;
            `;
        disp.style.cssText =
            `
            flex-grow:       1;
            font-weight:  bold;
            margin-top:   10px;
            margin-right: 10px;
            margin-bottom: 5px;
            text-align: center;
            `;
        form.style.cssText =
            `
            display:       flex;
            align-items: center;
            `;
        input.inputEl.style.cssText =
            `
            flex-grow:       1;
            margin-right: 10px;
            `;

        disp.innerHTML = this.__generateDisplayInfo();

        input.inputEl.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.__submit();
            } else if (e.key === "Escape") {
                this.close();
            }
        });

        input.setValue(this._new_name);
        input.onChange((value) => {
            this._new_name = value.startsWith(".") ? value.slice(1) : value;

            disp.innerHTML = this.__generateDisplayInfo();
        });

        new ButtonComponent(form)
            .setCta()
            .setIcon('pencil')
            .setButtonText("Rename")
            .onClick(() => (this.__submit()));
    }

    onClose() {
        const { contentEl } = this;

        contentEl.empty();
    }

    private async __submit() {
        this.close();

        this.target.forEach(async (file) => {
            const filename = file.path.split('/').last()!
            const filepath = file.path.split('/').slice(0, -1).join('/');

            const extension = filename.split('.').last()!;

            const destination = this.__pathgen(filepath, extension);

            this._new_name_queue.push(destination);

            await this.app.vault.rename(file, destination);
        });
    }

    private __pathgen(path: string, extension: string): string {
        let fin_name = this._new_name;

        if (this._new_name_queue.first()) {
            fin_name = `${this._new_name} (${this._new_name_queue.length})`;
        }

        return path + "/" + fin_name + (extension ? "." : "") + extension;
    }

    private __generateDisplayInfo(): string {
        return this.target.map(file => {
            const filename = file.path.split('/').last()!;
            const filepath = file.path.split('/').slice(0, -1).join('/');
            const extension = filename.split('.').slice(1).join('.')!;
            return `<div>${filepath}/${this._new_name}.${extension}</div>`;
        }).join('');
    }
} 
