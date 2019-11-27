import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import HomePage from './HomePage';
import AddMessagePage from './AddMessagePage';
import EditMessagePage from './EditMessagePage';
import LoginPage from './LoginPage';

function App() {
  return (
    <div className="jumbotron">
      <div className="container">
        <div className="col-sm-8 col-sm-offset-2">
          <Router>
            <div>
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute exact path="/add" component={AddMessagePage} />
              <PrivateRoute
                path="/edit/:messageId"
                component={EditMessagePage}
              />
              <Route path="/login" component={LoginPage} />
            </div>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
