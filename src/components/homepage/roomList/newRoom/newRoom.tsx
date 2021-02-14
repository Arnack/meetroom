import React, {FunctionComponent, useState} from "react";
import {Modal, IIconProps} from 'office-ui-fabric-react';
import { useId } from '@uifabric/react-hooks';
import SelectSearch from 'react-select-search';
import { Label } from 'office-ui-fabric-react/lib/Label';
import {
    getTheme,
    FontWeights,
    mergeStyleSets
} from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';

import {DefaultButton, PrimaryButton, IconButton} from 'office-ui-fabric-react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import "./selectSearch.scss";

import style from "./newRoom.module.scss";
import {greenTheme} from "../../../../containers/layout/themes/darckGreenTheme";
import {db} from "../../../../firebase";
import { toast } from "react-toastify";
import { history } from "../../../../helpers/browserHistory";

interface IProps {
    isOpen: boolean;
    hideModal: () => void;
}

const languageLevels = [
    {key: '0', text: 'Any Level'},
    {key: '1', text: 'Elementary (A1)'},
    {key: '2', text: 'Beginner (A2)'},
    {key: '3', text: 'Intermediate (B1)'},
    {key: '4', text: 'Upper Intermediate (B2)'},
    {key: '5', text: 'Advanced (C1)'},
    {key: '6', text: 'Proficiency (C2)'},
]

const languages = [
    {name: 'English', value: 'english'},
    {name: 'German', value: 'german'},
    {name: 'Indonesian', value: 'indonesian'},
    {name: 'Russian', value: 'russian'},
    {name: 'Swedish', value: 'swedish'},
    {name: 'Ukrainian', value: 'ukrainian'},
]

const NewRoom: FunctionComponent<IProps> = ({isOpen, hideModal}) => {

    const [topic, setTopic] = useState('');
    const [peopleCount, setPeopleCount] = useState(2);
    const [language, setLanguage] = useState('');
    const [level, setLevel] = useState('0');

    const validateForm = (): boolean => {
        return !!peopleCount && !!language && !!level
    }

    //TODO add growl on failure
    const onFormSubmit = () => {
        if (validateForm()) {
            //Create new room
            db  //rooms/8dPoVTMHfBifOg3hoEuM/messages
                .collection("rooms")
                .add({
                    //TODO add initial user
                    // user: db.collection('users').doc(user.uid),
                    topic: topic || '',
                    maxPeople: peopleCount,
                    language: language,
                    level: level,
                    createdAt: new Date()
                })
                //TODO remove then
                .then((res) => {
                    console.log('res path', res.id);
                    history.push(`/rooms/${res.id}`)

                    // hideModal();
                })
                //TODO growl error
                .catch((err) => {
                    console.error('err', err.toString());
                    }
                )
        } else {
            toast.error('Please fill all required fields');
        }

    }

    return <>
        <Modal
            isOpen={isOpen}
            onDismiss={hideModal}
            containerClassName={contentStyles.container}
        >
            <div className={contentStyles.header}>
                <h3>{"Create new room"}</h3>
                <IconButton
                    styles={iconButtonStyles}
                    iconProps={cancelIcon}
                    ariaLabel="Close popup modal"
                    onClick={hideModal}
                />
            </div>
            <div className={contentStyles.body}>


                <TextField label={"Topic"}
                           placeholder={"Any topic"}
                           onChange={(ev, newVal) =>
                               setTopic(newVal as string)}
                           />
                <br/>

                <Label required>Language</Label>
                <SelectSearch options={languages}
                              search={true}
                              autoComplete={"on"}
                              onChange={(newValue) =>
                              setLanguage(newValue as unknown as string)}
                              placeholder={"Choose a language"} />
                              <br/>

                <Slider
                    min={2}
                    max={2}
                    value={peopleCount}
                    label={"Maximum People"}
                    onChange={(count) => setPeopleCount(count)}
                    showValue
                />



                <Dropdown label={"Level"}
                          selectedKey={level}
                          options={languageLevels}
                          onChange={(event, item) =>
                              setLevel((item as any).key)
                          }
                          required
                />
                <br/>

                <div className={style.bottomButtons}>
                    <DefaultButton onClick={hideModal} text={"Cancel"} />
                    <PrimaryButton onClick={onFormSubmit} text={"Create"} />
                </div>

            </div>

        </Modal>
    </>
}


// const theme = getTheme();
const theme = greenTheme;
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
    },
    header: [
        theme.fonts.xLargePlus,
        {
            flex: '1 1 auto',
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '2px 12px 14px 24px',
        },
    ],
    body: {
        flex: '4 4 auto',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
});
const cancelIcon: IIconProps = {iconName: 'Cancel'};
const iconButtonStyles = {
    root: {
        color: theme.palette.neutralPrimary,
        marginLeft: 'auto',
        marginTop: '4px',
        marginRight: '2px',
    },
    rootHovered: {
        color: theme.palette.neutralDark,
    },
};

export default NewRoom;
