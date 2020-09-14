import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  SET_LOADING,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    console.log('AuthState.loadUser');

    setLoading();

    try {
      const userRes = await axios({
        method: 'GET',
        url: '/users/me',
      });

      if (userRes.data) {
        dispatch({
          type: USER_LOADED,
          payload: userRes.data,
        });
      } else {
        dispatch({
          type: AUTH_ERROR,
        });
      }
    } catch (err) {
      console.log('Auth failure');
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (email, password) => {
    setLoading();

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const data = {
      identifier: email,
      email,
      password,
      username: email,
    };

    try {
      const userCreationRes = await axios({
        method: 'POST',
        url: '/api/auth/local/register',
        data,
      });

      dispatch({
        type: REGISTER_SUCCESS,
        payload: userCreationRes.data.user,
      });
    } catch (err) {
      dispatch({ type: REGISTER_FAIL });
    }
  };

  // Login User
  const login = async (email, password) => {
    setLoading();

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const data = {
      identifier: email,
      email,
      password,
      username: email,
    };

    try {
      const userCreationRes = await axios({
        method: 'POST',
        url: '/api/auth/local',
        data,
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: userCreationRes.data.user,
      });
    } catch (err) {
      console.log('Login failed', err);
      dispatch({ type: LOGIN_FAIL });
    }
  };

  // Logout User
  const logout = async () => {
    try {
      await axios({
        method: 'GET',
        url: '/users/logout',
      });

      dispatch({ type: LOGOUT });
    } catch (err) {
      console.log('Error', err);
    }
  };
  // Clear Error
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        setLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
