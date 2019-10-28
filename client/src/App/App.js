// Import React dependencies
import React from 'react';
import { Route, Link } from "react-router-dom";

// Import CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import NewQuestionInputForm from './NewQuestion/InputForm';
import NavBar from './NavBar';

class App extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className='body'>
                    <div className='jumbotron'>
                        <h1 >Test Vortex</h1>
                        <hr/>
                        <h4>A collaborative web application used to generate standardized tests!</h4>
                    </div>
                    <NewQuestionInputForm/>
                </div>
            </div> 
        );
    }
}

export default App;
