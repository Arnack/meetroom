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
import { db } from "./firebase";

initializeIcons();
growlState
    .on(showMessage, (state, payload: IGrowl) => {
        payload.isVisible = true;
        return payload;
    })
    .on(hideGrowl, () => ({title: '', description: '', isVisible: false}));

function App() {

    const [users, setUsers] = useState([{
        id: 'dsf',
        carma: 0,
        country: "rusland",
        name: "ivan",
        points: 0,
        registration: new Date()
    }]);


    useEffect(() => {
        return db.collection('users').onSnapshot((snapshot => {
            const docs: any[] = [];
            snapshot.forEach((doc) => {
                // console.log(doc);
                // console.log(doc.data());
                docs.push({
                    ...doc.data(),
                    id: doc.id
                });
            });

            setUsers(docs);
            console.log(docs);
        }));
    }, []);

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
                    .doc("8dPoVTMHfBifOg3hoEuM")
                    .collection("messages")
                    .add({
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
