import React, {FunctionComponent} from "react";
import "./ArticleCardEntry.scss"
import {mergeStyles} from 'office-ui-fabric-react/lib/Styling';
import {PrimaryButton} from "office-ui-fabric-react";
import {Facepile, OverflowButtonType} from 'office-ui-fabric-react/lib/Facepile';
import {Link} from "react-router-dom";

interface IProps {
    id: string;
    language: string;
    languageLevel: string;
    author?: string;
    users?: any[]; //TODO switch to IUser[] type
    topic?: string;
}


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

export const RoomCardEntry: FunctionComponent<IProps> = ({id, language, languageLevel, author, users, topic}) => {
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
                        <Link to={`/rooms/${id}`} >
                            <PrimaryButton text={"Join"}/>
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    </>
}
