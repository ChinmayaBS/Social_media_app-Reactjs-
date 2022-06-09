import React from 'react';
import './online.css';

export default function Online({users}) {
  return (
    <li className='rightbarFriend'>
        <div className='rightbarProfileImgContainer'>
        <img src={users.profilePicture} alt='' className='rightbarprofileImg'/>
        <span className='rightbarOnline'></span>
        </div>
        <span className='rightbarUserName'>{users.username}</span>
    </li>
  );
}
