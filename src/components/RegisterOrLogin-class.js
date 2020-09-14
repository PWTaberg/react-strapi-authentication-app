import React from 'react';
import axios from 'axios';
import { handleChange } from '../utils/inputs';

class RegisterOrLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      mode: 'Login',
    };

    this.handleChange = handleChange.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, mode } = this.state;

    const data = {
      identifier: email,
      email,
      password,
      username: email,
    };

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
  };

  render() {
    const { email, password, mode } = this.state;
    return (
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
    );
  }
}

const styles = {
  loginSignupLink: {
    cursor: 'pointer',
    color: '#3498db',
    padding: '10px',
    textAlign: 'center',
  },
};

export default RegisterOrLogin;
