export type SliderOptions = {
    /**
     * @description
     * Show tooltip on hover.
     * @default true
     */
    tooltip?: boolean,
    /**
     * @description 
     * Even if tooltip is disabled, dynamic tooltip forces it to be shown 
     * and updates it on slider move.
     * @default true
     * */
    tooltipDynamic?: boolean,
    /**
     * @description
     * If true, the slider will update its value instantly as it is moved,
     * rather than only when the user releases the slider handle.
     * @default false
     */
    instant?: boolean,
};

export const DEFAULT_SLIDER_OPTIONS: SliderOptions = {
    tooltip: true,
    tooltipDynamic: true,
    instant: false,
};
