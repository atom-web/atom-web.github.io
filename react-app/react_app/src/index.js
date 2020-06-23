import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './css/bootstrap-grid.css'
import './css/index.css'; 
import Home from './Home';
import About from './About';
import Users from './Users';
import Player from './components/Player'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

function App() {
    return (
        <Router>
            
            <div className="link">
                <div className="container">
                    <div id="play">
                        {/* <Player /> */}
                    </div>
                    <nav className="link-nav">
                        <Link to="/">Радио</Link>
                        <Link to="/about">Тест</Link>
                        <Link to="/users">Тест</Link>
                    </nav>
                </div>
            </div>
            
            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/users">
                    <Users />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
      </Router>
    );
  }
  
serviceWorker.unregister();
