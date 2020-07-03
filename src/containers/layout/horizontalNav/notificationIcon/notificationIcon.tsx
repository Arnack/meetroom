import React from "react";
import { IconButton } from "office-ui-fabric-react";

export const NotificationIcon = () => {
    return <>
        <IconButton
            className="logout-btn"
            size={64}

            iconProps={{ iconName: "Ringer", style: {fontSize: "20px"} }}
            onClick={() => {    }}
        />
    </>
}