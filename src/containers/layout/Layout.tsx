import React, { FunctionComponent } from "react";
import { Fabric } from "@fluentui/react";
import { Route, Switch } from "react-router-dom";
import "./Layout.scss"
import { HorizontalNav } from "./horizontalNav/HorizontalNav";
import { ProtectionWrapper } from "../protection/ProtectionWrapper";
import { Growl } from "../../components/shared/growl/Growl";
import { UserListPage } from "../../components/users/userList/UserListPage";

import { loadTheme } from 'office-ui-fabric-react';
import { darkTheme } from "./themes/darkTheme";
import { NewUser } from "../../components/users/NewUser";
import { Homepage } from "../../components/homepage/Homepage";
import { greenTheme } from "./themes/darckGreenTheme";
import {Room} from "../../components/room/Room";
loadTheme(greenTheme);

interface IProps {
    user: any
}

const Layout: FunctionComponent<IProps> = ({user}) => {
    return (
        <Fabric className="app-container">
            <HorizontalNav user={user} />

            <div className="content-wrapper">
                <div className="content-container">
                    <Growl />
                    <Switch>

                        <Route path="/rooms/:id" component={Room}/>
                        <Route path="/rooms" component={Homepage}/>

                        {/*TODO remove new user*/}
                        {/*<Route path="/users/new" component={NewUser}/>*/}
                        {/*<Route path="/users/:userId" component={UserListPage} render={({match}) => <UserListPage />} />*/}
                        {/*<Route path="/users" component={UserListPage}/>*/}

                        <Route path="/" component={Homepage}/>
                    </Switch>
                </div>
            </div>
        </Fabric>)
}

// export default ProtectionWrapper()(Layout);
export default Layout;
