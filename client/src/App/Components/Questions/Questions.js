import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import SideBar from '../shared-components/SideBar/SideBar';
import NewQuestion from './Components/NewQuestion/NewQuestion';
import ApproveQuestion from './Components/ApproveQuestion/ApproveQuestion';
import UpdateQuestion from './Components/UpdateQuestion/UpdateQuestion'

const Questions = () => {
    const match = useRouteMatch();

    const sideBarMenu = [{
        title: 'Patriot Questions',
        submenu: [{ title: 'Add (New)', link: 'add-patriot'},
            { title: 'Approve (Pending)', link: 'approve-patriot'},
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
                    <Route exact path={`${match.path}/add-patriot`}>
                        <div className="col sub-body">
                            <NewQuestion questionType="Patriot"/>
                        </div>
                    </Route>
                    <Route exact path={`${match.path}/approve-patriot`}>
                        <div className="col sub-body">
                            <ApproveQuestion questionType="Patriot"/>
                        </div>
                    </Route>
                    <Route exact path={`${match.path}/update-patriot`}>
                        <div className="col sub-body">
                            <UpdateQuestion questionType="Patriot"/>
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>  
    );
};

export default Questions;