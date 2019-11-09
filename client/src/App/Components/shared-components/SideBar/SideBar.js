import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

import "./SideBar.css";

const SideBar = () => {
    const match = useRouteMatch();
    return(
        <div className="pt-5">
            <div className="pl-2 sidelabel" style={{font: 'bold'}}>Patriot Questions</div>
            <NavLink to={`${match.url}/add-patriot`} className="nav-item nav-link pl-4" 
                style={{color: 'black'}}
                activeStyle={{
                    background: 'gray',
                    color:'white'
                }}>
                Add (New)
            </NavLink>
            <NavLink to={`${match.url}/approve-patriot`} className="nav-item nav-link pl-4"
                style={{color: 'black'}}
                activeStyle={{
                    background: 'gray',
                    color:'white'
                }}>
                Approve (Pending)
            </NavLink>
            <NavLink to={`${match.url}/update-patriot`} className="nav-item nav-link pl-4"
                style={{color: 'black'}}
                activeStyle={{
                    background: 'gray',
                    color:'white'
                }}>
                Update (Existing)
            </NavLink>
            <NavLink to={`${match.url}/delete-patriot`} className="nav-item nav-link pl-4"
                style={{color: 'black'}}
                activeStyle={{
                    background: 'gray',
                    color:'white'
                }}>
                Delete (Existing)
            </NavLink>
        </div>
    );
}

export default SideBar;