import React from 'react';
import VortexLogo from "./assets/tornado.png";

const NavBar = (props) => {
    return(
        <nav className="navbar navbar-dark bg-dark fixed-top">
            <a className="navbar-brand" href="home">
                <img src={VortexLogo} width="35" height="30" className="d-inline-block align-top pr-1" alt=""/>
                Test Vortex
            </a>
        </nav>
    );
};

export default NavBar;