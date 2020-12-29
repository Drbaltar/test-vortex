/*
*  This module is the main component for the Test Vortex React web application
*  Author: Kyle McCain
*  Date: 12 August 2020
*/

// Import React dependencies
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Import Axios dependencies
import Axios from 'axios';

// Import CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import child components
import NavBar from './Components/NavBar/NavBar';
import Questions from './Components/Questions/Questions';
import Tests from './Components/Tests/Tests';
import Issues from './Components/Issues/Issues';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: null,
            firstName: null,
            lastName: null,
            permissionLevel: null,
            userDataRequested: false,
            errorCode: null
        };

    }

    // Request information on the user currently logged into the session
    async componentDidMount() {
        // Send Axios GET request
        await Axios.get('/api/users/client-info')
            // Update user info if request is successful
            .then((response) => this.setState(response.data))
            // Update error code if Axios request returns an error
            .catch((error) => {
                if (error.response) {
                    // Update error code for response codes outside of 2xx range
                    this.setState({errorCode: error.response.status});
                } else if (error.request) {
                    // Request failed
                    this.setState({errorCode: 408});
                }
            });

        // Update state to reflect user data was requested
        this.setState({ userDataRequested: true });
    }

    // Redirect user to '/logout' server route
    logout = () =>  {
        localStorage.clear();
        window.location.href = '/logout';
    }

    render() {
        if (this.state.userDataRequested && !this.state.errorCode) {
            return (
                <div>
                    <NavBar userFirstName={this.state.firstName} logout={() => this.logout()}/>
                    <div className='body'>
                        <Switch>
                            <Route exact path="/app/home">
                                <div className='jumbotron'>
                                    <h1 >Test Vortex</h1>
                                    <hr/>
                                    <h4>A collaborative web application used to generate standardized tests!</h4>
                                </div>
                            </Route>
                            <Route path="/app/tests">
                                <Tests/>
                            </Route>
                            <Route path="/app/questions">
                                <Questions/>
                            </Route>
                            <Route path="/app/issues">
                                <Issues/>
                            </Route>
                            <Route exact path="/app/*">
                                <Redirect to="/app/home"/>
                            </Route>
                        </Switch>
                    </div>
                </div> 
            );
        } else {
            return (
                <p>{this.state.errorCode || 'Awaiting User Information'}</p>
            );
        }
    }
}