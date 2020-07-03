import React from "react";
import { SearchBar } from "./searchBar/SearchBar";
import { history } from "../../helpers/browserHistory";
import { PrimaryButton, IconButton } from "office-ui-fabric-react";
import { AddNewButton } from "../shared/addNewButton/AddNewButton";

export const Homepage = () => {
    return <>
        <div className="home-search-container">
            <SearchBar />
            <AddNewButton text={"Создать расследование"} callBack={() => {}} />

        </div>
    </>
}
