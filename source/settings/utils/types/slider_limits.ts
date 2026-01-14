import { DEFAULT_SETTINGS } from "@settings/defaults";

export type SliderLimits = {
    min: number;
    max: number;
    /**
     * @description
     * The increment step for the slider.
     */
    step: number;
};

/**
 * @description
 * Default slider limits used across the settings where
 * values are taken from the default settings, not the current user settings.
 * @borrows {@link DEFAULT_SETTINGS}
 */
export const DEFAULT_SLIDER_LIMITS: SliderLimits = {
    min: DEFAULT_SETTINGS.SYS_FONTSIZE_MIN,
    max: DEFAULT_SETTINGS.SYS_FONTSIZE_MAX,
    step: 1,
};
