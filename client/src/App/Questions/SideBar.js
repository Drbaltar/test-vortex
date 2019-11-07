import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

const SideBar = () => {
    const match = useRouteMatch();
    return(
        <div className="pt-3">
            <NavLink to={`${match.url}/add`} className="nav-item nav-link" 
                style={{color: 'black'}}
                activeStyle={{
                    background: 'gray',
                    color:'white'
                }}>
                Add Question
            </NavLink>
            <NavLink to={`${match.url}/approve`} className="nav-item nav-link"
                style={{color: 'black'}}
                activeStyle={{
                    background: 'gray',
                    color:'white'
                }}>
                Approve Question
            </NavLink>
        </div>
    );
}

export default SideBar;