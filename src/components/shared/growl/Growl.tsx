import React, { PureComponent, useState } from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react";
import { IGrowl } from "../../../model/misc/IGrowl";
import { useStore } from "effector-react";
import { growlState } from "../../../stores/growlStore/growlStore";
import { hideGrowl } from "../../../stores/growlStore/growlEvents";
import "./Growl.scss"

export const Growl = () => {
    const value = useStore(growlState);

    return (<>
        {value.isVisible && <MessageBar messageBarType={value.type || MessageBarType.info}
                                        className="growl-bar"
                                        onDismiss={() => hideGrowl()}
        >
            <b>{value.title || ''} </b>
            {value.description || ''}
        </MessageBar>}
    </>)

}
