import React, {useEffect, useState} from 'react';
import './App.scss';
import ErrorBoundary from "./components/errorHandler/ErrorBoundary";
import Layout from "./containers/layout/Layout";
import { initializeIcons } from '@uifabric/icons';
import { history } from "./helpers/browserHistory";
import { Route, Router } from "react-router-dom";
import { growlState } from "./stores/growlStore/growlStore";
import { hideGrowl, showMessage } from "./stores/growlStore/growlEvents";
import { IGrowl } from "./model/misc/IGrowl";
import { db, firebase, setupPresence } from "./firebase";
import useCollection from "./helpers/useCollection";
import {useAuth} from "./helpers/useAuth";

initializeIcons();
growlState
    .on(showMessage, (state, payload: IGrowl) => {
        payload.isVisible = true;
        return payload;
    })
    .on(hideGrowl, () => ({title: '', description: '', isVisible: false}));




function App() {

    const users = useCollection('users', 'id');
    const user = useAuth();

  return (
    <div className="App">
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
                <Layout user={user} />
            </Router>
        </ErrorBoundary>
    </div>
  );
}

export default App;
