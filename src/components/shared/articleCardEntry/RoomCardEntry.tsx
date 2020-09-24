import React, {FunctionComponent} from "react";
import "./ArticleCardEntry.scss"
import {mergeStyles} from 'office-ui-fabric-react/lib/Styling';
import {PrimaryButton} from "office-ui-fabric-react";
import {Facepile, OverflowButtonType} from 'office-ui-fabric-react/lib/Facepile';
import {Link} from "react-router-dom";
import useCollection from "../../../helpers/useCollection";
import {IUser} from "../../../model/user/IUser";

interface IProps {
    id: string;
    language: string;
    languageLevel: string;
    author?: string;
    topic?: string;
}

export const RoomCardEntry: FunctionComponent<IProps> = ({id, language, languageLevel, author, topic}) => {

    const users = useCollection(`rooms/${id}/participants`)
        .map((item: IUser) => {
            return {
                personaName: item.displayName,
                imageUrl: item.photoURL
            }
        });

    const displayLangLevel = (languageLevel: string) => {
        switch (languageLevel) {
            case '1':
                return 'Elementary (A1)';
            case '2':
                return 'Beginner (A2)';
            case '3':
                return 'Intermediate (B1)';
            case '4':
                return 'Upper-Intermediate (B2)';
            case '5':
                return 'Advanced (C1)';
            case '6':
                return 'Proficiency (C2)';
            default:
                return "Any level"

        }
    }

    return <>
        <div className="ms-Grid-col ms-xxl4 ms-xl6 ms-md6 ms-sm6" style={{padding: "20px 10px"}}>
            <div className="article-card">
                <h4 className="marginless entry-title">{topic || "Any topic"}</h4>

                <span className=""
                    style={{textTransform: "capitalize"}}
                >
                    {language},
                    <small style={{fontSize: "small", fontWeight: 300}}>
                        <i> {displayLangLevel(languageLevel)} </i>
                    </small>
                </span>


                <div className="facepile-list">

                </div>

                <div className="ms-Grid-row bottom-info">
                    <div className="ms-Grid-col ms-sm8">
                        {!!users.length ? <Facepile
                            personas={users}
                            maxDisplayablePersonas={5}
                            overflowButtonType={OverflowButtonType.descriptive}
                        /> :
                        <i>No users yet</i>
                        }
                    </div>
                    <div className="ms-Grid-col ms-sm4 items-right">
                        <Link to={`/rooms/${id}`} >
                            <PrimaryButton text={"Join"}/>
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    </>
}
