import React from "react";
import { DetailsRow } from "office-ui-fabric-react";
import { history } from "../../../../helpers/browserHistory";

const rowStyle = {
    root: {
        cursor: 'pointer'
    }
}

export const renderRow = (props: any, defaultRender: any): JSX.Element => {
    return (
        <DetailsRow {...props}
                    styles={rowStyle}
                    onClick={() => history.push(`/users/${props.item.id}`)}
        />
    );
}