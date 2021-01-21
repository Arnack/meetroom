import React, {FC, useEffect, useRef} from "react";
import {IUser} from "../../model/user/IUser";
import {configuration} from "./roomConnectionConfig";
import Peer, {MediaConnection} from "peerjs";
import openSocket from 'socket.io-client';

interface IProps {
    roomId: string;
    users: any[];
    user: IUser;
}

const initializePeerConnection = (id: string) => {
    return new Peer(id, {config: configuration});
}

const initializeSocketConnection = () => {
    console.log('try ws');

    // return openSocket.connect('ws://ec2-34-227-149-124.compute-1.amazonaws.com:3006', {// need to provide backend server endpoint
    return openSocket.connect('ws://localhost:3008', {// need to provide backend server endpoint
        // (ws://localhost:5000) if ssl provided then
        // (wss://localhost:5000)
        reconnection: true,
        rejectUnauthorized: false,
        reconnectionAttempts: 10
    });
}


export const VC4: FC<IProps> = ({roomId, user, users}) => {

    let userVideo = useRef(null);
    let partnerVideo = useRef(null);
    let peercall: any;

    let peer = initializePeerConnection(roomId);
    // initializeSocketConnection();

    peer.on('open', (peerID) => {
        console.log('opening peer connection, peer id', peerID);
    });

useEffect(() => {
    console.log('s');

    // openSocket.connect('ws://localhost:3006', {// need to provide backend server endpoint
    //     // (ws://localhost:5000) if ssl provided then
    //     // (wss://localhost:5000)
    //     reconnection: true,
    //     rejectUnauthorized: false,
    //     reconnectionAttempts: 10
    // });

    // openSocket('ws://localhost:3008');
    initializeSocketConnection();
}, []);

    return <>
        <textarea
            value={users.toString()}
        >
        </textarea>

        <video playsInline
               style={{transform: 'rotateY(180deg)'}}
               ref={userVideo} autoPlay/>
        <video playsInline
               style={{transform: 'rotateY(180deg)'}}
               ref={partnerVideo} autoPlay/>
    </>
}
