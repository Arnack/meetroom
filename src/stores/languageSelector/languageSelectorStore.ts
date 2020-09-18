import { createStore } from "effector";
import {deSelectLanguage, renewLanguageList, selectLanguage} from "./languageSelectorEvents";

export const languageList = createStore([])
    //@ts-ignore
    .on(renewLanguageList, (state, payload) => {
        return Array.from(new Set(payload));
    });

export const selectedLanguage = createStore('')
    .on(selectLanguage, (state, payload) => {
        return payload
    })
    .on(deSelectLanguage, () => {
        return ''
    });
