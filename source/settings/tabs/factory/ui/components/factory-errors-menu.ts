import { IUnitadeTabBuilder } from "@settings-factory/builder";
import { DEFAULT_ERRORS_MENU_OPTIONS, ErrorsMenuOptions } from "@settings/utils/types/errors";
import { makeHeader } from "@settings-ui/factory-header";
// import { makeSetting } from "../factory-setting";

export function makeErrorsMenu(
    builder: IUnitadeTabBuilder,
    options: ErrorsMenuOptions = DEFAULT_ERRORS_MENU_OPTIONS
): HTMLDivElement {
    function get(): Array<[string, string]> {
        const errors = builder.plugin.settings.ERRORS;

        if (Array.isArray(errors)) return errors;
        if (errors instanceof Map) return Array.from(errors.entries());
        return Object.entries(errors);
    }

    const errors = get();

    if (options.title)
        makeHeader('ERRORS', builder, 'h3', 'left', 'unitade-errors-menu-header')

    const container = builder.containerEl.createDiv({
        cls: 'unitade-errors-menu'
    });

    if (options.title)
        container.createEl('p', {
            text: 'DISPLAYS ERRORS ONLY BY UNITADE. ALSO DISPLAYS ERRORS ONLY """CATCHED""" BY UNITADE. THIS IS NOT REPLACEMENT FOR DEVELOPER CONSOLE, ONLY HELPS TO QUICKLY IDENTIFY PROBLEMS WITH SETTINGS.',
            cls: ['setting-item-description', 'unitade-errors-menu-summary']
        })

    const table = container.createEl('table', {
        cls: 'unitade-errors-table'
    }) as HTMLTableElement;

    const thead = table.createTHead() as HTMLTableSectionElement;
    const tbody = table.createTBody() as HTMLTableSectionElement;

    if (errors.length === 0) {
        tbody.createEl('tr').createEl('td', {
            text: 'NO ERRORS. GOOD',
            cls: 'unitade-errorless'
        });

        return container;
    }

    const header = thead.createEl('tr');

    header.createEl('th', {
        text: 'PATH',
        cls: 'unitade-errors-data'
    });

    header.createEl('th', {
        text: 'MESSAGE',
        cls: 'unitade-errors-message'
    });

    for (const [path, message] of errors) {
        const row = tbody.createEl('tr');

        row.createEl('td', {
            text: path,
            cls: ['unitade-errors-data']
        }).setAttribute('data-type', path);
        row.createEl('td', {
            text: message,
            cls: 'unitade-errors-message'
        });
    }

    return container;
}

export default makeErrorsMenu;
