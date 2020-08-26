import React, {useEffect, useState} from 'react';
import './App.scss';
import ErrorBoundary from "./components/errorHandler/ErrorBoundary";
import Layout from "./containers/layout/Layout";
import { initializeIcons } from '@uifabric/icons';
import { history } from "./helpers/browserHistory";
import { Route, Router } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import { growlState } from "./stores/growlStore/growlStore";
import { hideGrowl, showMessage } from "./stores/growlStore/growlEvents";
import { IGrowl } from "./model/misc/IGrowl";
import { db, firebase, setupPresence } from "./firebase";
import useCollection from "./helpers/useCollection";

initializeIcons();
growlState
    .on(showMessage, (state, payload: IGrowl) => {
        payload.isVisible = true;
        return payload;
    })
    .on(hideGrowl, () => ({title: '', description: '', isVisible: false}));

function useAuth() {
    const [user, setUser] = useState();
    //auth auth
    useEffect(() => {
        return firebase.auth().onAuthStateChanged((firebaseUser) => {

            if (firebaseUser) {
                const tmpUser = {
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    uid: firebaseUser.uid,
                    email: firebaseUser.email
                }
                setUser(tmpUser);
                db
                    .collection('users')
                    .doc(tmpUser.uid)
                    .set(tmpUser, {merge: true});

                setupPresence(tmpUser);

            } else {
                setUser(null);
            }
        })
    }, []);

    return user;
}


function App() {

    const users = useCollection('users', 'id');
    const user = useAuth();

  return (
    <div className="App">
        {user ? <div
            style={{backgroundColor: "forestgreen", color: "white", position: "absolute", zIndex: 400, top: '100px'}}
        >
            <button onClick={() => {firebase.auth().signOut()}}>log out!!!</button>
            <img src={user.photoURL}

                 style={{height: '50px', width: "50px", position: "relative", zIndex: 401}}
            />
        </div> :
        <Login />
        }
        <input type="text"
               style={{position: "absolute",
               zIndex: 999999
               }}
               onKeyDown={(e) => {
            if (e.key === "Enter") {
                //@ts-ignore
                let val = e.target.value;

                console.log(val);

                db  //rooms/8dPoVTMHfBifOg3hoEuM/messages
                    .collection("rooms")
                    .doc("tst2")
                    .collection("mess")
                    .add({
                        user: db.collection('users').doc(user.uid),
                        text: val,
                        createdAt: new Date()
                    })
            }
        }}/>
        {
            users.map((item:any) => {
                return <div style={{position: "relative", zIndex: 99999, background: "steelblue"}}>
                    <span>{item.id}</span>
                    <span>{item.carma}</span>
                    <span>{item.points}</span>
                </div>
            })
        }
        <ErrorBoundary>
            <Router history={history}>
                <Layout />
                <Route path="/login" component={LoginPage}/>
            </Router>
        </ErrorBoundary>
    </div>
  );
}

export default App;


const Login = () => {

    const [authErr, setAuthErr] = useState(null);

    const handleSignIn = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            const result = await firebase.auth().signInWithPopup(provider);
        } catch (err) {
            setAuthErr(err);
        }
        // const user = result.user;
    }

    return <div
        style={{backgroundColor: "forestgreen", color: "white", position: "absolute", zIndex: 400, top: '100px'}}
    >
        <button onClick={handleSignIn}>log in with google</button>
        {authErr && <div>
            <p>{
                // @ts-ignore
                authErr.message
            }</p>
        </div>}
    </div>
}
