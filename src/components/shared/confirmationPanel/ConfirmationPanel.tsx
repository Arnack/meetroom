import React, { FunctionComponent } from "react";
import { DefaultButton, PrimaryButton, IconButton } from 'office-ui-fabric-react';
import './ConfirmationPanel.scss';

interface IProps {
    text?: string;
    callback: () => void;
}

export const ConfirmationPanel: FunctionComponent<IProps> = ({children, text, callback}) => {
    return (<div className="approve-panel">
        <IconButton
            className="cross-close-button"
            iconProps={{ iconName: "Accept" }}
            onClick={callback}
        />
        {text && <span className="confirmation-text">{text}</span>}
    </div>)
}
