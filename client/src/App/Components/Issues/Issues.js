import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import SideBar from '../shared-components/SideBar/SideBar';

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
                    <Route>
                        
                    </Route>
                </Switch>
            </div>
        </div>  
    );
}

export default Issues;