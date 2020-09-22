import React, {Component, FC, useEffect, useRef, useState} from "react";
import {db} from "../../firebase";
import {useAuth} from "../../helpers/useAuth";
import {currentUser} from "../../stores/currentUserStore/currentUserStore";
import {useStore} from "effector-react";
import {IUser} from "../../model/user/IUser";
import {on} from "cluster";
import useCollection from "../../helpers/useCollection";
import {DateFormat} from "../../model/types";
import Peer from "peerjs";
import {log} from "util";

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

    // navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    //     .then(stream => {
    //         //@ts-ignore attach this stream to window object so you can reuse it later
    //         window.localStream = stream;
    //         // Your code to use the stream
    //     })
    //     .catch((err) =>{
    //         console.log(err);
    //     });



    //// Old code begins
    // let peer: any = new Peer(props.id + user.uid );
    // let conn: any = null;
    //
    // if (users.length === 1) {
    //     peer = new Peer(props.id + user.uid);
    // }
    //
    // if (users.length === 2) {
    //
    //     if (!!peer) {
    //         conn = peer.connect(props.id + users[1].id);
    //         conn.on('open', () => {
    //             conn.send('hi!');
    //         });
    //
    //         //@ts-ignore
    //         navigator.mediaDevices.getUserMedia({video: false, audio: true}, (stream: any) => {
    //             const call = peer.call(props.id + users[1].id, stream);
    //
    //             console.log('stream sended')
    //
    //             call.on('stream', (remoteStream: any) => {
    //                 if (userVideo.current) {
    //                     // @ts-ignore
    //                     userVideo.current.stream = remoteStream;
    //                 }
    //             });
    //         }, (err: any) => {
    //             console.error('Failed to get local stream', err);
    //         });
    //     }
    // }
    //
    // !!peer && peer.on('connection', (conn: any) => {
    //     conn.on('data', (data: any) => {
    //         // Will print 'hi!'
    //         console.log(data);
    //     });
    //     conn.on('open', () => {
    //         conn.send('hello!');
    //     });
    // });
    //
    // !!peer && peer.on('call', (call: any) => {
    //     //@ts-ignore
    //     navigator.mediaDevices.getUserMedia({video: true, audio: true}, (stream) => {
    //         call.answer(stream); // Answer the call with an A/V stream.
    //         call.on('stream', (remoteStream: any) => {
    //
    //             console.log('stream recieved')
    //
    //             if (partnerVideo.current) {
    //                 console.log('pv c')
    //                 // @ts-ignore
    //                 partnerVideo.current.stream = remoteStream;
    //             }
    //         });
    //     }, (err: any) => {
    //         console.error('Failed to get local stream', err);
    //     });
    // });
    ///old code ends

    useEffect(() => {
        const pcConfig = undefined;
        pc = new RTCPeerConnection(pcConfig);

        pc.onicecandidate = (e) => {
            if (e.candidate) {
                console.log('e.candidate', JSON.stringify(e.candidate));
            }
        }

        pc.onconnectionstatechange = (e) => {
            console.log('onconnectionstatechange', e);
        }

        // @ts-ignore
        pc.ontrack = (pc, ev: RTCTrackEvent) => {
            console.log('track ev', ev);

            if (partnerVideo.current) {
                // @ts-ignore
                partnerVideo.current.srcObject = ev.track;
                pc.addStram(ev.track);
            }


        }

        const constrains = { video: true, audio: true };
        const success = (stream: any) => {
            if (userVideo && userVideo.current) {
                // @ts-ignore
                userVideo.current.srcObject = stream;
            }
        }
        const failure = (e: any) => {
            console.error(e);
        }
        navigator.mediaDevices.getUserMedia(constrains)
            .then(success)
            .catch(failure);
    }, []);



    return <>
        <button onClick={() => {
            //@ts-ignore
            pc.createOffer({offerToReceiveVideo: 1, offerToReceiveAudio: 1})
                .then((sdp: RTCSessionDescription) => {
                    console.log('rtc s d', JSON.stringify(sdp));
                    //@ts-ignore
                    pc.setLocalDescription(sdp);
                }, (e: any) => {

                });
        }
        }>
            Offer
        </button>

        <button onClick={() => {
        }
        }>
            Answer
        </button>

        <textarea ref={textRef}></textarea>


        <button onClick={() => {
            pc.setRemoteDescription()
        }
        }>
            Set Descr
        </button>

        <button onClick={() => {
        }
        }>
            Add candid
        </button>


        <video playsInline muted
               style={{width: '600px', height: '420px'}}
               ref={userVideo} autoPlay />
        <video  playsInline muted
                ref={partnerVideo} autoPlay />
    </>;
}
