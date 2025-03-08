import LocalesModule from "../../locales/core";

export default class StatusBarConfig {
    public statusBarData: {
        registered_extensions: number;
        registered_views: number;
        processor: string;
        display: string;
        cursor_lines: number;
        cursor_columns: number;
    };

    private _locale: LocalesModule;

    constructor(locale: LocalesModule) {
        this._locale = locale;
        this.statusBarData = {
            registered_extensions: 0,
            registered_views: 0,
            processor: this._locale.getLocaleItem('STATUS_BAR')[0]!,
            display: this._locale.getLocaleItem('STATUS_BAR')[0]!,
            cursor_lines: 0,
            cursor_columns: 0
        };
    }

    update(data: Partial<typeof this.statusBarData>): void {
        this.statusBarData = {
            ...this.statusBarData,
            ...data
        };
    }

    resetToDefault(): void {
        this.statusBarData = {
            registered_extensions: 0,
            registered_views: 0,
            processor: this._locale.getLocaleItem('STATUS_BAR')[0]!,
            display: this._locale.getLocaleItem('STATUS_BAR')[0]!,
            cursor_lines: 0,
            cursor_columns: 0
        };
    }
}
