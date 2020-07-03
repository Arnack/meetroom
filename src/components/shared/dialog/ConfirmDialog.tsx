import React, { FunctionComponent, PropsWithChildren, SyntheticEvent } from "react";
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton,IconButton } from 'office-ui-fabric-react';
import i18n from "../../../helpers/i18n";
import { useTranslation } from "react-i18next";

interface IProps {
    isHidden: boolean;
    confirmAction: (event: unknown) => void;
    cancelAction: (ev?: unknown) => any;
    title: string;
    subText: string;
}

export const ConfirmDialog: FunctionComponent<IProps> = (props) => {
    const { t } = useTranslation('misc', { i18n, useSuspense: false });

    const {isHidden, confirmAction, cancelAction, title, subText} = props as IProps;

    return (
        <Dialog closeButtonAriaLabel="Close"
                onDismiss={cancelAction}
                dialogContentProps={{
                    type: DialogType.normal,
                    title,
                    subText,
                }}
                hidden={isHidden}>
            {props.children}
            <DialogFooter>
                <PrimaryButton onClick={confirmAction} text={t("confirm_dialog.confirm")}/>
                <DefaultButton onClick={cancelAction} text={t("confirm_dialog.cancel")}/>
            </DialogFooter>
        </Dialog>)
}
