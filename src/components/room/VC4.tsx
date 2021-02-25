import React, {FC, useEffect, useRef, useState} from "react";
import {IUser} from "../../model/user/IUser";
import {configuration} from "./roomConnectionConfig";
import Peer, {MediaConnection} from "peerjs";
import openSocket from 'socket.io-client';
import './VC.scss';
import {FontIcon} from 'office-ui-fabric-react/lib/Icon';
import {mergeStyles} from 'office-ui-fabric-react/lib/Styling';
import {history} from "../../helpers/browserHistory";
import {Panel} from 'office-ui-fabric-react/lib/Panel';


const actionIconClass = mergeStyles({
    fontSize: 20,
    height: 35,
    width: 35,
    border: '2px solid white',
    borderRadius: "50%",
    cursor: "pointer",
    margin: '0 12px',
    textAlign: "center",
    lineHeight: "35px",
    transition: ".2s",
    selectors: {
        ":hover": {
            backgroundColor: "rgba(0, 0, 0, 0.16)",
        }
    }
});

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

let currentUserRef: any = null;
let stream0: any = null;
let stream1: any = null;
let stream2: any = null;
let stream3: any = null;
let stream4: any = null;

let currentUserCallMap = new Map();
let streamMap = new Map();

export const VCPeerjs: FC<IProps> = ({roomId, user, users}) => {
    const [isUserVideoActive, setIsUserVideoActive] = useState(false);
    const [isUserAudioActive, setIsUserAudioActive] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);

    const [isChatOpened, setIsChatOpened] = useState(false);


    let activeVideo = useRef(null);
    let userVideo = useRef(null);
    let partnerVideo = useRef(null);
    let partnerVideo1 = useRef(null);
    let partnerVideo2 = useRef(null);
    let partnerVideo3 = useRef(null);
    let partnerVideo4 = useRef(null);

    const selectVideo = (ref: any) => {
        // @ts-ignore
        activeVideo.current.srcObject = ref.current.srcObject;
    }

    const selectRef = (idx: number) => {
        switch (idx) {
            case 0:
                return partnerVideo;
            case 1:
                return partnerVideo1;
            case 2:
                return partnerVideo2;
            case 3:
                return partnerVideo3;
            case 4:
                return partnerVideo4;
        }
    }


    // if (user) {
    //     // if (!peer)
    //     //     peer = initializePeerConnection(roomId + user.uid);
    //     if (!peer)
    //         peer = new Peer(roomId + user.uid, {debug: 2});
    //
    //     peer.on('open', (peerID: any) => {
    //         console.log('opened peer connection, peer id', peerID);
    //     });
    //
    //     peer.on('connection', (conn: any) => {
    //         console.log('connection invoked');
    //
    //         conn.on('data', (data: any) => {
    //             console.log('recieved >>>> ', data);// Will print 'hi!'
    //         });
    //         conn.on('open', () => {
    //             console.log('sending2...');
    //             conn.send('hello!');
    //
    //
    //             conn.on('data', (data: any) => {
    //                 console.log('recieved xxx >>>> ', data);// Will print 'hi!'
    //             });
    //         });
    //     });
    //
    //

    if (!peer) {
        peer = new Peer(roomId + user.uid, {debug: 2});
    }
        peer.on('call', (call: any) => {
            navigator.mediaDevices.getUserMedia({video: true, audio: true})
                .then((stream) => {
                    call.answer(stream);

                    if (userVideo.current) {
                        console.log(1);
                        // @ts-ignore
                        userVideo.current.srcObject = stream;
                    }
                })
                .catch((err) => {
                    console.log('err while call answering', err.toString());
                });


            call.on('stream', (remoteStream: any) => {
                if (partnerVideo.current) {


                    console.log('139', remoteStream)
                    // @ts-ignore
                    partnerVideo.current.srcObject = remoteStream;
                }
            })
        })
    // }

    useEffect(() => {
            if (!peer) {
                peer = new Peer(roomId + user.uid, {debug: 2});
            }

            if (user && !currentUserRef) {
                navigator.mediaDevices.getUserMedia({video: true, audio: true})
                    .then((stream) => {

                        //TODO wrap with try/catch
                        if (userVideo.current) {
                            // @ts-ignore
                            userVideo.current.srcObject = stream;
                        }
                        currentUserRef = userVideo;
                        stream0 = stream;

                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }

            for (let i = 0; i < users.length; i++) {
                if (users[i].id === user.uid) {
                    continue;
                }

                const call = peer.call(roomId + users[i].id, stream0);

                console.log('call', call);
                console.log('stream0', stream0);

                call?.on('stream', (remoteStream: any) => {
                    console.log('rS', remoteStream);
                    const ref = selectRef(i);
                    if (ref?.current) {
                        // @ts-ignore
                        ref.current.srcObject = remoteStream;
                    }
                });
            }
        },
        [user, users]);


    // useEffect(() => {
    //     if (users.length > 1 && (user.uid === users[0].id)) {
    //
    //         // setTimeout(() => {
    //         if (currentConn) {
    //             currentConn.close();
    //         }
    //
    //         navigator.mediaDevices.getUserMedia({video: true, audio: true})
    //             .then((stream) => {
    //
    //                 const call = peer.call(roomId + users[1].id, stream);
    //                 call.on('stream', (remoteStream: any) => {
    //                     console.log('rS', remoteStream);
    //                     // Show stream in some <video> element.
    //
    //                     if (partnerVideo.current) {
    //                         // @ts-ignore
    //                         partnerVideo.current.srcObject = remoteStream;
    //                     }
    //                 });
    //
    //                 if (userVideo.current) {
    //                     // @ts-ignore
    //                     userVideo.current.srcObject = stream;
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.log('err while calling', err.toString());
    //             })
    //
    //         currentConn = peer.connect(roomId + users[1].id, {reliable: true});
    //
    //         console.log('conn', currentConn, currentConn?.open);
    //
    //         currentConn?.on('open', () => {
    //             console.log('sending...');
    //             currentConn.send('hi!');
    //         });
    //
    //         currentConn?.on('data', () => {
    //             console.log('on dta...');
    //             // currentConn.send('hi!');
    //         });
    //
    //         currentConn?.on('close', () => {
    //             console.log('closed');
    //             // currentConn.send('hi!');
    //         });
    //
    //
    //         // }, 2000);
    //
    //     }
    // }, [users]);

    return <>
        <Panel
            headerText="Chat"
            // this prop makes the panel non-modal
            isBlocking={false}
            isOpen={isChatOpened}
            onDismiss={() => setIsChatOpened(false)}
            closeButtonAriaLabel="Close"
        >
            <input/>
        </Panel>
        <div className={"video-board"}>

            <div className="active-video-container">
                <video playsInline
                       className="video active-video"
                       ref={activeVideo} autoPlay/>
            </div>
            <div className="video-tumbs">
                {users
                    .filter((item) => item.id !== user.uid)
                    .map((singleUser, index) => {
                            return <div key={"video-tumb" + singleUser.id} className={"video-tumb-item_container"}>
                                <video playsInline
                                       onClick={() => selectVideo(selectRef(index))}
                                       key={singleUser.id}
                                       className={`video partner-video ${singleUser?.photoUrl}`}
                                       style={{backgroundImage: `url(${singleUser?.photoUrl})`}}
                                       ref={selectRef(index)}
                                       autoPlay/>
                                <span className={"video-tumb-name"}>{singleUser.name}</span>
                            </div>
                        }
                    )}

                {user && <div className={"video-tumb-item_container"}>
                    <video playsInline
                           className="video your-video"
                           style={{backgroundImage: `url(${user?.photoURL})`}}
                           ref={userVideo} autoPlay>

                    </video>
                    <span className={"video-tumb-name"}>{user.displayName}</span>
                </div>
                }
            </div>
            <div className="call-action-panel">
                <div className="call-actions">
                    <FontIcon iconName={"DeclineCall"} className={actionIconClass}
                              onClick={() => history.push("/")}
                    />
                    <FontIcon iconName={isScreenSharing ? "TVMonitor" : "TVMonitor"} className={actionIconClass}
                              onClick={() => setIsScreenSharing(!isUserAudioActive)}
                    />
                    <FontIcon iconName={isUserAudioActive ? "Microphone" : "MicOff2"} className={actionIconClass}
                              onClick={() => setIsUserAudioActive(!isUserAudioActive)}
                    />
                    <FontIcon iconName={isUserVideoActive ? "Video" : "VideoOff"} className={actionIconClass}
                              onClick={() => setIsUserVideoActive(!isUserVideoActive)}
                    />
                    <FontIcon iconName={"Comment"} className={actionIconClass}
                              onClick={() => setIsChatOpened(!isChatOpened)}
                    />
                </div>
            </div>

        </div>

    </>
}

// export const VC4 = React.memo(VCPeerjs, (prev, next) => {
//     return prev.user.uid === next.user.uid && prev.users.length === next.users.length
// })

export const VC4 = React.memo(VCPeerjs);