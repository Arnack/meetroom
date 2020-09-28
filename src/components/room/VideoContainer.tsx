import React, {FC, useEffect, useRef, useState} from "react";
import {IUser} from "../../model/user/IUser";
import {createOffer, initiateConnection, initiateLocalStream, listenToConnectionEvents} from "./modules/RTCModule";
import {db, firebase} from "../../firebase";
import {doCandidate, doOffer} from "./modules/FirebaseModule";
import Peer from 'simple-peer';
import {configuration} from "./roomConnectionConfig";


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
    let localConnection: any = null;
    let localStream: any = null;

    const [locStream, setLocStream] = useState();
    const [remStream, setRemStream] = useState();

    let remoteStream: any = null;
    let roomDialog = null;






    // const startCall = async () => {
    //     if (users.length === 2 && users[0].id === user.uid) {
    //
    //         console.log('is inside a call')
    //
    //         listenToConnectionEvents(localConnection, users[0].id,
    //             users[1].id, db, partnerVideo, doCandidate)
    //         // create an offer
    //         createOffer(localConnection, localStream, users[1].id, doOffer, db, users[0].id)
    //     }
    // }
    //
    // const handleUpdate = (notif, username) => {
    //     const { localConnection, database, localStream } = this.state
    //
    //     if (notif) {
    //         switch (notif.type) {
    //             case 'offer':
    //                 this.setState({
    //                     connectedUser: notif.from
    //                 })
    //
    //                 listenToConnectionEvents(localConnection, username, notif.from, database, this.remoteVideoRef, doCandidate)
    //
    //                 sendAnswer(localConnection, localStream, notif, doAnswer, database, username)
    //                 break
    //             case 'answer':
    //
    //                 this.setState({
    //                     connectedUser: notif.from
    //                 })
    //                 startCall(localConnection, notif)
    //                 break
    //             case 'candidate':
    //                 addCandidate(localConnection, notif)
    //                 break
    //             default:
    //                 break
    //         }
    //     }
    // }

    const registerPeerConnectionListeners = () => {
        peerConnection.addEventListener('icegatheringstatechange', () => {
            console.log(
                `ICE gathering state changed: ${peerConnection.iceGatheringState}`);
        });
    }

    async function initiateLS() {
        // const roomRef = db.collection('rooms').doc(roomId);
        const callInfoRef = db.collection('callInfo').doc(roomId);

        console.log('Create PeerConnection with configuration: ', configuration);
        peerConnection = new RTCPeerConnection(configuration);

        registerPeerConnectionListeners();

        locStream.getTracks().forEach((track: MediaStreamTrack) => {
            peerConnection.addTrack(track, locStream);
        });

        // Code for collecting ICE candidates below
        const callerCandidatesCollection = callInfoRef.collection('callerCandidates');

        peerConnection.addEventListener('icecandidate', (event: any) => {
            if (!event.candidate) {
                console.log('Got final candidate!');
                return;
            }
            console.log('Got candidate: ', event.candidate);
            callerCandidatesCollection.add(event.candidate.toJSON());
        });
        // Code for collecting ICE candidates above

        // Code for creating a room below
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        console.log('Created offer:', offer);

        const roomWithOffer = {
            'offer': {
                type: offer.type,
                sdp: offer.sdp,
            },
        };
        await callInfoRef.set(roomWithOffer);

        console.log(`New room created with SDP offer. Room ID: ${roomId}`);
        // Code for creating a room above


        peerConnection.addEventListener('track', (event: any) => {
            console.log('Got remote track:', event.streams[0]);
            event.streams[0].getTracks().forEach((track: MediaStreamTrack) => {
                console.log('Add a track to the remoteStream:', track);
                // @ts-ignore
                remStream.addTrack(track);
            });
        });

        // Listening for remote session description below
        callInfoRef.onSnapshot(async snapshot => {
            const data = snapshot.data();
            if (!peerConnection.currentRemoteDescription && data && data.answer) {
                console.log('Got remote description: ', data.answer);
                const rtcSessionDescription = new RTCSessionDescription(data.answer);
                await peerConnection.setRemoteDescription(rtcSessionDescription);
            }
        });
        // Listening for remote session description above

        // Listen for remote ICE candidates below
        callInfoRef.collection('calleeCandidates').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(async change => {
                if (change.type === 'added') {
                    let data = change.doc.data();
                    console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
                    await peerConnection.addIceCandidate(new RTCIceCandidate(data));
                }
            });
        });
        // Listen for remote ICE candidates above
    }

    async function joinRoomById(roomId: string) {
        const callInfoRef = db.collection('callInfo').doc(roomId);
        const roomSnapshot = await callInfoRef.get();
        console.log('Got room:', roomSnapshot.exists);

        if (roomSnapshot.exists) {
            console.log('Create PeerConnection with configuration: ', configuration);
            peerConnection = new RTCPeerConnection(configuration);
            registerPeerConnectionListeners();
            locStream.getTracks().forEach((track: MediaStreamTrack) => {
                peerConnection.addTrack(track, locStream);
            });

            // Code for collecting ICE candidates below
            const calleeCandidatesCollection = callInfoRef.collection('calleeCandidates');
            peerConnection.addEventListener('icecandidate', (event: any) => {
                if (!event.candidate) {
                    console.log('Got final candidate!');
                    return;
                }
                console.log('Got candidate: ', event.candidate);
                calleeCandidatesCollection.add(event.candidate.toJSON());
            });
            // Code for collecting ICE candidates above

            peerConnection.addEventListener('track', (event: any) => {
                console.log('Got remote track:', event.streams[0]);
                event.streams[0].getTracks().forEach((track: MediaStreamTrack) => {
                    console.log('Add a track to the remoteStream:', track);
                    // @ts-ignore
                    remStream.addTrack(track);
                });
            });


            // Code for creating SDP answer below
            // @ts-ignore
            const offer = roomSnapshot.data().offer;
            console.log('Got offer:', offer);
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnection.createAnswer();
            console.log('Created answer:', answer);
            await peerConnection.setLocalDescription(answer);

            const roomWithAnswer = {
                answer: {
                    type: answer.type,
                    sdp: answer.sdp,
                },
            };
            await callInfoRef.update(roomWithAnswer);
            // Code for creating SDP answer above

            // Listening for remote ICE candidates below
            callInfoRef.collection('callerCandidates').onSnapshot(snapshot => {
                snapshot.docChanges().forEach(async change => {
                    if (change.type === 'added') {
                        let data = change.doc.data();
                        console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
                        await peerConnection.addIceCandidate(new RTCIceCandidate(data));
                    }
                });
            });
            // Listening for remote ICE candidates above
        }

    }

    async function openUserMedia() {
        const stream = await navigator.mediaDevices.getUserMedia(
            {video: true, audio: true});
        // @ts-ignore
        userVideo.current.srcObject = stream;
        localStream = stream;
        setLocStream(stream);
        remoteStream = new MediaStream();
        setRemStream(remoteStream);
        // @ts-ignore
        partnerVideo.current.srcObject = remoteStream;
    }

    async function hangUp() {
        // @ts-ignore
        const tracks = userVideo.current.srcObject.getTracks();
        tracks.forEach((track: MediaStreamTrack) => {
            track.stop();
        });

        if (remStream) {
            remStream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
        }

        if (peerConnection) {
            peerConnection.close();
        }

        // Delete room on hangup
        if (roomId) {
            const callInfoRef = db.collection('callInfo').doc(roomId);
            const calleeCandidates = await callInfoRef.collection('calleeCandidates').get();
            calleeCandidates.forEach(async candidate => {
                await candidate.ref.delete();
            });
            const callerCandidates = await callInfoRef.collection('callerCandidates').get();
            callerCandidates.forEach(async candidate => {
                await candidate.ref.delete();
            });
            await callInfoRef.delete();
        }
    }


    useEffect( () => {

            // initiateLS();

        }, []);


    useEffect(() => {
        if (users && users.length && users[0].id &&
            user && user.uid) {
            openUserMedia();
        }


        if (users && users.length && users[0].id &&
            user && user.uid &&
        locStream && remStream) {


            if (users.length === 1 && users[0].id === user.uid) {
                initiateLS();
            } else if(users.length === 2 && users[1].id === user.uid) {
                joinRoomById(roomId);
            }


            return () => {

                hangUp();

                // try {
                //     // @ts-ignore
                //     localStream.getTracks().forEach((track) => {
                //         track.stop();
                //     });
                // } catch (e) {
                //
                // }
            }
        }
    }, [users, user, locStream, remStream]);

    return <>
        <textarea ref={textRef}></textarea>
        <video playsInline muted
               style={{width: '600px', height: '420px', transform: 'rotateY(180deg)'}}
               ref={userVideo} autoPlay/>
        <video playsInline muted
               ref={partnerVideo} autoPlay/>
    </>
}
