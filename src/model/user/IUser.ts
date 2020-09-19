import {DateFormat} from "../types";

//TODO remove
export interface IUser {
    "uid": string;
    "displayName": string;
    "photoURL"?: string;
    "hash": string;
    "email": DateFormat;
}
