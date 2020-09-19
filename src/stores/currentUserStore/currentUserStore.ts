import {createStore} from "effector";
import {setUser} from "./currentUserEvents";
import {IUser} from "../../model/user/IUser";

export const currentUser = createStore(null)
    // @ts-ignore
    .on(setUser, (store: IUser | null, payload: IUser): IUser => payload);
