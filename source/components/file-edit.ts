import {
    Modal,
    ButtonComponent,
    TextComponent,
    TAbstractFile,
    Setting,
} from "obsidian";

import UNITADE_PLUGIN from "./../main";
import MODALES_LOCALE from "./../locales/modals.text";

export class TFileEdit extends Modal {
    private _filepath: string;
    private _filename: string;
    private _extension: string;

    private _name: string;

    private _integration: boolean;

    constructor(
        private plugin: UNITADE_PLUGIN,
        private target: TAbstractFile
    ) {
        super(plugin.app);

        this.target ??= this.plugin.app.vault.getRoot();

        this._filename = this.target.path.split('/').last()!;
        this._filepath = this.target.path.split('/').slice(0, -1).join('/');

        this._extension = this._filename.split('.').slice(1).join('.')!;

        this._name = this._filename.split('.').first()!;

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

        disp.innerHTML = this.__pathgen();

        input.inputEl.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.__submit();
            } else if (e.key === "Escape") {
                this.close();
            }
        });

        input.setValue(this._name);
        input.onChange((value) => {
            this._extension = value.startsWith(".") ? value.slice(1) : value;

            disp.innerHTML = this.__pathgen();
        });

        new ButtonComponent(form)
            .setCta()
            .setIcon('pencil')
            .setButtonText("Create")
            .onClick(() => (this.__submit()));

        new Setting(contentEl)
            .setName(MODALES_LOCALE.gtToggle1().name)
            .setDesc(MODALES_LOCALE.gtToggle1().desc)
            .addToggle(toggle => {
                toggle
                    .setValue(this._integration)
                    .onChange(async (value) => {
                        this._integration = value;
                    });

                return toggle;
            });
    }

    onClose() {
        const { contentEl } = this;

        contentEl.empty();
    }

    private async __submit() {
        this.close();

        if (this._integration) {
            let next = {
                ...this.plugin.settings,
            };

            next.extensions += `;${this._extension}`;

            this.plugin.uptSettings(next);
        }

        await this.app.vault.rename(this.target, this.__pathgen());
    }

    private __pathgen(): string {
        return this._filepath + "/" + this._name + (!!this._extension ? "." : "") + this._extension;
    }
} 
