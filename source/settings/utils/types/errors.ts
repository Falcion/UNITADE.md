export interface ErrorsMenuOptions {
    title?: boolean;
    count?: boolean;
    /**
     * @description
     * Disables dashboard view of errors and displays them as
     * default list: part of legacy content.
     * @deprecated
     */
    legacy?: boolean;
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
    legacy: false,
    dashboard: {
        copy: true,
        hideType: false,
        hidePath: false,
        hideMessage: false,
        refresh: true,
    }
};
