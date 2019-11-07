import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

import "./SideBar.css";

const SideBar = () => {
    const match = useRouteMatch();
    return(
        <div className="pt-5">
            <div className="pl-2 sidelabel" style={{font: 'bold'}}>Add Question</div>
            <NavLink to={`${match.url}/add-Patriot`} className="nav-item nav-link pl-4" 
                style={{color: 'black'}}
                activeStyle={{
                    background: 'gray',
                    color:'white'
                }}>
                Patriot
            </NavLink>
            <hr/>
            <div className="pl-2 sidelabel">Approve Question</div>
            <NavLink to={`${match.url}/approve-Patriot`} className="nav-item nav-link pl-4"
                style={{color: 'black'}}
                activeStyle={{
                    background: 'gray',
                    color:'white'
                }}>
                Patriot
            </NavLink>
        </div>
    );
}

export default SideBar;