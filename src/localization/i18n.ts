import {tokens as tokensEn} from './en.ts';

export class Localization {
    readonly token: typeof tokensEn;
    readonly lang: string = 'en';

    constructor(init: Partial<Localization> = {}) {
        this.lang = init.lang ?? 'en';
        this.token = tokensEn;
    }
}

export const i18n = new Localization({lang: 'en'});
// eslint-disable-next-line id-length
export const t = i18n.token as Readonly<typeof tokensEn>;
