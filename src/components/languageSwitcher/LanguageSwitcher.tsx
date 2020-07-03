import React, { useState } from "react";
import "./LanguageSwitcher.scss"
import { StorageService } from "../../services/StorageService";
import { DefaultButton, IContextualMenuProps, ContextualMenu } from 'office-ui-fabric-react';
import i18n from '../../helpers/i18n'

export const LanguageSwitcher = () => {
    const [currentLng, setCurrentLng] = useState(i18n.language || StorageService.getCurrentLanguage());

    const lngChange = (newLng: string) => {
        i18n.changeLanguage(newLng)
            .then(() => {
                setCurrentLng(i18n.language)
            })
    }

    const menuProps: IContextualMenuProps = {
        // disable dismiss if shift key is held down while dismissing
        onDismiss: ev => {
            if (ev && ev.shiftKey) {
                ev.preventDefault();
            }
        },
        items: [
        ],
        directionalHintFixed: true,
    };

    const langPopUp = () => {
        return <>
            <div className="lang-list">
                <div className="lang-item"
                     onClick={() => {lngChange('ru')}} >
                    ru
                </div>
                <div className="lang-item"
                     onClick={() => {lngChange('en')}} >en</div>
            </div>
        </>
    }

    return <>
        <div className="lng-switcher-btn">
            <DefaultButton text={currentLng.toUpperCase()}
                           role="button"
                           aria-haspopup={false}
                           menuAs={langPopUp}
                           menuProps={menuProps}
            />

        </div>
    </>
}