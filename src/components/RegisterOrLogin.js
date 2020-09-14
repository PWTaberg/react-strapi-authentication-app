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
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === 'Login') {
      login(email, password);
    } else {
      register(email, password);
    }
  };

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
export default RegisterOrLogin;
