import React from 'react';
import SearchView from '../SearchView/SearchView';
import { HashRouter as Router, Route, Link} from 'react-router-dom';

function App(props) {
  return (
    <div>
      <h1>Giphy Search!</h1>
      <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Search</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
      </nav>
        <Route exact path="/">
          <SearchView />
        </Route>
        {/* <Route exact path="/favorites">
          <FavoriteView />
        </Route> */}
      </Router>
    </div>
  );
}

export default App;
