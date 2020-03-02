import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './config/routes';
import AuthProvider from './providers/AuthProviders';

function App() {

  return (
    <div className="app">
      <AuthProvider>
        <Router>
          <Switch>
            {routes.map((route, index) => (
              <RouteWithSubRouter key={index} {...route} />
            ))}
          </Switch>
        </Router>             
      </AuthProvider>
    </div>
  );
}

function RouteWithSubRouter (route) {
  return (
    <Route 
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes} {...props} />}
    />
  )
}

export default App;
