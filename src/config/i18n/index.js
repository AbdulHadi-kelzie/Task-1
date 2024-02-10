import { createI18n } from 'vue-i18n';
import { getLocale } from '../../utils/Storage';
import arabic from './locales/ar/global.json';
import english from './locales/en/global.json';

const i18n = createI18n({
    legacy: false, // you must set `false`, to use Composition API
    locale: getLocale(),
    fallbackLocale: 'en',
    availableLocales: ["en", "ar"],
    messages: {
        ar: arabic,
        en: english
        //ar: Object.assign({}, require, require('./locales/ar/form.json'), require('./locales/ar/messages.json')),
        //en: Object.assign({}, require('./locales/en/global.json'), require('./locales/en/form.json'), require('./locales/en/messages.json'))
    }
});

export default i18n;
