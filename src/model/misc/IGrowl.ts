import { MessageBarType } from "office-ui-fabric-react";

export interface IGrowl {
    title: string;
    description: string;
    type?: MessageBarType;
    isVisible: boolean;
    id?: number;
}
