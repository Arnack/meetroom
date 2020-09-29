import React, {FC, useEffect, useRef, useState} from "react";
import {IUser} from "../../model/user/IUser";
import {configuration} from "./roomConnectionConfig";
import {db} from "../../firebase";

interface IProps {
    roomId: string;
    users: any[];
    user: IUser;
}

export const VideoContainer2: FC<IProps> = ({ roomId, user, users }) => {

    const [localStream, setLocalStream] = useState();
    const [remoteStream, setRemoteStream] = useState();
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

        if (userVideo.current) {
            // @ts-ignore
            userVideo.current.srcObject = newStream;
        }

    }

    const startCall = async (id: string) => {
        const localPC = new RTCPeerConnection(configuration);


        //instead of localPC.addStream(localStream)
        localStream.getTracks().forEach((track: MediaStreamTrack) => {
            localPC.addTrack(track, localStream);
        });

        const callRef = await db.collection('activeCalls').doc(roomId);
        const roomRef = await db.collection('rooms').doc(roomId);

        //?
        const callerCandidatesCollection = callRef.collection('participants');

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
                setRemoteStream(e.streams);

                if (partnerVideo.current) {
                    try {
                        // @ts-ignore
                        partnerVideo.current.srcObject = e.streams
                    } catch (e) {
                        console.error(e.toString())
                    }

                }

            }
        }


        const offer = await localPC.createOffer();
        await localPC.setRemoteDescription(offer);

        const roomWithOffer = { offer };
        await callRef.set(roomWithOffer);

        roomRef.onSnapshot(async snapshot => {
            const data = snapshot.data();
            if (!localPC.currentRemoteDescription && data && data.answer) {
                const rtcSessionDescription = new RTCSessionDescription(data.answer);
                await localPC.setRemoteDescription(rtcSessionDescription);
            }
        });

        callRef.collection('calleeCandidates').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(async change => {
                if (change.type === 'added') {
                    let data = change.doc.data();
                    await localPC.addIceCandidate(new RTCIceCandidate(data));
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
            // console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
            track.enabled = !track.enabled;
            setIsMuted(!track.enabled);
        });
    };


    useEffect(() => {
        if (users && users.length && users[0].id &&
            user && user.uid) {

            if (users.length === 1 && users[0].id == user.uid) {
                startLocalStream();
            }
            if (users.length === 2
                // && users[1].id == user.uid
            ) {
                startCall(roomId);
            }


        }

    }, [users]);

    return <>
        <textarea>
            {users}
        </textarea>

        <video playsInline muted
               style={{width: '600px', height: '420px', transform: 'rotateY(180deg)'}}
               ref={userVideo} autoPlay/>
        <video playsInline muted
               ref={partnerVideo} autoPlay/>
        </>
}
