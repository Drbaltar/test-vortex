import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

const SideBar = () => {
    const match = useRouteMatch();
    return(
        <nav className="pt-3">
            <NavLink to={`${match.url}/add`} className="nav-item nav-link">
                Add Question
            </NavLink>
        </nav>
    );
}

export default SideBar;