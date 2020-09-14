import React from 'react';
import axios from 'axios';

import { handleChange } from '../utils/inputs';
import { API_URL } from '../utils/urls';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: 'The Bio',
      oneLiner: "I'll be back",
    };

    this.handleChange = handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.user && this.props.user.user) {
      const { bio, favourite_one_liner } = this.props.user.user;

      this.setState({ bio, oneLiner: favourite_one_liner });
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault();

    const { bio, oneLiner } = this.state;

    const data = {
      bio,
      favourite_one_liner: oneLiner,
    };

    try {
      const userId = this.props.user.user.id;
      //const jwtToken = this.props.user.jwt;

      const updateUserRes = await axios({
        method: 'PUT',
        url: `/users/${userId}`,
        data,
        /*
        url: `${API_URL}/users/${userId}`,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        */
      });
    } catch (err) {
      console.log('Error ', err);
    }
  };

  render() {
    const { user } = this.props;
    const { bio, oneLiner } = this.state;
    return (
      <div className='Profile Page container'>
        Profile Page
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='bio'>Bio</label>
            <input
              type='text'
              name='bio'
              id='bio'
              value={bio}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='oneLiner'>One Liner</label>
            <input
              type='text'
              name='oneLiner'
              id='oneLiner'
              value={oneLiner}
              onChange={this.handleChange}
            />
          </div>
          <button type='submit'>Update your profile</button>
        </form>
      </div>
    );
  }
}

export default ProfilePage;
