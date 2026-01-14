import {tokens as tokensEn} from './en.ts';

export class Localization {
    readonly text: typeof tokensEn;
    readonly lang: string = 'en';

    constructor(init: Partial<Localization> = {}) {
        this.lang = init.lang ?? 'en';
        this.text = tokensEn;
    }
}

export const i18n = new Localization({lang: 'en'});
