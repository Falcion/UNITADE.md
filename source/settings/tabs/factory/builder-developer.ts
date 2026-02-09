import { Setting, TextAreaComponent } from 'obsidian';
import UnitadeUnifiedTabBuilder from '@settings-factory/unified-builder';
import UnitadePlugin from '@main';
import { makeToggleSetting } from '@settings-ui/factory-toggle';
import { makeSetting } from '@settings-ui/factory-setting';
import { makeEntryEval } from '@settings-ui/components/factory-entry-eval';
import makeErrorsMenu from './ui/components/factory-errors-menu';

export default class UnitadeTabDeveloperBuilder extends UnitadeUnifiedTabBuilder {
    private _SETTING_DEBUG_MODE?: Setting = undefined;
    private _SETTING_STALE_MODE?: Setting = undefined;
    private _SETTING_INPUT_DEBOUNCE_TITLE?: Setting = undefined;
    private _SETTING_INPUT_DEBOUNCE?: TextAreaComponent = undefined;
    private _SETTING_FONT_SIZE_MAX_TITLE?: Setting = undefined;
    private _SETTING_FONT_SIZE_MAX?: TextAreaComponent = undefined;
    private _SETTING_FONT_SIZE_MIN_TITLE?: Setting = undefined;
    private _SETTING_FONT_SIZE_MIN?: TextAreaComponent = undefined;
    private _ERRORS_MENU?: HTMLDivElement = undefined;

    constructor(containerEl: HTMLElement, plugin: UnitadePlugin) {
        super(containerEl, plugin);
    }

    public get SETTING_DEBUG_MODE(): Setting {
        return this._SETTING_DEBUG_MODE ??= makeToggleSetting(
            'ENABLE DEBUG MODE',
            'ENABLE DEBUG MODE',
            'developer.debug',
            this,
            () => { this.updateDisplays(); }
        );
    }

    public get SETTING_STALE_MODE(): Setting {
        return this._SETTING_STALE_MODE ??= makeToggleSetting(
            'ENABLE STALE MODE',
            'ENABLE STALE MODE',
            'developer.stale',
            this
        );
    }

    public get SETTING_INPUT_DEBOUNCE_TITLE(): Setting {
        return this._SETTING_INPUT_DEBOUNCE_TITLE ??= makeSetting(
            'INPUT DEBOUNCE',
            'INPUT DEBOUNCE',
            this
        );
    }

    public get SETTING_INPUT_DEBOUNCE(): TextAreaComponent {
        return this._SETTING_INPUT_DEBOUNCE ??= makeEntryEval<'developer.input_debouncing', number>(
            'developer.input_debouncing',
            '1000',
            this,
            true,
            (val) => {
                const num = Number(val);

                if (isNaN(num) || num < 0) return { err: Error('Invalid input: not a non-negative number'), res: num };
                else return { res: num };
            }
        );
    }

    public get SETTING_FONT_SIZE_MAX_TITLE(): Setting {
        return this._SETTING_FONT_SIZE_MAX_TITLE ??= makeSetting(
            'MAX FONT SIZE',
            'MAX FONT SIZE',
            this
        );
    }

    public get SETTING_FONT_SIZE_MAX(): TextAreaComponent {
        return this._SETTING_FONT_SIZE_MAX ??= makeEntryEval<'SYS_FONTSIZE_MAX', number>(
            'SYS_FONTSIZE_MAX',
            '24',
            this,
            true,
            (val) => {
                const num = Number(val);

                if (isNaN(num) || num < 0) return { err: Error('Invalid input: not a non-negative number'), res: num };
                else return { res: num };
            }
        );
    }

    public get SETTING_FONT_SIZE_MIN_TITLE(): Setting {
        return this._SETTING_FONT_SIZE_MIN_TITLE ??= makeSetting(
            'MIN FONT SIZE',
            'MIN FONT SIZE',
            this
        );
    }

    public get SETTING_FONT_SIZE_MIN(): TextAreaComponent {
        return this._SETTING_FONT_SIZE_MIN ??= makeEntryEval<'SYS_FONTSIZE_MIN', number>(
            'SYS_FONTSIZE_MIN',
            '12',
            this,
            true,
            (val) => {
                const num = Number(val);

                if (isNaN(num) || num < 0) return { err: Error('Invalid input: not a non-negative number'), res: num };
                else return { res: num };
            }
        );
    }

    public get ERRORS_MENU(): HTMLDivElement {
        return this._ERRORS_MENU ??= makeErrorsMenu(this);
    }

    updateState(): void {
        if (!this.defaults) {
            const input =
                this.SETTING_INPUT_DEBOUNCE;

            this.defaults = {
                color: input.inputEl.style.color,
                borderColor: input.inputEl.style.borderColor,
                borderWidth: input.inputEl.style.borderWidth,
            };
        }

        this.updateStateInput(this.SETTING_INPUT_DEBOUNCE, true);
    }

    updateErrors(): void {
        //!TODO: IMPLEMENT DEBUG BEFORE RELEASE. MUST DO. DO NOT UPDATE WITHOUT THIS FEATURE.
    }

    updateDisplays(): void {
        this.updateState();
        this.updateErrors();

        this.setVisibility(this.SETTING_INPUT_DEBOUNCE_TITLE, this.plugin.settings.developer.debug);
        this.setVisibility(this.SETTING_INPUT_DEBOUNCE, this.plugin.settings.developer.debug);
    }
}
