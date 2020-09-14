import React, { useState, useContext } from 'react';
import axios from 'axios';
import { handleChange } from '../utils/inputs';
import AuthContext from '../contexts/authContext';

const RegisterOrLogin = () => {
  const authContext = useContext(AuthContext);
  const { login, register } = authContext;

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    mode: 'Login',
  });

  const { email, password } = userInfo;

  const [mode, setMode] = useState('Login');

  const handleChange = (e) => {
    // const { name, value } = e.target;
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*
    const data = {
      identifier: email,
      email,
      password,
      username: email,
    };
    */

    if (mode === 'Login') {
      login(email, password);
    } else {
      console.log('call register');
      register(email, password);
    }

    /*
    try {
      let url = '';
      if (mode === 'Login') {
        url = '/api/auth/local';

        // url = 'http://localhost:1337/auth/local';
      }
      if (mode === 'Signup') {
        url = '/api/auth/local/register';

        //url = 'http://localhost:1337/auth/local/register';
      }
      const userCreationRes = await axios({
        method: 'POST',
        url,
        data,
      });

      if (
        this.props.updateUser &&
        typeof this.props.updateUser === 'function'
      ) {
        console.log('userCreationData ', userCreationRes.data);
        localStorage.setItem('user', JSON.stringify(userCreationRes.data));
        // update state in App.js
        this.props.updateUser(userCreationRes.data);
      }
    } catch (err) {
      console.log('Error ', err);
    }
    */
  };

  // const { email, password, mode } = this.state;
  return (
    <div className='RegisterOrLogin, container'>
      <h2>{mode}</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>{mode}</button>
      </form>
      {mode === 'Login' && (
        <p styles={styles.loginSignupLink} onClick={() => setMode('Signup')}>
          Want to Login instead ?
        </p>
      )}
      {mode === 'Signup' && (
        <p styles={styles.loginSignupLink} onClick={() => setMode('Login')}>
          Want to Signup instead ?
        </p>
      )}
    </div>
  );
};

const styles = {
  loginSignupLink: {
    cursor: 'pointer',
    color: '#3498db',
    padding: '10px',
    textAlign: 'center',
  },
};

/*
      <div className='RegisterOrLogin, container'>
        <h2>{mode}</h2>
        <form className='form' onSubmit={this.handleSubmit}>
          <div className='form-control'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <button type='submit'>{mode}</button>
        </form>
        {mode === 'Login' && (
          <p
            styles={styles.loginSignupLink}
            onClick={() => this.setState({ mode: 'Signup' })}
          >
            Want to Login instead ?
          </p>
        )}
        {mode === 'Signup' && (
          <p
            styles={styles.loginSignupLink}
            onClick={() => this.setState({ mode: 'Login' })}
          >
            Want to Signup instead ?
          </p>
        )}
      </div>
   

*/

export default RegisterOrLogin;
