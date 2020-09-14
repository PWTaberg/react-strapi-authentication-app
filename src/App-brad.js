import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import RegisterOrLogin from './components/RegisterOrLogin';
import ProfilePage from './components/ProfilePage';

function App() {
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

  /*
  async componentDidMount() {
    try {
      const userRes = await axios({
        method: 'GET',
        url: '/users/me',
      });

      if (userRes.data) {
        this.setState({ user: { user: userRes.data } });
      }

      /*
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.setState({ user });
    }
    */
  /*
    } catch (err) {
      console.log('Error', err);
    }
  }
*/
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

  return (
    <div className='App'>
      {!user && (
        // context ?
        <RegisterOrLogin updateUser={(user) => updateUser(user)} />
      )}
      {user && (
        <div>
          <ProfilePage user={userInfo} />
          <button className='logout-button' onClick={logout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
