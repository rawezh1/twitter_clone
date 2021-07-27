import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import './account-header.css';
import {findUid} from '../helpers/helper-funcs'
function AccountHeader(props) {
    const [user, updateUser] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      const uid = await findUid('One');
      await firebase
        .database()
        .ref('users/' + uid + '/tweets/')
        .once('value', (snapshot) => {
          updateUser(snapshot.val());
        });
    };
    initialize();
  }, [props.name]);

  const makeHeader = (info) => {
    return <div className='account-header'>
    <img className='banner' alt='banner-img' src={info.banner}></img>
    <div className='profile'>
      <div className='img-follow-cont'>
        <img className='profile-pic' alt='profile-pic' src={info.pic}></img>
        <button className='follow-btn'>follow</button>
      </div>
      <div className='name-id-cont'>
        <span className='name-h'>{info.name}</span>
        <span className='id-h'>{info.id}</span>
      </div>
      <div className='bio-links-cont'>
        <p className='bio-p'>{info.bio}</p>
        <div className='basic-info'>
          <span>Joined {info.joinedDate}</span>
        </div>
        <div className='followers-cont'>
          <a className='following-a' href='http'>
            {info.following} Following
          </a>
          <a className='followers-a' href='http'>
            {info.following} Followers
          </a>
        </div>
      </div>
      <nav className='feed-select'>
        <div className='tweets'>
          <a href='http'>Tweets</a>
        </div>
        <div className='tweets-replies'>
          <a href='http'>Tweets &#38; Replies</a>
        </div>
        <div className='media'>
          <a href='http'>Media</a>
        </div>

        <div className='likes'>
          <a href='http'>Likes</a>
        </div>
      </nav>
    </div>
  </div>
  };
  const render = () => {
    if (user) {
      return makeHeader(user);
    } else {
      return <h1>Loading...</h1>;
    }
  };
  
    return render();
  }
export default AccountHeader;
