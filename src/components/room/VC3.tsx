import React, {FC, useEffect, useRef} from "react";
import {IUser} from "../../model/user/IUser";
import {configuration} from "./roomConnectionConfig";
import Peer from "peerjs";

interface IProps {
    roomId: string;
    users: any[];
    user: IUser;
}


export const VC3: FC<IProps> = ({roomId, user, users}) => {

    let userVideo = useRef(null);
    let partnerVideo = useRef(null);

    let peer = new Peer(roomId + user.uid, {config: configuration});

    peer.on('open', (peerID) => {
        console.log('opening peer connection, peer id', peerID);
    });


    peer.on('call', (call) => {
        console.log('incomming call');
        peercall = call;
        callanswer();
    })

    let peercall: any;

    const callanswer = () => {
        navigator.mediaDevices.getUserMedia({audio: true, video: true})
            .then(function (mediaStream) {
                // var video = document.getElementById('myVideo');
                peercall.answer(mediaStream); // отвечаем на звонок и передаем свой медиапоток собеседнику
                //peercall.on ('close', onCallClose); //можно обработать закрытие-обрыв звонка
                if (userVideo.current) {
                    //@ts-ignore
                    userVideo.current.srcObject = mediaStream;
                } //помещаем собственный медиапоток в объект видео (чтоб видеть себя)

                setTimeout(function () {
                    //входящий стрим помещаем в объект видео для отображения
                    if (partnerVideo.current) {
                        //@ts-ignore
                        partnerVideo.current.srcObject = peercall.remoteStream;
                    }
                }, 1500);
                console.log('answering...');
            })
            .catch(function (err) {
            console.log(err.name + ": " + err.message);
        });
    }

    function callToNode() { //вызов
        navigator.mediaDevices.getUserMedia({audio: true, video: true})
            .then(function (mediaStream) {
                // var video = document.getElementById('myVideo');
                peercall = peer.call(roomId + users[0].id, mediaStream); //звоним, указав peerId-партнера и передав свой mediaStream

                console.log('call to', roomId + users[0].id);

                peercall.on('stream', function (stream: any) { //нам ответили, получим стрим
                    setTimeout(function () {
                        if (partnerVideo.current) {
                            //@ts-ignore
                            partnerVideo.current.srcObject = peercall.remoteStream;
                        }

                    }, 1500);
                });
                //  peercall.on('close', onCallClose);
                if (userVideo.current) {
                    //@ts-ignore
                    userVideo.current.srcObject = mediaStream;
                }

                console.log('call to node invoked');
            })
            .catch(function (err) {
            console.log('call to node err', err.name, err.message);
        });
    }


    useEffect(() => {
        if (users && users.length && users[0].id &&
            user && user.uid) {

            if (users[0].id == user.uid) {

            }

            if (users.length > 1 && users[1].id === user.uid) {
                callToNode();
            }


        }

    }, [users])

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
