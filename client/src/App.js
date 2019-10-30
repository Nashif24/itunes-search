import React from 'react';

import './App.css';
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom"//this imports the router dom to be used to route the components on the page

//this imports all the components to be used.
import Home from './components/Home'
import Music from './components/Music'
import Books from './components/Books'
import Favorite from './components/Favorite'

//this a class component, that is uses the router dom to get all of the components
//and puts all the components in the nav bar of the page 
class App extends React.Component {
  render(){
    return (
      <Router >
        <Home/>
        <div>
          <nav>
            <ul>
              <li>
                <Link to={'/'}>Home</Link>
              </li>
              <li>
                <Link to={'/Music'}>Search Music</Link>
              </li>
              <li>
                <Link to={'/Books'}>Search Books</Link>
              </li>
              <li>
                <Link to={'/Favorite'}>Favorites</Link>
              </li>
            </ul>
          </nav>
          <Switch>
          <Route path='/Home' component={Home}/>
            <Route path='/Music' component={Music}/>
            <Route path='/Books' component={Books}/>
            <Route path='/Favorite' component={Favorite}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
