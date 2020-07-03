import { createEvent } from "effector";
import { IGrowl } from "../../model/misc/IGrowl";

export const showMessage = createEvent<IGrowl>("show message");
export const hideGrowl = createEvent<IGrowl | void>("hide growl");
