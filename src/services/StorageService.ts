import {IUserDTO} from "../model/user/IUserDTO";

export class StorageService {
    static login = ({user: {login, email}, token}: IUserDTO) => {
        localStorage.setItem('columnist_login', login);
        localStorage.setItem('columnist_email', email);
        localStorage.setItem('columnist_accessToken', token);
    };
    static logout = () => {
        localStorage.clear();
    };
    static isLoggedIn = (): boolean => {
        return localStorage.getItem('columnist_accessToken') !== null;
    };

    static getAccessToken = (): string | null => {
        return localStorage.getItem('columnist_accessToken');
    };
    static getUserLogin = () => {
        return localStorage.getItem('columnist_login');
    };
    static getUserEmail = () => {
        return localStorage.getItem('columnist_email');
    };
    static getCurrentLanguage = () => {
        return localStorage.getItem('i18nextLng') || 'en';
    }
    static setCurrentLanguage = (newVal: string) => {
        return localStorage.setItem('i18nextLng', newVal);
    }

    static setToken = (token: string) => {
        localStorage.setItem('columnist_accessToken', token);
    }

}
