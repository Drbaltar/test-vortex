import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import SideBar from '../shared-components/SideBar/SideBar';
import NewIssue from './Components/NewIssue/NewIssue';
import ViewIssues from './Components/ViewIssues/ViewIssues';

const Issues = () => {
    const match = useRouteMatch();

    const sideBarMenu = [{
        title: 'Issues',
        submenu: [{ title: 'Submit (New)', link: 'new'},
            { title: 'View (Existing)', link: 'view'},
            { title: 'Update (Existing)', link: 'update'},  
            { title: 'Close (Existing)', link: 'close'}]
    }];

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="sidenav">
                    <SideBar menu={sideBarMenu}/>
                </div>
                
                <Switch>
                    <Route exact path={`${match.path}/new`}>
                        <div className="col sub-body">
                            <NewIssue/>
                        </div>
                    </Route>
                    <Route exact path={`${match.path}/view`}>
                        <ViewIssues />
                    </Route>
                </Switch>
            </div>
        </div>  
    );
};

export default Issues;