import { ISettings } from "@settings/defaults_interface";
import { IUnitadeTabBuilder } from "@settings-factory/builder";
import { getDeep } from "@settings/utils/functions/deep";
import { NestedKey } from "@settings/utils/types/nested_key";
import { DEFAULT_SLIDER_LIMITS, SliderLimits } from "@settings/utils/types/slider_limits";
import { DEFAULT_SLIDER_OPTIONS, SliderOptions } from "@settings/utils/types/slider_options";
import { SliderComponent } from "obsidian";

export function makeValueSlider<P extends NestedKey<ISettings>>(
    path: P,
    builder: IUnitadeTabBuilder,
    limits: SliderLimits = DEFAULT_SLIDER_LIMITS,
    options: SliderOptions = DEFAULT_SLIDER_OPTIONS,
    cssStyle: boolean = true,
    onChangeExtra?: (value: number) => void | Promise<void>
): SliderComponent {
    const currentVal = getDeep(builder.plugin.settings, path) ?? 0;

    const slider = new SliderComponent(builder.containerEl)
        .setValue(currentVal)
        .setLimits(
            limits.min,
            limits.max,
            limits.step)
        .onChange(async (value) => {
            await builder.updateSetting(path, value);

            if (onChangeExtra)
                await onChangeExtra(value);
        })
        .setInstant(options.instant ?? false);

    if (options.tooltip || options.tooltipDynamic) {
        slider.showTooltip();

        if (options.tooltipDynamic)
            slider.setDynamicTooltip();
    }

    if (cssStyle) slider.sliderEl.addClass("unitade-slider-container");

    return slider;
}
