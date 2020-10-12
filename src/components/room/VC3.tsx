import React, {FC, useEffect, useRef, useState} from "react";
import {IUser} from "../../model/user/IUser";
import {configuration} from "./roomConnectionConfig";
import {db} from "../../firebase";

import SimplePeer from "simple-peer";
import Peer from "peerjs";

interface IProps {
    roomId: string;
    users: any[];
    user: IUser;
}

let peer = new Peer();

export const VC3: FC<IProps> = ({roomId, user, users}) => {

    let userVideo = useRef(null);
    let partnerVideo = useRef(null);


    useEffect(() => {
        peer.on('open', (peerID) => {
            console.log('peer id', peerID);
        });
    }, []);


    useEffect(() => {
        if (users && users.length && users[0].id &&
            user && user.uid) {

            if (users[0].id == user.uid) {

            }

            if (users.length > 1 && users[1].id === user.uid) {

            }


        }

    }, [users])

    return <>
        <textarea
            value={users.toString()}
        >
        </textarea>

        <video playsInline muted
               style={{transform: 'rotateY(180deg)'}}
               ref={userVideo} autoPlay/>
        <video playsInline muted
               style={{transform: 'rotateY(180deg)'}}
               ref={partnerVideo} autoPlay/>
    </>
}
