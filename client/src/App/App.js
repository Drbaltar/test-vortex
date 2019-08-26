// Import React dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Import CSS files
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container" className="jumbotron">
          <h1 >Test Vortex</h1>
          <hr/>
          <h4>A collaborative web application used to generate standardized tests!</h4>
        </div>
      </Router>     
    );
  }
}

export default App;
