import {DateFormat} from "../types";

export interface IUser {
    "id"?: number;
    "login": string;
    "email": string;
    "hash"?: string;
    "creationDate"?: DateFormat;
    "updatedOn"?: DateFormat;
}