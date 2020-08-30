import React, {useState} from "react";
import { IconButton } from "office-ui-fabric-react";
import { StorageService } from "../../../../services/StorageService";
import { history } from "../../../../helpers/browserHistory";
import "./Login.scss";
import {firebase} from "../../../../firebase";

export const Login = () => {
    const [authErr, setAuthErr] = useState(null);

    const handleSignIn = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            const result = await firebase.auth().signInWithPopup(provider);
        } catch (err) {
            setAuthErr(err);
        }
        // const user = result.user;
    }


    return <>
        <IconButton
            className="logout-btn"
            iconProps={{ iconName: "Signin" }}
            onClick={handleSignIn}
        />
    </>
}
