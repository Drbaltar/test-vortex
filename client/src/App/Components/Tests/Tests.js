import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import SideBar from '../shared-components/SideBar/SideBar';
import NewTest from './Components/NewTest/NewTest';

const Tests = () => {
    const match = useRouteMatch();

    const sideBarMenu = [{
        title: 'Patriot Tests',
        submenu: [{ title: 'Generate (New)', link: 'generate-patriot'},
            { title: 'View (Existing)', link: 'view-patriot'},
            { title: 'Update (Existing)', link: 'update-patriot'},  
            { title: 'Delete (Existing)', link: 'delete-patriot'}]
    }];

    return( 
        <div className="container-fluid">
            <div className="row">
                <div className="sidenav">
                    <SideBar menu={sideBarMenu}/>
                </div>
                
                <Switch>
                    <Route exact path={`${match.path}/generate-patriot`}>
                        <div className="col sub-body">
                            <NewTest testType="Patriot"/>
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>  
    );
};

export default Tests;