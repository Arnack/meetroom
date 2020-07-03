import React, { FunctionComponent } from "react";
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import "./ActionPanel.scss"
import { useTranslation } from "react-i18next";
import i18n from "../../../helpers/i18n";

interface IProps {
    header?: string;
    callBack?: () => any;
    cancelCallBack?: () => any;
}

/**
 * For Edit/Add New perposes
 * @param props
 * @constructor
 */
export const ActionPanel: FunctionComponent<IProps> = (props) => {

    const { t } = useTranslation(['misc', 'error_handler', 'messages'], { i18n, useSuspense: false });
    const {header, callBack, cancelCallBack} = props;
    return (
        <div className="action-panel">

            <div>
                <DefaultButton
                    id="cross-close-button"
                    text={t("misc:action_panel.cancel")}
                    iconProps={{ iconName: "Cancel" }}
                    onClick={props.cancelCallBack}
                />
            </div>

            {header && <h3>
                {header}
            </h3>}
            <div className="form-container">
                {props.children}
            </div>
        </div>
    )
}