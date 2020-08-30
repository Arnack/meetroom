import React, {FunctionComponent} from "react";
import i18n from "../../../helpers/i18n";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../../../components/languageSwitcher/LanguageSwitcher";
import { Logout } from "./logout/Logout";
import "./HorizontalNav.scss"
import { StorageService } from "../../../services/StorageService";
import { IPersonaSharedProps, Persona, PersonaInitialsColor, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { DefaultPalette, Stack, IStackStyles, IStackTokens } from 'office-ui-fabric-react';
import { TopSeparator } from "./topSeparator/TopSeparator";
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { history } from "../../../helpers/browserHistory";
import {firebase} from "../../../firebase";
import {Login} from "./login/Login";

interface IProps {
    user: any
}

export const HorizontalNav:FunctionComponent<IProps> = ({user}) => {
    const { t } = useTranslation('top_menu', { i18n, useSuspense: false });
    const isLoggedIn = StorageService.isLoggedIn();

    const farItemsWrapperStyle: IStackStyles = {
        root: {
            height: 44
        }
    };

    const menuItems: ICommandBarItemProps[] = [
        {
            key: 'home',
            iconProps: { iconName: 'Home' },
            onClick: () => history.push('/')
        },
        {
            key: 'random',
            text: t('random'),
            iconProps: { iconName: 'UnknownSolid' },
            onClick: () => history.push('/random')
        },
        {
            key: 'users',
            text: t('users'),
            iconProps: { iconName: 'People' },
            onClick: () => history.push('/users')
        },
        {
            key: 'about',
            text: t('about'),
            iconProps: { iconName: 'WavingHand' },
            onClick: () => history.push('/about')
        },
    ]
    const topMenuStyles = {
        root: {
            // width: "800px"
            background: 'transparent'
        }
    }

    return (<>
        <div id="horizontal-nav-wrapper">

                {/*<h2 id="main-logo" className="text-logo"*/}
                {/*    style={{cursor: 'pointer'}}*/}
                {/*    onClick={() => history.push('/')}*/}
                {/*>*/}
                {/*    SpeakClub*/}
                {/*</h2>*/}

            <div id="top-menu">
                <CommandBar items={menuItems}
                            styles={topMenuStyles}

                />
            </div>

            <div id="far-items">
                <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }} styles={farItemsWrapperStyle}>

                    <LanguageSwitcher/>

                    {user ?
                    <>
                        <TopSeparator/>
                        <Persona text={user.displayName}
                                 imageUrl={user.photoURL}
                                 onClick={() => {firebase.auth().signOut()}}
                                 size={PersonaSize.size24}
                        />

                        <TopSeparator/>
                        <Logout/>
                    </> : <>
                        <Login />
                        </>}
                </Stack>
            </div>
        </div>

    </>)
}
