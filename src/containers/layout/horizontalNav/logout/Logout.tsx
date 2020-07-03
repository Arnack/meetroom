import React from "react";
import { IconButton } from "office-ui-fabric-react";
import { StorageService } from "../../../../services/StorageService";
import { history } from "../../../../helpers/browserHistory";
import "./Logout.scss";

export const Logout = () => {
    return <>
        <IconButton
            className="logout-btn"
            iconProps={{ iconName: "Leave" }}
            onClick={() => {
                StorageService.logout();
                history.push("/");
                window.location.reload();
            }}
        />
    </>
}