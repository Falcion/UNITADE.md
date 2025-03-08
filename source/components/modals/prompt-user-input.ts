import { App, Modal, Setting } from 'obsidian';
import LocalesModule from './../../locales/core';

export class PromptUserInput extends Modal {
    constructor(app: App, title: string, locale: LocalesModule, onSubmit: (result: string) => void) {
        super(app);
        this.setTitle(title);

        let name = '';
        new Setting(this.contentEl)
            .setName(locale.getLocaleItem('PROMPT_LOCALES')[0]!)
            .addText((text) =>
                text.onChange((value) => {
                    name = value;
                }));

        new Setting(this.contentEl)
            .addButton((btn) =>
                btn
                    .setButtonText(locale.getLocaleItem('PROMPT_LOCALES')[1]!)
                    .setCta()
                    .onClick(() => {
                        this.close();
                        onSubmit(name);
                    }));
    }
}
