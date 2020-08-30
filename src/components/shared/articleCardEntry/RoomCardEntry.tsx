import React, { FunctionComponent } from "react";
import "./ArticleCardEntry.scss"
import { DateFormat, TagFormat } from "../../../model/types";
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Separator } from 'office-ui-fabric-react/lib/Separator';

interface IProps {
    title: string;
    tags: TagFormat[];
    author: string;
    publishDay: DateFormat;
    viewNumber: number;
    commentNumber: number;
    isPrivate: boolean;
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

export const RoomCardEntry: FunctionComponent<IProps> = ({ title, tags, author, publishDay, viewNumber, commentNumber, isPrivate }) => {
    return <>
        <div className="article-card">

            <div className="ms-Grid" dir="ltr">

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm10 ms-md11">
                        <h3 className="marginless entry-title">
                            {title}
                        </h3>
                    </div>
                    <div className="ms-Grid-col ms-sm2 ms-md1">
                        <FontIcon iconName={`${isPrivate ? "Lock" : "Unlock"}`}
                                  className={`${isPrivate ? primaryIconStyle : primaryUnlockIconStyle} right article-access`}/>
                    </div>
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 tag-container">
                        {tags.map((item) => (
                            <span className="entry-tag">{item.label}</span>
                        ))}
                    </div>
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12">
                        <Separator />
                    </div>
                </div>

                <div className="ms-Grid-row bottom-info">
                    <div className="ms-Grid-col ms-sm6 ms-md8">
                        <FontIcon iconName={"ReminderPerson"}
                                  className={secondaryIconStyle}/>
                                  <span className="bottom-text-item">{author}</span>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 items-right">
                        <FontIcon iconName={"Calendar"}
                                  className={secondaryIconStyle}/>
                                  <span className="bottom-text-item">{new Date(publishDay).toLocaleDateString()}</span>

                        <FontIcon iconName={"RedEye"}
                                  className={secondaryIconStyle}/>
                                  <span className="bottom-text-item">{viewNumber}</span>

                        <FontIcon iconName={"Comment"}
                                  className={secondaryIconStyle}/>
                                  <span className="bottom-text-item">{commentNumber}</span>
                    </div>
                </div>
            </div>


        </div>
    </>
}
