import React, { useContext, useEffect } from 'react';
import AuthContext from '../../contexts/authContext';
import RegisterOrLogin from '../../components/RegisterOrLogin';
import ProfilePage from '../../components/ProfilePage';

const Home = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, user, logout, loading } = authContext;

  // run after the page is loaded

  useEffect(() => {
    if (isAuthenticated === true) {
    }

    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  console.log('Home isAuthenticated, user', isAuthenticated, user);

  return (
    <div className='Home container'>
      <div className='App'>
        {isAuthenticated !== true ? (
          <>
            <RegisterOrLogin />
          </>
        ) : (
          <>
            <ProfilePage />
            <button class='logout-button' onClick={logout}>
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
