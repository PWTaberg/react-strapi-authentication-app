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
  /*
  const [userInfo, setUserInfo] = useState({ userInfo: { user: null } });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { user } = userInfo;

  useEffect(() => {
    const getUser = async () => {
      console.log('Get user');

      try {
        const userRes = await axios({
          method: 'GET',
          url: '/users/me',
        });

        if (userRes.data) {
          console.log('getUser ', userRes.data);
          console.log('User 1', userInfo);

          //setUserInfo({ userInfo: { user: 'Nisse' } });
          setUserInfo({ userInfo: { user: userRes.data } });

          if (!isLoggedIn) {
            console.log('Set logged in === true');
            setIsLoggedIn(true);
          }

          console.log('User 2', userInfo);
        }
      } catch (err) {
        console.log('Error', err);
      }
    };

    getUser();
  }, []);

  const logout = async () => {
    try {
      await axios({
        method: 'GET',
        url: '/users/logout',
      });
      localStorage.removeItem('user');
      setUserInfo({ userInfo: { user: null } });
    } catch (err) {
      console.log('Error', err);
    }
  };

  const updateUser = (user) => {
    console.log('updateUser user', user);
    setUserInfo({ userInfo: { user } });
    console.log('updated user ', userInfo);
  };

  // const { user } = state;

  if (isLoggedIn) {
    console.log('user is logged in');
  }

  if (isLoggedIn === false) {
    console.log('user is not logged in');
  }
*/
  return (
    <AuthState>
      <Router>
        <div className='App'>
          <h1>App</h1>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </Router>
    </AuthState>
  );
};

export default App;
