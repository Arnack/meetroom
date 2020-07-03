import React, { FunctionComponent, useState } from "react";
import { IconButton } from "office-ui-fabric-react";

interface IProps {
    text: string;
}

export const ShowPassToggler: FunctionComponent<IProps> = ({text}) => {

    const [showText, setShowText] = useState(false);
    const hideText = () => {
        return text.split('').map(() => '•');
    }

    return (
        <>
            <span>
                {showText ? text : hideText()}
            </span>
            <IconButton
                className="visibility-toggler-icon"
                iconProps={{ iconName: showText ? 'Hide' : 'RedEye' }}
                onClick={() => setShowText(!showText)}
            />
        </>
    )
}