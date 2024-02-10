import { JWT_TOKEN } from './Constants';

export const saveToken = (value) => localStorage.setItem(JWT_TOKEN, value);

export const getToken = () => localStorage.getItem(JWT_TOKEN);

export const removeToken = () => localStorage.removeItem(JWT_TOKEN);

export const saveEntry = (key, value) => localStorage.setItem(key, value);

export const getEntry = (key) => localStorage.getItem(key);

export const removeEntry = (key) => localStorage.removeItem(key);

export const getLocale = () => {
    let locale = localStorage.getItem('APP_LOCALE');
    console.log("local: ", locale);

    if (!locale) {
        locale = 'ar';
    }
    return locale;
};

export const setLocale = (value) => {
    localStorage.setItem('APP_LOCALE', value);
};
