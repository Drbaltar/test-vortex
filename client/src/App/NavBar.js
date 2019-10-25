import React from 'react';

const NavBar = (props) => {
    return(
        <nav className="navbar navbar-dark bg-dark fixed-top">
            <a className="navbar-brand" href="home">
                <img src="./assets/tornado.png" width="30" height="30" class="d-inline-block align-top" alt=""/>
                Test Vortex
            </a>
        </nav>
    );
};

export default NavBar;