import React, { FunctionComponent } from "react";
import "./AddNewButton.scss";

interface IProps {
    callBack: () => void;
}

export const AddNewButton: FunctionComponent<IProps> = ({ callBack  }) => {
    return <>
            <div className="add-new-btn_container" onClick={callBack}>
                <span className="add-new-btn_icon">
                    +
                </span>
            </div>
        </>
}