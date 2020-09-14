import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/authContext';

const ProfilePage = (props) => {
  const authContext = useContext(AuthContext);
  const { user, loadUser } = authContext;

  const [profile, setProfile] = useState({
    bio: '',
    oneLiner: '',
  });

  const { bio, oneLiner } = profile;

  useEffect(() => {
    const { bio, favourite_one_liner } = user;
    setProfile({ bio, oneLiner: favourite_one_liner });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      bio,
      favourite_one_liner: oneLiner,
    };

    try {
      const userId = user.id;
      const profileRes = await axios({
        method: 'PUT',
        url: `/users/${userId}`,
        data,
      });
      loadUser();
    } catch (err) {
      console.log('Something went wrong');
      console.log('Error ', err);
    }
  };

  return (
    <div className='Profile Page container'>
      <h2>Profile Page</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='bio'>Bio</label>
          <input
            type='text'
            name='bio'
            id='bio'
            value={bio}
            onChange={handleChange}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='oneLiner'>One Liner</label>
          <input
            type='text'
            name='oneLiner'
            id='oneLiner'
            value={oneLiner}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Update your profile</button>
      </form>
    </div>
  );
};
export default ProfilePage;
