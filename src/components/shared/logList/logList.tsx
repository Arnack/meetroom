import React, { FunctionComponent } from "react";

interface IProps {
    logList: string[];
}

export const logList: FunctionComponent<IProps> = ({logList}) => {
    return <>
            <ul>
                {logList.map(item => <li>{item}</li>)}
            </ul>
        </>
}
