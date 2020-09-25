import React, {Component, FC, useEffect, useRef, useState} from "react";
import {db, firebase} from "../../firebase";
import {useAuth} from "../../helpers/useAuth";
import {currentUser} from "../../stores/currentUserStore/currentUserStore";
import {useStore} from "effector-react";
import {IUser} from "../../model/user/IUser";
import {on} from "cluster";
import useCollection from "../../helpers/useCollection";
import {DateFormat} from "../../model/types";
import Peer from "peerjs";
import {history} from "../../helpers/browserHistory";

interface IProps {
    id?: string;
    match: any;
}

interface IState {
}

export const Room: FC<IProps> = (props) => {

    let userVideo = useRef(null);
    let partnerVideo = useRef(null);
    let textRef = useRef(null);
    let pc = null;

    const [roomUsers, setRoomUsers] = useState([]);

    const renewRoomUsers = () => {

    }

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
                .then(() => { //TODO probably move to return of useEffect
                    if (!users.length) {
                        removeCurrentRoom();
                    }
                })
                .catch((err) => console.error(err.toString()));
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

        return () => {
        }
    }, [user]);





    const users = useCollection(`rooms/${props.match.params.id}/participants`)
        .map((item: IUser) => {
            return {
                name: item.displayName,
                email: item.email,
                id: item.uid,
                photoUrl: item.photoURL
            }
        });
    console.log('users', users);






    return <>
        <button onClick={() => { }}>
            Offer
        </button>

        <button onClick={() => {
        }
        }>
            Answer
        </button>

        <textarea ref={textRef}></textarea>



        <video playsInline muted
               style={{width: '600px', height: '420px'}}
               ref={userVideo} autoPlay />
        <video  playsInline muted
                ref={partnerVideo} autoPlay />
    </>;
}
