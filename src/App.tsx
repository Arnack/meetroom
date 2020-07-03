import React from 'react';
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

initializeIcons();
growlState
    .on(showMessage, (state, payload: IGrowl) => {
        payload.isVisible = true;
        return payload;
    })
    .on(hideGrowl, () => ({title: '', description: '', isVisible: false}));

function App() {
  return (
    <div className="App">
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
