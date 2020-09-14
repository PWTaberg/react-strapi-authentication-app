import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
//import PrivateRoute from './components/routing/PrivateRoute';
import axios from 'axios';
import './App.css';
import AuthState from './contexts/AuthState';
import RegisterOrLogin from './components/RegisterOrLogin';
import ProfilePage from './components/ProfilePage';

const App = () => {
  return (
    <AuthState>
      <Router>
        <div className='App'>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </Router>
    </AuthState>
  );
};

export default App;
