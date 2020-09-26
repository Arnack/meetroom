import React, {FC, useEffect, useRef} from "react";
import {IUser} from "../../model/user/IUser";

interface IProps {
    roomId: string;
    users: any[];
    user: IUser;
}

export const VideoContainer: FC<IProps> = ({roomId, user, users}) => {
    let userVideo = useRef(null);
    let partnerVideo = useRef(null);
    let textRef = useRef(null);


    let peerConnection: any = null;
    let localStream: any = null;
    let remoteStream = null;
    let roomDialog = null;


    useEffect(() => {
        if (users && users.length && users[0].id &&
            user && user.uid &&
            users[0].id === user.uid) {

            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            }).then((stream) => {

                localStream = stream;

                //@ts-ignore
                userVideo.current.srcObject = stream;

                if (users.length > 1) {

                }
            })
                .catch(() => {
                    console.error('unable to get user"s media');
                });


            return () => {
                console.log('on close?')

                try {
                    // @ts-ignore
                    localStream.getTracks().forEach((track) => {
                        track.stop();
                    });
                } catch (e) {

                }
            }
        }
    }, [users, user]);

    return <>
        <textarea ref={textRef}></textarea>
        <video playsInline muted
               style={{width: '600px', height: '420px', transform: 'rotateY(180deg)'}}
               ref={userVideo} autoPlay/>
        <video playsInline muted
               ref={partnerVideo} autoPlay/>
    </>
}
