import React from "react";
import { RoomList } from "./roomList/RoomList";
import { history } from "../../helpers/browserHistory";
import { PrimaryButton, IconButton } from "office-ui-fabric-react";
import { AddNewButton } from "../shared/addNewButton/AddNewButton";
import {useBoolean} from "@uifabric/react-hooks";
import NewRoom from "./roomList/newRoom/newRoom";
import {firebase} from "../../firebase";

export const Homepage = () => {

    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);

    return <>
        <div className="home-search-container">
            <AddNewButton callBack={showModal} />

            <RoomList />


        </div>
        <NewRoom isOpen={isModalOpen} hideModal={hideModal} />
    </>
}
