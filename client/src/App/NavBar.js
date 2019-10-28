import React from 'react';
import VortexLogo from './assets/tornado.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <Link to="/home" className="navbar-brand">
                <img src={VortexLogo} width="30" height="30" className="d-inline-block align-top pr-1" alt=""/>
                Test Vortex
            </Link>
            <div className="navbar-nav">
                <Link to="/questions" className="nav-item nav-link">Questions</Link>     
            </div>
        </nav>
    );
};

export default NavBar;