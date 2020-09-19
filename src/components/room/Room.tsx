import React, {Component, FC, useEffect, useState} from "react";
import {db} from "../../firebase";
import {useAuth} from "../../helpers/useAuth";
import {currentUser} from "../../stores/currentUserStore/currentUserStore";
import {useStore} from "effector-react";
import {IUser} from "../../model/user/IUser";
import {on} from "cluster";
import useCollection from "../../helpers/useCollection";
import {DateFormat} from "../../model/types";

interface IProps {
    id?: string;
    match: any;
}

interface IState {
}

export const Room: FC<IProps> = (props) => {

    const [roomUsers, setRoomUsers] = useState([]);

    const renewRoomUsers = () => {

    }

    const user: IUser = useStore(currentUser);

    //for removing users on page close
    //it doesn't work TODO make it work
    const handleWindowBeforeUnload = (e: any) => {
        e.preventDefault();
        return onUnMount();
    };

    const onMount = () => {
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
            //TODO remove
            console.error('unable to connect');
        }
    }

    const onUnMount = () => {
        if (user) {
            db
                .collection("rooms")
                .doc(props.match.params.id)
                .collection("participants")
                .doc(user.uid)
                .delete()
                .catch((err) => console.error(err.toString()));
        }
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


    //TODO this is not a todo but example of retieving inner docs
    // const userIds = useCollection(`rooms/${props.match.params.id}/participants`)
    //     .map((item) => {
    //         item.user.onSnapshot((doc: any) => {
    //             console.log(doc.data());
    //         })
    //         return item
    //     })
    // console.log('users', userIds);


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
        {props.match.params.id}
    </>;
}
