import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import SideBar from '../shared-components/SideBar/SideBar';
import NewQuestion from './Components/NewQuestion/NewQuestion';
import ApproveQuestion from './Components/ApproveQuestion/ApproveQuestion';
import UpdateQuestion from './Components/UpdateQuestion/UpdateQuestion';
import DeleteQuestion from './Components/DeleteQuestion/DeleteQuestion';

const Questions = () => {
    const match = useRouteMatch();

    const sideBarMenu = [{
        title: 'Patriot Questions',
        submenu: [{ title: 'Add (New)', link: 'patriot/add'},
            { title: 'Approve (Pending)', link: 'patriot/approve'},
            { title: 'Update (Existing)', link: 'patriot/update'},
            { title: 'Delete (Existing)', link: 'patriot/delete'}]
    }];

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="sidenav">
                    <SideBar menu={sideBarMenu}/>
                </div>
                
                <Switch>
                    <Route exact path={`${match.path}/patriot/add`}>
                        <div className="col sub-body">
                            <NewQuestion questionType="Patriot"/>
                        </div>
                    </Route>
                    <Route exact path={`${match.path}/patriot/approve`}>
                        <div className="col sub-body">
                            <ApproveQuestion questionType="Patriot"/>
                        </div>
                    </Route>
                    <Route exact path={`${match.path}/patriot/update`}>
                        <div className="col sub-body">
                            <UpdateQuestion questionType="Patriot"/>
                        </div>
                    </Route>
                    <Route exact path={`${match.path}/patriot/delete`}>
                        <div className="col sub-body">
                            <DeleteQuestion questionType="Patriot"/>
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>  
    );
};

export default Questions;