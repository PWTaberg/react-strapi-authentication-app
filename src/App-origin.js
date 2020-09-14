import React from 'react';
import axios from 'axios';
import './App.css';

import RegisterOrLogin from './components/RegisterOrLogin';
import ProfilePage from './components/ProfilePage';

class App extends React.Component {
  state = {
    user: null,
  };

  async componentDidMount() {
    const userRes = await axios({
      method: 'GET',
      url: '/users/me',
    });

    if (userRes.data) {
      console.log('App.componentDidMount userRes.data', userRes.data);
      this.setState({ user: { user: userRes.data } });
    }

    /*
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.setState({ user });
    }
    */
  }

  logout = async () => {
    await axios({
      method: 'GET',
      url: '/users/logout',
    });
    //localStorage.removeItem('user');
    this.setState({ user: null });
  };

  render() {
    const { user } = this.state;

    return (
      <div className='App'>
        {!user && (
          // context ?
          <RegisterOrLogin updateUser={(user) => this.setState({ user })} />
        )}
        {user && (
          <div>
            <ProfilePage user={user} />
            <button onClick={this.logout}>Log Out</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
