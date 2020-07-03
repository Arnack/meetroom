import React, { FunctionComponent } from "react";
import "./AddNewButton.scss";

interface IProps {
    text: string;
    callBack: () => void;
}

export const AddNewButton: FunctionComponent<IProps> = ({ text, callBack  }) => {
    return <>
            <div className="add-new-btn_container" onClick={callBack}>
                <span className="add-new-btn_text">
                    {text}
                </span>
                <span className="add-new-btn_icon">
                    +
                </span>
            </div>
        </>
}