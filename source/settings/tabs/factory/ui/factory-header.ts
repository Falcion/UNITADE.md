import { HeaderLevel } from '@settings/utils/consts/enums/header_level';
import { IUnitadeTabBuilder } from '@settings-factory/builder';

export function makeHeader(
    name: string,
    builder: IUnitadeTabBuilder,
    level: HeaderLevel,
    alignment: string
): HTMLHeadingElement {
    const headerEl = builder.containerEl.createEl(level, {
        cls: `unitade-settings-header`,
        text: name
    }) as HTMLHeadingElement;

    headerEl.setAttribute('data-variant', alignment);

    return headerEl;
}
