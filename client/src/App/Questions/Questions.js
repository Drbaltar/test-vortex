import React from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import NewQuestion from './NewQuestion/InputForm';

const Questions = () => {
    const match = useRouteMatch();

    return(
        <div>
            <Link to={`${match.url}/add`} className="card">
                Add card
            </Link>
        
        <Switch>
            <Route exact path={`${match.path}/add`}>
                <NewQuestion/>
            </Route>
        </Switch>
        </div>
    );
}

export default Questions;