import React, { FunctionComponent } from "react";
import "./AddNewButton.scss";
import {IUser} from "../../../model/user/IUser";
import {useStore} from "effector-react";
import {currentUser} from "../../../stores/currentUserStore/currentUserStore";
import {firebase} from "../../../firebase";
import {logInWithGoogle} from "../../../helpers/logInWithGoogle";

interface IProps {
    callBack: () => void;
}

export const AddNewButton: FunctionComponent<IProps> = ({ callBack  }) => {

    const user: IUser = useStore(currentUser);
    return <>
            <div className="add-new-btn_container" onClick={() => {
                if (user) {
                    callBack();
                } else {
                    logInWithGoogle();
                }
            }}>
                <span className="add-new-btn_icon">
                    +
                </span>
            </div>
        </>
}
