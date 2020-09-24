import React from "react";
import {useStore} from "effector-react";
import { languageList, selectedLanguage } from "../../stores/languageSelector/languageSelectorStore";
import {LanguageSelector} from "./LanguageSelector";

export const LanguageFilterList = () => {
    const languages = useStore(languageList) as string[];
    const selectedLang = useStore(selectedLanguage);

    return <>
            {languages && !!languages.length && languages.map((item) =>
                <LanguageSelector
                    key={item}
                    isSelected={selectedLang === item}
                    languageName={item}
                />
                )}
        </>
}
