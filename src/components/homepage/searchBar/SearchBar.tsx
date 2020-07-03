import React from "react";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import "./SearchBar.scss";
import { useTranslation } from "react-i18next";
import i18n from "../../../helpers/i18n";
import { ArticleCardEntry } from "../../shared/articleCardEntry/ArticleCardEntry";
import { TagFormat } from "../../../model/types";
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';


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
    { label: "#наиляаскерзаде", url: "#" },
]

export const SearchBar = () => {

    const { t } = useTranslation('homepage', { i18n, useSuspense: false });

    const options: IChoiceGroupOption[] = [
        { key: 'A', text: 'Option A' },
        { key: 'B', text: 'Option B' },
        { key: 'D', text: 'Option D' },
    ];

    return <>
        <ChoiceGroup defaultSelectedKey="B" options={options}  label="Pick one" required={true} />

        <div className="article-entries-container">
            <ArticleCardEntry title={"Какое-то название расследования "} tags={stubTags} author={"А.Навальный"}
                              publishDay={new Date()} viewNumber={2499} commentNumber={47}
                              isPrivate={Math.random() > .5}/>
            <ArticleCardEntry title={"Какое-то название расследования "} tags={stubTags} author={"А.Навальный"}
                              publishDay={new Date()} viewNumber={2499} commentNumber={47}
                              isPrivate={Math.random() > .5}/>
            <ArticleCardEntry title={"Какое-то название расследования "} tags={stubTags} author={"А.Навальный"}
                              publishDay={new Date()} viewNumber={2499} commentNumber={47}
                              isPrivate={Math.random() > .5}/>
            <ArticleCardEntry title={"Какое-то название расследования "} tags={stubTags} author={"А.Навальный"}
                              publishDay={new Date()} viewNumber={2499} commentNumber={47}
                              isPrivate={Math.random() > .5}/>
        </div>
    </>
}