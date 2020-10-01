import React, {FC, useEffect, useRef, useState} from "react";
import {IUser} from "../../model/user/IUser";
import {configuration} from "./roomConnectionConfig";
import {db} from "../../firebase";

interface IProps {
    roomId: string;
    users: any[];
    user: IUser;
}

export const VC3: FC<IProps> = ({roomId, user, users}) => {

    let userVideo = useRef(null);
    let partnerVideo = useRef(null);


    return <>
        <textarea
            value={users.toString()}
        >
        </textarea>

        <video playsInline muted
               style={{width: '600px', height: '420px', transform: 'rotateY(180deg)'}}
               ref={userVideo} autoPlay/>
        <video playsInline muted
               ref={partnerVideo} autoPlay/>
    </>
}
