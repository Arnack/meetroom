import React, {useEffect, useState} from "react";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import "./RoomList.scss";
import { useTranslation } from "react-i18next";
import i18n from "../../../helpers/i18n";
import { RoomCardEntry } from "../../shared/articleCardEntry/RoomCardEntry";
import { TagFormat } from "../../../model/types";
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import {db} from "../../../firebase";
import useCollection from "../../../helpers/useCollection";


const searchIconStyle = {
    root: {
        cursor: "pointer"
    }
}

const iconProps = {
    iconName: 'Search',
    styles: searchIconStyle
}

const stubTags: TagFormat[] = [
    { label: "#навальный", url: "#" },
    { label: "#костин", url: "#" },
    { label: "#фбк", url: "#" },
]

export const RoomList = () => {

    const { t } = useTranslation('homepage', { i18n, useSuspense: false });


    const options: IChoiceGroupOption[] = [
        { key: 'A', text: 'Option A' },
        { key: 'B', text: 'Option B' },
        { key: 'D', text: 'Option D' },
    ];

    const rooms = useCollection('rooms');

    return <>
        <ChoiceGroup defaultSelectedKey="B" options={options} required={true} />

        <div className="article-entries-container">
            {/*TODO get rid of it*/}
            {rooms.map((item: any) => <span> {item.id} </span>)}
            <RoomCardEntry title={"Какое-то название расследования "} tags={stubTags} author={"А.Навальный"}
                           publishDay={new Date()} viewNumber={2499} commentNumber={47}
                           isPrivate={Math.random() > .5}/>
            <RoomCardEntry title={"Какое-то название расследования "} tags={stubTags} author={"А.Навальный"}
                           publishDay={new Date()} viewNumber={2499} commentNumber={47}
                           isPrivate={Math.random() > .5}/>
            <RoomCardEntry title={"Какое-то название расследования "} tags={stubTags} author={"А.Навальный"}
                           publishDay={new Date()} viewNumber={2499} commentNumber={47}
                           isPrivate={Math.random() > .5}/>
            <RoomCardEntry title={"Какое-то название расследования "} tags={stubTags} author={"А.Навальный"}
                           publishDay={new Date()} viewNumber={2499} commentNumber={47}
                           isPrivate={Math.random() > .5}/>
        </div>
    </>
}
