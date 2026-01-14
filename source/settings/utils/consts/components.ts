import { AbstractTextComponent, BaseComponent, ButtonComponent, ColorComponent, DropdownComponent, ExtraButtonComponent, MomentFormatComponent, ProgressBarComponent, SearchComponent, Setting, SliderComponent, TextAreaComponent, TextComponent, ToggleComponent } from "obsidian";

/**
 * @description
 * Component type mapping: maps component classes to their primary element property names.
 */
export const COMPONENTS_MAP: ReadonlyArray<{
    type: new (...args: any[]) => BaseComponent;
    elementKey: string;
}> = [
        { type: Setting as any, elementKey: 'settingEl' },
        { type: TextAreaComponent, elementKey: 'inputEl' },
        { type: SliderComponent, elementKey: 'sliderEl' },
        { type: ButtonComponent, elementKey: 'buttonEl' },
        { type: ColorComponent, elementKey: 'colorPickerEl' },
        { type: DropdownComponent, elementKey: 'selectEl' },
        { type: ExtraButtonComponent, elementKey: 'extraSettingsEl' },
        { type: MomentFormatComponent, elementKey: 'inputEl' },
        { type: ProgressBarComponent, elementKey: 'lineEl' },
        { type: SearchComponent, elementKey: 'inputEl' },
        { type: TextComponent, elementKey: 'inputEl' },
        { type: ToggleComponent, elementKey: 'toggleEl' },
        { type: AbstractTextComponent, elementKey: 'inputEl' },
    ];
