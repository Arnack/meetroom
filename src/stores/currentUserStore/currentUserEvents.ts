import {createEvent} from "effector";
import {IUser} from "../../model/user/IUser";

export const setUser = createEvent<IUser | null>('set current user');
