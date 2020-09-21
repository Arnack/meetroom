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
