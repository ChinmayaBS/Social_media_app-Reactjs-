import React from 'react';
import './closefriend.css';

export default function CloseFriend({users}) {
  return(
    <li className='leftbarFriend'>
        <img src={users.profilePicture} alt='' className='leftbarFriendImg'/>
        <span className='leftbarFriendName'>{users.username}</span>
    </li>
  );
}
