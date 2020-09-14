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
        localStorage.setItem('user', JSON.stringify(userCreationRes.data));
        this.props.updateUser(userCreationRes.data);
      }
    } catch (err) {
      console.log('Error ', err);
    }
  };

  render() {
    const { email, password, mode } = this.state;
    return (
      <div className='RegisterOrLogin'>
        <h2>{mode}</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div>
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
            className='signup-link'
            onClick={() => this.setState({ mode: 'Signup' })}
          >
            Want to Login instead ?
          </p>
        )}
        {mode === 'Signup' && (
          <p
            className='signup-link'
            onClick={() => this.setState({ mode: 'Login' })}
          >
            Want to Signup instead ?
          </p>
        )}
      </div>
    );
  }
}

export default RegisterOrLogin;
