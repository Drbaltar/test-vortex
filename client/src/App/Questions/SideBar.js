import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

import "./SideBar.css";

const SideBar = () => {
    const match = useRouteMatch();
    return(
        <div className="pt-5">
            <div className="pl-2 sidelabel" style={{font: 'bold'}}>Add Question</div>
            <NavLink to={`${match.url}/add-patriot`} className="nav-item nav-link pl-4" 
                style={{color: 'black'}}
                activeStyle={{
                    background: 'gray',
                    color:'white'
                }}>
                Patriot
            </NavLink>
            <hr/>
            <div className="pl-2 sidelabel">Approve Question</div>
            <NavLink to={`${match.url}/approve-patriot`} className="nav-item nav-link pl-4"
                style={{color: 'black'}}
                activeStyle={{
                    background: 'gray',
                    color:'white'
                }}>
                Patriot
            </NavLink>
            <hr/>
            <div className="pl-2 sidelabel">Update Question</div>
            <NavLink to={`${match.url}/update-patriot`} className="nav-item nav-link pl-4"
                style={{color: 'black'}}
                activeStyle={{
                    background: 'gray',
                    color:'white'
                }}>
                Patriot
            </NavLink>
            <hr/>
            <div className="pl-2 sidelabel">Delete Question</div>
            <NavLink to={`${match.url}/delete-patriot`} className="nav-item nav-link pl-4"
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