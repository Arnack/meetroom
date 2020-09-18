import React, {FC} from "react";
import style from "./LanguageSwitcher.module.scss";
import {deSelectLanguage, selectLanguage} from "../../stores/languageSelector/languageSelectorEvents";

interface IProps {
    languageName: string;
    count?: number;
    isSelected?: boolean;
}

export const LanguageSelector: FC<IProps> = ({ languageName, count, isSelected}) => {
    return <>
            <span className={`${style.langSelectorItem} ${isSelected ? style.selected : ''}`}
                onClick={() => {
                    console.log('clicked', isSelected);
                    if (!isSelected)
                        selectLanguage(languageName);
                    else
                        deSelectLanguage();
                }}
            >
                {languageName}
            </span>
        </>
}
