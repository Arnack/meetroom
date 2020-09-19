import { createStore } from "effector";
import { MessageBarType } from "office-ui-fabric-react";
import { IGrowl } from "../../model/misc/IGrowl";
import { StorageService } from "../../services/StorageService";

export const growlState = createStore({title: '', description: '', type: MessageBarType.warning, isVisible: false} as IGrowl);
