export class StorageService {
    static getCurrentLanguage = () => {
        return localStorage.getItem('i18nextLng') || 'en';
    }
    static setCurrentLanguage = (newVal: string) => {
        return localStorage.setItem('i18nextLng', newVal);
    }
}
