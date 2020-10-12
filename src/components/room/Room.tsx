import React, {Component, FC, useEffect, useRef, useState} from "react";
import {db, firebase} from "../../firebase";
import {currentUser} from "../../stores/currentUserStore/currentUserStore";
import {useStore} from "effector-react";
import {IUser} from "../../model/user/IUser";
import useCollection from "../../helpers/useCollection";
import {DateFormat} from "../../model/types";
import {history} from "../../helpers/browserHistory";
import {configuration} from "./roomConnectionConfig";
import {VideoContainer} from "./VideoContainer";
import {VideoContainer2} from "./VideoConstainer2";
import {VC3} from "./VC3";

interface IProps {
    id?: string;
    match: any;
}

interface IState {
}

export const Room: FC<IProps> = (props) => {



    const users = useCollection(`rooms/${props.match.params.id}/participants`)
        .map((item: IUser) => {
            return {
                name: item.displayName,
                email: item.email,
                id: item.uid,
                photoUrl: item.photoURL
            }
        });

    const user: IUser = useStore(currentUser);

    //for removing users on page close
    //it doesn't work for user reopened page (ctrl + shift + z) TODO make it work
    const handleWindowBeforeUnload = (e: any) => {
        e.preventDefault();
        return onUnMount();
    };

    const onMount = () => {

        /**
         * renew userList?
         */
        if (user) {
            db
                .collection("rooms")
                .doc(props.match.params.id)
                .collection("participants")
                .doc(user.uid)
                .set({
                    user: db.collection('users').doc(user.uid),
                    ...user
                })
                .catch((err) => console.error(err.toString()));
        } else {
            //if not logged in
            console.error('unable to connect');
            history.push('/');
            const provider = new firebase.auth.GoogleAuthProvider();
            try {
                firebase.auth().signInWithPopup(provider);
            } catch (err) {
                console.error(err);
            }
        }
    }

    //for removing users (and TODO rooms in the future)
    const onUnMount = () => {

        if (user) {
            db
                .collection("rooms")
                .doc(props.match.params.id)
                .collection("participants")
                .doc(user.uid)
                .delete()
                .then(() => { //TODO refactor somehow
                    //romm deletion if last user has left this room

                    db.collection(`rooms/${props.match.params.id}/participants`).get()
                        .then((snap) => {
                            if (!snap.docs.length) {
                                removeCurrentRoom();
                            }
                        })

                })
                .catch((err) => console.error(err.toString()));


            console.log('users.length after', users.length);
        }
    }


    const removeCurrentRoom = () => {
        db
            .collection("rooms")
            .doc(props.match.params.id)
            .delete()
            .catch((err) => console.error(err.toString()));
    }

    useEffect(() => {
        window.addEventListener('beforeunload', handleWindowBeforeUnload);
        return () => {
            onUnMount();
            window.removeEventListener('beforeunload', handleWindowBeforeUnload);
        }
    }, []);


    useEffect(() => {
        onMount();
    }, [user]);


    return <>
        {/*<VideoContainer2 roomId={props.match.params.id} users={users} user={user} />*/}
        <VC3 roomId={props.match.params.id} users={users} user={user} />
    </>;
}
