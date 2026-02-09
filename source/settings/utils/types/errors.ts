export interface ErrorsMenuOptions {
    title?: boolean;
    count?: boolean;
    dashboard: {
        copy: boolean;
        hideType: boolean;
        hidePath: boolean;
        hideMessage: boolean;
        refresh: boolean;
    }
}

export const DEFAULT_ERRORS_MENU_OPTIONS: ErrorsMenuOptions = {
    title: true,
    count: true,
    dashboard: {
        copy: true,
        hideType: false,
        hidePath: false,
        hideMessage: false,
        refresh: true
    }
};
