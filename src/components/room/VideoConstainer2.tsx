import React, {FC, useEffect, useRef, useState} from "react";
import {IUser} from "../../model/user/IUser";
import {configuration} from "./roomConnectionConfig";
import {db} from "../../firebase";

interface IProps {
    roomId: string;
    users: any[];
    user: IUser;
}

export const VideoContainer2: FC<IProps> = ({roomId, user, users}) => {

    const [localStream, setLocalStream] = useState();
    let llocalStream: any = null;

    const [remoteStream, setRemoteStream] = useState();
    let rremoteStream: any = null;

    const [cachedLocalPC, setCachedLocalPC] = useState();

    const [isMuted, setIsMuted] = useState(false);

    let userVideo = useRef(null);
    let partnerVideo = useRef(null);


    const onBackPress = () => {
        if (cachedLocalPC) {
            cachedLocalPC.removeStream(localStream);
            cachedLocalPC.close();
        }
        setLocalStream(null);
        setRemoteStream(null);
        setCachedLocalPC(null);
        // cleanup
    }

    const startLocalStream = async () => {
        const constraints = {
            audio: true,
            video: true
        }
        const newStream = await navigator.mediaDevices.getUserMedia(constraints);

        setLocalStream(newStream);
        llocalStream = newStream;

        if (userVideo.current) {
            // @ts-ignore
            userVideo.current.srcObject = newStream;
        }

    }

    const startCall = async (id: string) => {
        const localPC = new RTCPeerConnection(configuration);

        //instead of localPC.addStream(localStream)
        llocalStream.getTracks().forEach((track: MediaStreamTrack) => { //catch error here
            localPC.addTrack(track, llocalStream);
        });

        await db.collection('activeCalls').doc(roomId).set({});
        const callRef = await db.collection('activeCalls').doc(roomId);

        //?

        callRef.collection('calleeCandidates').doc('asfdsf').set({});
        //?
        const callerCandidatesCollection = callRef.collection('calleeCandidates');

        localPC.onicecandidate = e => {
            if (!e.candidate) {
                console.log('got a final candid');
                return;
            }

            callerCandidatesCollection.add(e.candidate.toJSON());
        };

        //there is no localPC.onaddstream
        localPC.ontrack = e => {

            //may be e.track?
            if (e.streams && remoteStream !== e.streams) {
                console.log('RemotePC received the stream call', e.streams);
                setRemoteStream(e.streams[0]);
                rremoteStream = e.streams[0];

                if (partnerVideo.current) {
                    try {
                        // @ts-ignore
                        partnerVideo.current.srcObject = e.streams[0]
                    } catch (e) {
                        console.error('partners video set error', e.toString())
                    }

                }

            }
        }


        const offer = await localPC.createOffer();
        await localPC.setRemoteDescription(offer);

        const roomWithOffer = JSON.stringify(offer);


        await callRef.set({offer: roomWithOffer});

        callRef.onSnapshot(async snapshot => {
            const data = snapshot.data();

            if (!localPC.currentRemoteDescription && data && data.answer) {

                let answer = data.answer;

                try {
                    answer = JSON.parse(data.answer);
                } catch (e) {
                    console.error(e)
                }

                const rtcSessionDescription = new RTCSessionDescription(answer);
                await localPC.setRemoteDescription(rtcSessionDescription); //error here
            }
        });

        callRef.collection('calleeCandidates').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(async change => {
                if (change.type === 'added') {
                    let data = change.doc.data();

                    if (data.sdpMid || data.sdpMid === "0") {
                        await localPC.addIceCandidate(new RTCIceCandidate(data));
                    }
                }
            });
        });

        setCachedLocalPC(localPC);

    }

    // Mutes the local's outgoing audio
    const toggleMute = () => {
        if (!remoteStream) {
            return;
        }
        localStream.getAudioTracks().forEach((track: MediaStreamTrack) => {
            track.enabled = !track.enabled;
            setIsMuted(!track.enabled);
        });
    };


    const joinCall = async () => {
        const callRef = await db.collection('activeCalls').doc(roomId);
        const callSnapshot = await callRef.get();

        if (!callSnapshot.exists) return;
        const localPC = new RTCPeerConnection(configuration);

        //insted of localPC.addStream(localStream);
        llocalStream.getTracks().forEach((track: MediaStreamTrack) => {
            localPC.addTrack(track, llocalStream);
        });

        const calleeCandidatesCollection = callRef.collection('calleeCandidates');
        localPC.onicecandidate = e => {
            if (!e.candidate) {
                console.log('Got final candidate!');
                return;
            }
            calleeCandidatesCollection.add(e.candidate.toJSON());
        };

        // localPC.onaddstream = e => {
        //     if (e.stream && remoteStream !== e.stream) {
        //         console.log('RemotePC received the stream join', e.stream);
        //         setRemoteStream(e.stream);
        //     }
        // };

        //there is no localPC.onaddstream
        localPC.ontrack = e => {
            //may be e.track?
            if (e.streams && remoteStream !== e.streams) {
                console.log('RemotePC received the stream call', e.streams);
                setRemoteStream(e.streams[0]);
                rremoteStream = e.streams[0];


                if (partnerVideo.current) {
                    try {

                        console.log('streams', e.streams)
                        // @ts-ignore
                        partnerVideo.current.srcObject = e.streams[0]
                    } catch (e) {
                        console.error('partners video set error', e.toString())
                    }
                }

                if (partnerVideo.current) {
                    try {

                        console.log('track', e.track)
                        // @ts-ignore
                        // partnerVideo.current.srcObject = e.streams[0]
                    } catch (e) {
                        console.error('partners video set error', e.toString())
                    }
                }

            }
        }

        // @ts-ignore
        const offer = callSnapshot.data().offer;

        if (offer) {
            const off = JSON.parse(offer);
            await localPC.setRemoteDescription(new RTCSessionDescription(off));

            const answer = await localPC.createAnswer();
            await localPC.setLocalDescription(answer);

            const roomWithAnswer = {answer};

            console.log('roomWithAnswer', roomWithAnswer)
            console.log('roomWithAnswer answ', roomWithAnswer.answer)

            await callRef.update({answer: JSON.stringify(roomWithAnswer.answer)}); //was update

            callRef.collection('callerCandidates').onSnapshot(snapshot => {
                snapshot.docChanges().forEach(async change => {
                    if (change.type === 'added') {
                        let data = change.doc.data();
                        await localPC.addIceCandidate(new RTCIceCandidate(data));
                    }
                });
            });

            setCachedLocalPC(localPC);
        }


    }


    useEffect(() => {
        if (users && users.length && users[0].id &&
            user && user.uid) {

            if (users[0].id == user.uid) {
                startLocalStream()
                    .then(() => {
                    //     startCall(roomId)
                    //         .then(() => {
                    //
                    //         })
                    //         .catch((e) => {
                    //             console.error('unable to call', e);
                    //         });
                    //

                        setTimeout(() => {
                            startCall(roomId)
                                .then(() => {

                                })
                                .catch((e) => {
                                    console.error('unable to call', e);
                                });
                        }, 1100);
                    })
                    .catch((e) => {
                        console.error('unable to start local stream', e);
                    });


            }

            if (users.length > 1 && users[1].id === user.uid) {
                startLocalStream()
                    .then(() => {
                        joinCall()
                            // .then(() => {
                            //
                            // })
                            // .catch((e) => {
                            //     console.error('unable to join call', e);
                            // });


                        setTimeout(() => {
                            joinCall()
                                .then(() => {

                                })
                                .catch((e) => {
                                    console.error('unable to call', e);
                                });
                        }, 1100);
                    })
                    .catch((e) => {
                        console.error('unable to start local stream (on join)', e);
                    });
            }
        }

    }, [users]);

    return <>
        <textarea
            value={users.toString()}
        >
        </textarea>
        {localStream && <textarea
            value={localStream.toString()}
        >
        </textarea>}

        <video playsInline muted
               style={{width: '600px', height: '420px', transform: 'rotateY(180deg)'}}
               ref={userVideo} autoPlay/>
        <video playsInline muted
               ref={partnerVideo} autoPlay/>
    </>
}
