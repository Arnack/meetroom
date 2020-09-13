import React, {FunctionComponent} from "react";
import "./ArticleCardEntry.scss"
import {mergeStyles} from 'office-ui-fabric-react/lib/Styling';
import {PrimaryButton} from "office-ui-fabric-react";
import {Facepile, OverflowButtonType} from 'office-ui-fabric-react/lib/Facepile';

interface IProps {
    language: string;
    languageLevel: string;
    author?: string;
    users?: any[]; //TODO switch to IUser[] type
    topic?: string;
}

const primaryIconStyle = mergeStyles({
    fontSize: 21,
    height: 21,
    width: 21,
    margin: '0 8px',
    color: "#C02A4E"
});
const primaryUnlockIconStyle = mergeStyles({
    fontSize: 21,
    height: 21,
    width: 21,
    margin: '0 8px',
    color: "#6DAD57"
});
const secondaryIconStyle = mergeStyles({
    fontSize: 16,
    height: 12,
    width: 12,
    margin: '0 6px',
    color: '#4c515b'
});

const facepilePersonas = [
    {
        personaName: "Annabelle Lee",
    },
    {
        personaName: "Mickhail Lee",
    },
    {
        personaName: "Nicolle Lee",
    },
    {
        personaName: "sfa fasd",
    },
    {
        personaName: "kpjno njdfsl",
    },
    {
        personaName: "mmcnc nviir  ",
    },
    {
        personaName: "btbgrt mkipn  ",
    }
]

export const RoomCardEntry: FunctionComponent<IProps> = ({language, languageLevel, author, users, topic}) => {
    return <>
        <div className="ms-Grid-col ms-xxl4 ms-xl6 ms-md6 ms-sm6" style={{padding: "20px 10px"}}>
            <div className="article-card">

                <h4 className="marginless entry-title">
                    {language}
                    <small>
                        {languageLevel}
                    </small>
                </h4>
                <span>{topic || ""}</span>

                <div className="facepile-list">
                    <Facepile
                        personas={facepilePersonas}
                        maxDisplayablePersonas={5}
                        overflowButtonType={OverflowButtonType.descriptive}
                    />
                </div>

                <div className="ms-Grid-row bottom-info">
                    <div className="ms-Grid-col ms-sm6 ms-md8">

                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 items-right">
                        <PrimaryButton text={"Join"}/>
                    </div>

                </div>
            </div>

        </div>
    </>
}
