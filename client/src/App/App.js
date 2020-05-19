// Import React dependencies
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Axios from 'axios';

// Import CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import NavBar from './Components/NavBar/NavBar';
import Questions from './Components/Questions/Questions';
import Tests from './Components/Tests/Tests';
import Issues from './Components/Issues/Issues';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            permissionLevel: ''
        };

    }

    componentDidMount() {
        Axios.get('/user/client-info')
            .then((response) => this.setState(response.data));
    }

    logout = () =>  {
        localStorage.clear();
        window.location.href = '/logout';
    }

    render() {
        return (
            <div>
                <NavBar userFirstName={this.state.firstName} logout={() => this.logout()}/>
                <div className='body'>
                    <Switch>
                        <Route exact path="/home">
                            <div className='jumbotron'>
                                <h1 >Test Vortex</h1>
                                <hr/>
                                <h4>A collaborative web application used to generate standardized tests!</h4>
                            </div>
                        </Route>
                        <Route path="/tests">
                            <Tests/>
                        </Route>
                        <Route path="/questions">
                            <Questions/>
                        </Route>
                        <Route path="/issues">
                            <Issues/>
                        </Route>
                        <Route exact path="/*">
                            <Redirect to="/home"/>
                        </Route>
                    </Switch>
                </div>
            </div> 
        );
    }
}

export default App;
