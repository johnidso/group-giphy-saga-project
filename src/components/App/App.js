import React from 'react';
import SearchView from '../SearchView/SearchView';
import Favorites from '../Favorites/Favorites';
import { HashRouter as Router, Route, Link} from 'react-router-dom';

import './App.css';
import Navigation from '../Navigation/Navigation';

function App(props) {



  return (
    <div>
      <Navigation />
      <Router>
        <Route exact path="/">
          <SearchView />
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
      </Router>
    </div>
  );
}

export default App;
