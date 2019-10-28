import React from 'react';
import VortexLogo from './assets/tornado.png';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <Link to="/home" className="navbar-brand">
                <img src={VortexLogo} width="30" height="30" className="d-inline-block align-top pr-1" alt=""/>
                Test Vortex
            </Link>
            <div className="navbar-nav">
                <NavLink to="/test" className="nav-item nav-link">Tests</NavLink>     
            </div>
            <div className="navbar-nav">
                <NavLink to="/questions" className="nav-item nav-link">Questions</NavLink>     
            </div>
            <div className="navbar-nav">
                <NavLink to="/issues" className="nav-item nav-link">Issues</NavLink>     
            </div>
        </nav>
    );
};

export default NavBar;