import React from "react";
import { RoomList } from "./roomList/RoomList";
import { history } from "../../helpers/browserHistory";
import { PrimaryButton, IconButton } from "office-ui-fabric-react";
import { AddNewButton } from "../shared/addNewButton/AddNewButton";
import {useBoolean} from "@uifabric/react-hooks";
import NewRoom from "./roomList/newRoom/newRoom";

export const Homepage = () => {

    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);

    return <>
        <div className="home-search-container">

            <RoomList />
            <AddNewButton callBack={showModal} />
        </div>
        <NewRoom isOpen={isModalOpen} hideModal={hideModal} />
    </>
}
