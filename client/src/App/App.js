// Import React dependencies
import React from 'react';
import { Switch, Route } from "react-router-dom";

// Import CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import NavBar from './Components/NavBar/NavBar';
import Questions from './Components/Questions/Questions';
import Tests from './Components/Tests/Tests';
import Issues from './Components/Issues/Issues';

class App extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>
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
                        <Route exact path="/about">
                            <div className='jumbotron'>
                                <h1 >About Placeholder</h1>
                            </div>
                        </Route>
                    </Switch>
                </div>
            </div> 
        );
    }
}

export default App;
