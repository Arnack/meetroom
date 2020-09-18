import { createEvent } from "effector";

export const selectLanguage = createEvent<string>("select language");
export const deSelectLanguage = createEvent("deselect language");
export const renewLanguageList = createEvent<string[]>("renew language list");
