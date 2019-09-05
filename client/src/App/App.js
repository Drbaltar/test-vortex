// Import React dependencies
import React from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Import CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import NewQuestionInputForm from './NewQuestion/InputForm';

class App extends React.Component {
    render() {
        return (
            <div>
                <div className='jumbotron'>
                    <h1 >Test Vortex</h1>
                    <hr/>
                    <h4>A collaborative web application used to generate standardized tests!</h4>
                </div>
                <NewQuestionInputForm/>
            </div> 
        );
    }
}

export default App;
