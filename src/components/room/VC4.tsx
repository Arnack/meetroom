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

let currentConn: any = null;
let peer: any = null;
let connn: any = null;

export const VCPeerjs: FC<IProps> = ({roomId, user, users}) => {




    let userVideo = useRef(null);
    let partnerVideo = useRef(null);


    if (user) {
        // if (!peer)
        //     peer = initializePeerConnection(roomId + user.uid);
        if (!peer)
            peer = new Peer(roomId + user.uid, {debug: 2});

        peer.on('open', (peerID: any) => {
            console.log('opened peer connection, peer id', peerID);
        });

        peer.on('connection', (conn: any) => {
            console.log('connection invoked');

            conn.on('data', (data: any) => {
                // Will print 'hi!'
                console.log('recieved >>>> ', data);
            });
            conn.on('open', () => {
                console.log('sending2...');
                conn.send('hello!');


                conn.on('data', (data: any) => {
                    // Will print 'hi!'
                    console.log('recieved xxx >>>> ', data);
                });
            });
        });


        peer.on('call', (call: any) => {

            console.log('on call call', call)

            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                .then((stream) => {
                    call.answer(stream);

                    if (userVideo.current) {
                        // @ts-ignore
                        userVideo.current.srcObject = stream;
                    }

                    call.on('stream', (remoteStream: any) => {
                        if (partnerVideo.current) {
                            // @ts-ignore
                            partnerVideo.current.srcObject = remoteStream;
                        }
                    })
                })
                .catch((err) => {
                    console.log('err while call answering', err.toString());
                })
        })
    }

    useEffect(() => {
        if (users.length > 1 && (user.uid === users[0].id)) {

            // setTimeout(() => {

            if (currentConn) {
                currentConn.close();
            }

            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                .then((stream) => {

                    const call = peer.call(roomId + users[1].id, stream);
                    call.on('stream', (remoteStream: any) => {
                        console.log('rS', remoteStream);
                        // Show stream in some <video> element.

                        if (partnerVideo.current) {
                            // @ts-ignore
                            partnerVideo.current.srcObject = remoteStream;
                        }
                    });

                    if (userVideo.current) {
                        // @ts-ignore
                        userVideo.current.srcObject = stream;
                    }
                })
                .catch((err) => {
                    console.log('err while calling', err.toString());
                })

            currentConn = peer.connect(roomId + users[1].id, {reliable: true});

            console.log('conn', currentConn, currentConn?.open);

            currentConn?.on('open', () => {
                console.log('sending...');
                currentConn.send('hi!');
            });

            currentConn?.on('data', () => {
                console.log('on dta...');
                // currentConn.send('hi!');
            });

            currentConn?.on('close', () => {
                console.log('closed');
                // currentConn.send('hi!');
            });


            // }, 2000);

        }
    }, [users]);


    return <>
        <button onClick={() => {
            if (users.length > 1) {

                console.log('trying');

                const otherId = roomId + user.uid === users[0].id ? users[1].id : users[0].id;

                currentConn?.send("хуй");

            }
        }
        }
        >call
        </button>

        <video playsInline
               style={{transform: 'rotateY(180deg)'}}
               ref={userVideo} autoPlay/>
        <video playsInline
               style={{transform: 'rotateY(180deg)'}}
               ref={partnerVideo} autoPlay/>
    </>
}

// export const VC4 = React.memo(VCPeerjs, (prev, next) => {
//     return prev.user.uid === next.user.uid && prev.users.length === next.users.length
// })

export const VC4 = React.memo(VCPeerjs);