import { LOCALES_AR } from "./langs/ar";
import { LOCALES_CZ } from "./langs/cz";
import { LOCALES_DA } from "./langs/da";
import { LOCALES_DE } from "./langs/de";
import { LOCALES_EN } from "./langs/en";
import { LOCALES_ES } from "./langs/es";
import { LOCALES_FR } from "./langs/fr";
import { LOCALES_HI } from "./langs/hi";
import { LOCALES_ID } from "./langs/id";
import { LOCALES_IT } from "./langs/it";
import { LOCALES_JA } from "./langs/ja";
import { LOCALES_KO } from "./langs/ko";
import { LOCALES_NL } from "./langs/nl";
import { LOCALES_NO } from "./langs/no";
import { LOCALES_PL } from "./langs/pl";
import { LOCALES_PT } from "./langs/pt";
import { LOCALES_PT_BR } from "./langs/pt-BR";
import { LOCALES_RO } from "./langs/ro";
import { LOCALES_RU } from "./langs/ru";
import { LOCALES_SQ } from "./langs/sq";
import { LOCALES_TR } from "./langs/tr";
import { LOCALES_UK } from "./langs/uk";
import { LOCALES_ZH } from "./langs/zh";
import { LOCALES_ZH_TW } from "./langs/zh-tw";

interface LocaleTranslation {
    0?: string;
    1?: string;
    2?: string;
    3?: string;
    4?: string;
}

interface Locales {
    [key: string]: LocaleTranslation;
}

export default class LocalesModule {
    private _lang: string;

    static localesList: { [id: string]: Locales } = {
        en: LOCALES_EN,
        zh: LOCALES_ZH,
        "zh-TW": LOCALES_ZH_TW,
        ru: LOCALES_RU,
        ko: LOCALES_KO,
        it: LOCALES_IT,
        id: LOCALES_ID,
        ro: LOCALES_RO,
        "pt-BR": LOCALES_PT_BR,
        cz: LOCALES_CZ,
        de: LOCALES_DE,
        es: LOCALES_ES,
        fr: LOCALES_FR,
        no: LOCALES_NO,
        pl: LOCALES_PL,
        pt: LOCALES_PT,
        ja: LOCALES_JA,
        da: LOCALES_DA,
        uk: LOCALES_UK,
        sq: LOCALES_SQ,
        tr: LOCALES_TR,
        hi: LOCALES_HI,
        nl: LOCALES_NL,
        ar: LOCALES_AR,
    };

    constructor() {
        this._lang = LocalesModule.getCurrentLocale();
    }

    public static getCurrentLocale(): string {
        let lang = window.localStorage.getItem('language');

        if (!lang) lang = 'en';

        if (Object.keys(this.localesList).includes(lang)) return lang;
        else throw Error('No correct language was found.');
    }

    getTranslation(): Locales {
        return LocalesModule.localesList[this._lang];
    }

    getLocaleItem(locale_item: string): LocaleTranslation {
        if (locale_item === undefined || typeof locale_item !== 'number') {
            throw new Error('Locale key is undefined or invalid: access denied.');
        }

        const translation = this.getTranslation();

        if (locale_item in translation) {
            return translation[locale_item] || '';
        } else {
            throw new Error(`Locale key ${locale_item} is out of bounds.`);
        }

    }
}
