import React, {FC, useEffect, useRef} from "react";
import {IUser} from "../../model/user/IUser";
import {configuration} from "./roomConnectionConfig";
import Peer, {MediaConnection} from "peerjs";

interface IProps {
    roomId: string;
    users: any[];
    user: IUser;
}


export const VC3: FC<IProps> = ({roomId, user, users}) => {

    let userVideo = useRef(null);
    let partnerVideo = useRef(null);
    let peercall: any;

    let peer = new Peer(roomId.substr(0, 8) + user.uid.substr(0, 8),
        {config: configuration});

    peer.on('open', (peerID) => {
        console.log('opening peer connection, peer id', peerID);
    });


    peer.on('call', (call) => {
        console.log('incoming call');
        peercall = call;
        callanswer(call);
    })


    const callanswer = (call: MediaConnection) => {
        navigator.mediaDevices.getUserMedia({audio: true, video: true})
            .then(function (mediaStream) {
                // var video = document.getElementById('myVideo');
                call.answer(mediaStream); // отвечаем на звонок и передаем свой медиапоток собеседнику
                //peercall.on('close', onCallClose); //можно обработать закрытие-обрыв звонка
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
                }, 2000);
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
                let pcall = peer.call(roomId.substr(0, 8) + users[0].id.substr(0, 8),
                    mediaStream); //звоним, указав peerId-партнера и передав свой mediaStream

                peercall = pcall

                console.log('calling to', roomId.substr(0, 8) + users[0].id.substr(0, 8));

                pcall.on('stream', function (stream: any) { //нам ответили, получим стрим
                    setTimeout(function () {
                        if (partnerVideo.current) {
                            //@ts-ignore
                            partnerVideo.current.srcObject = peercall.stream;
                        }

                    }, 2000);
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
                setTimeout(callToNode, 2000);
                // callToNode();
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
