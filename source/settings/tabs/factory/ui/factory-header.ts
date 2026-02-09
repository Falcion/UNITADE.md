import { HeaderLevel } from '@settings/utils/consts/enums/header_level';
import { IUnitadeTabBuilder } from '@settings-factory/builder';

export function makeHeader(
    name: string,
    builder: IUnitadeTabBuilder,
    level: HeaderLevel,
    alignment: string,
    cssClasses?: string[] | string,
): HTMLHeadingElement {
    const headerEl = builder.containerEl.createEl(level, {
        cls: `unitade-settings-header`,
        text: name
    }) as HTMLHeadingElement;

    headerEl.setAttribute('data-variant', alignment);

    if (cssClasses) {
        Array.isArray(cssClasses)
            ? headerEl.addClasses(cssClasses)
            : headerEl.addClass(cssClasses);
    }

    return headerEl;
}
