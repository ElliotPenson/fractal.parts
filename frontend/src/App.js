import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
              <header className="App-header">
                <p>This is fractal.parts.</p>
                 <Link to="/create">
                   <button type="button">
                     Create
                   </button>
                 </Link>
                <Link to="/browse">
                   <button type="button">
                     Browse
                   </button>
                 </Link>
              </header>
            </div>
        );
    }
}

export default App;
