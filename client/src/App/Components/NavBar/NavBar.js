import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import VortexLogo from './assets/tornado.png';

class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            navbarCollapse: true
        };
    }

    toggleNavBarCollapse = () => {
        this.setState({ navbarCollapse: !this.state.navbarCollapse });
    }

    
    collapseNavBar = () => {
        this.setState({ navbarCollapse: true });
    }

    render() {
        const collapse = (this.state.navbarCollapse) ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const welcomeMessage = (this.props.userFirstName !== '') ? 
            <span className="navbar-text " style={{ color: 'white'}}>{`Hello, ${this.props.userFirstName}!`}</span> : null;

        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <Link to="/home" className="navbar-brand" onClick={this.collapseNavBar}>
                    <img src={VortexLogo} width="30" height="30" className="d-inline-block align-top pr-1" alt=""/>
                    Test Vortex
                </Link>
                <button className="navbar-toggler" type="button" aria-controls="testVortexNavBar" aria-expanded="false" aria-label="Toggle navigation"
                    onClick={this.toggleNavBarCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${collapse}`} id="testVortexNavBar">
                    <div className="navbar-nav mr-auto">
                        <NavLink to="/tests" className="nav-item nav-link" onClick={this.collapseNavBar}>Tests</NavLink>     
                        <NavLink to="/questions" className="nav-item nav-link" onClick={this.collapseNavBar}>Questions</NavLink>     
                        <NavLink to="/issues" className="nav-item nav-link" onClick={this.collapseNavBar}>Issues</NavLink>
                    </div>
                    <hr/>
                    {welcomeMessage}
                    <div className="navbar-nav ml-3">
                        <NavLink to="/logout" className="navber-nav nav-link" onClick={() => this.props.logout()}><u>Logout</u></NavLink>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;