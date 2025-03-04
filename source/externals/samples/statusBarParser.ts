import { formatString } from "../../utils/functions";
import LocalesModule from "../../locales/core";
import StatusBarConfig from "./statusBarConfig";

export default class StatusBarParser {
    private _locale: LocalesModule;
    private _statusBarConfig: StatusBarConfig;

    constructor(locale: LocalesModule, statusBarConfig: StatusBarConfig) {
        this._locale = locale;
        this._statusBarConfig = statusBarConfig;
    }

    public generateText(): string[] {
        return StatusBarParser.generateText(this._locale, this._statusBarConfig);
    }

    public static generateText(locale: LocalesModule, statusBarConfig: StatusBarConfig): string[] {

        /* This localisation items NEED TO BE FORMATTED:
        * 1. "Worker: {0}"
        * 2. "Extensions: {1}, views: {2}",
        * 3. "Column: {3}, line: {4}"
        * 4. "rend. {5}"
        * ID "0" goes to "NONE" title
        */

        return [
            formatString(locale.getLocaleItem('STATUS_BAR')[1]!, statusBarConfig.statusBarData.processor),
            formatString(locale.getLocaleItem('STATUS_BAR')[2]!,
                statusBarConfig.statusBarData.registered_extensions,
                statusBarConfig.statusBarData.registered_views,
            ),
            formatString(locale.getLocaleItem('STATUS_BAR')[3]!,
                statusBarConfig.statusBarData.cursor_columns,
                statusBarConfig.statusBarData.cursor_lines),
            formatString(locale.getLocaleItem('STATUS_BAR')[4]!, statusBarConfig.statusBarData.display)
        ];
    }
}
