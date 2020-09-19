import React from "react";
import { IconButton } from "office-ui-fabric-react";
import { StorageService } from "../../../../services/StorageService";
import { history } from "../../../../helpers/browserHistory";
import "./Logout.scss";
import {firebase} from "../../../../firebase";
import {setUser} from "../../../../stores/currentUserStore/currentUserEvents";

export const Logout = () => {

    const logout = () => {
        firebase.auth().signOut();
        setUser(null);
    }

    return <>
        <IconButton
            className="logout-btn"
            iconProps={{ iconName: "Leave" }}
            onClick={() => {firebase.auth().signOut()}}
        />
    </>
}
