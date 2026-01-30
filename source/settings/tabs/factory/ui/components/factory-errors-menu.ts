import { IUnitadeTabBuilder } from "@settings-factory/builder";
import { getThemeObsidian } from "@settings/utils/functions/themes";

/**
 * Factory: Errors Menu
 * Displays a readable list of errors with color coding based on theme variant.
 * Uses existing plugin error system (settings.ERRORS).
 */

export type ErrorsRecord = Record<string, string>;

export interface ErrorsMenuOptions {
    title?: string;
    showCount?: boolean;
}

function toEntries(errors?: ErrorsRecord | Map<string, string> | Array<[string, string]>): Array<[string, string]> {
    if (!errors) return [];
    if (Array.isArray(errors)) return errors;
    if (errors instanceof Map) return Array.from(errors.entries());
    return Object.entries(errors);
}

export function makeErrorsMenu(
    builder: IUnitadeTabBuilder,
    options: ErrorsMenuOptions = {}
): HTMLDivElement {
    const { title = 'Errors', showCount = true } = options;
    const entries = toEntries(builder.plugin.settings.ERRORS);
    const theme = getThemeObsidian();

    const wrapper = builder.containerEl.createDiv({ cls: 'unitade-errors-menu' });
    wrapper.setAttribute('data-variant', theme);

    // Header
    const header = wrapper.createDiv({ cls: 'unitade-errors-header' });
    header.createEl('div', { text: title, cls: 'unitade-errors-title' });

    if (entries.length === 0) {
        const empty = wrapper.createDiv({ text: 'No errors in current instance' });
        empty.addClasses(['unitade-addition-text', 'unitade-info', 'unitade-errors-empty']);
        return wrapper;
    }

    // Summary
    if (showCount) {
        const summary = header.createDiv({ text: `${entries.length} error${entries.length !== 1 ? 's' : ''} detected` });
        summary.addClasses(['unitade-addition-text', 'unitade-comment', 'unitade-errors-summary']);
    }

    // Errors section
    const section = wrapper.createDiv({ cls: 'unitade-errors-section' });
    const list = section.createEl('ul', { cls: 'unitade-errors-list' });

    for (const [key, message] of entries) {
        const li = list.createEl('li', { cls: 'unitade-errors-item' });
        const line = li.createDiv({ cls: 'unitade-errors-row' });

        line.createEl('code', { text: key, cls: 'unitade-errors-key' });

        const msg = line.createEl('span', { text: message });
        msg.addClasses(['unitade-addition-text', 'unitade-attention', 'unitade-errors-message']);
    }

    return wrapper;
}

export default makeErrorsMenu;
