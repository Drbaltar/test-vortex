import React from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import SideBar from './SideBar';
import NewQuestion from './NewQuestion/InputForm';

import "./Questions.css";

const Questions = () => {
    const match = useRouteMatch();

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="sidenav">
                    <SideBar/>
                </div>
                
                <Switch>
                    <Route exact path={`${match.path}/add-Patriot`}>
                        <div className="col sub-body">
                            <NewQuestion/>
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>  
    );
}

export default Questions;