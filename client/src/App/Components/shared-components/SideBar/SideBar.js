import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

import './SideBar.css';

const SideBar = (props) => {
    let menuList = props.menu;

    const match = useRouteMatch();
    const filledMenu = menuList.map(entry => 
        <div key={entry.title}>
            <div className="pl-2 sidelabel" style={{font: 'bold'}}>{entry.title}</div>
            {entry.submenu.map(entry => 
                <NavLink key={entry.title} to={`${match.url}/${entry.link}`} className="nav-item nav-link pl-4" 
                    style={{color: 'black'}}
                    activeStyle={{
                        background: 'gray',
                        color:'white'
                    }}>
                    {entry.title}
                </NavLink>
            )}
        </div>
    );
        
    return(
        <div className="pt-5">
            {filledMenu}
        </div>
    );
};

export default SideBar;