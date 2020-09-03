import React, {FunctionComponent} from "react";
import {Modal, IIconProps} from 'office-ui-fabric-react';
import { useId } from '@uifabric/react-hooks';
import {
    getTheme,
    FontWeights,
    mergeStyleSets
} from 'office-ui-fabric-react';

import {DefaultButton, PrimaryButton, IconButton} from 'office-ui-fabric-react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';

interface IProps {
    isOpen: boolean;
    hideModal: () => void;
}

const NewRoom: FunctionComponent<IProps> = ({isOpen, hideModal}) => {


    return <>
        <Modal
            isOpen={isOpen}
            onDismiss={hideModal}
            containerClassName={contentStyles.container}
        >
            <div className={contentStyles.header}>
                <span id={useId()}>{useId()}</span>
                <IconButton
                    styles={iconButtonStyles}
                    iconProps={cancelIcon}
                    ariaLabel="Close popup modal"
                    onClick={hideModal}
                />
            </div>
            <div className={contentStyles.body}>
                <TextField />
            </div>

        </Modal>
    </>
}


const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
    },
    header: [
        theme.fonts.xLargePlus,
        {
            flex: '1 1 auto',
            borderTop: `4px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '12px 12px 14px 24px',
        },
    ],
    body: {
        flex: '4 4 auto',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
});
const cancelIcon: IIconProps = {iconName: 'Cancel'};
const iconButtonStyles = {
    root: {
        color: theme.palette.neutralPrimary,
        marginLeft: 'auto',
        marginTop: '4px',
        marginRight: '2px',
    },
    rootHovered: {
        color: theme.palette.neutralDark,
    },
};

export default NewRoom;
