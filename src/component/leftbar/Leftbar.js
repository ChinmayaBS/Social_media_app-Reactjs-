import React,{useEffect,useState} from 'react';
import "./leftbar.css";
import { RssFeed,Chat,HelpOutline,Event,School,WorkOutline,BookmarkBorder,Group,Videocam} from '@material-ui/icons';
import axios from 'axios';
import CloseFriend from '../closefriends/CloseFriend';

export default function Leftbar() {

  const[user,updateUser]=useState([]);
    const getUser=()=>{
      axios.get("http://localhost:1234/users")
      .then(response=>{
        updateUser(response.data)
      })
  }
  useEffect(()=>{
    getUser();
  },[true]);

  return (
    <div className='leftbar'>
        <div className="leftbarWrapper">
          <ul className="leftbarlist">
            <li className="leftbarListItem">
              <RssFeed className='leftbarIcon'/>
              <span className='leftbarListItemText'> Add</span>
            </li>
            <li className="leftbarListItem">
              <Chat className='leftbarIcon'/>
              <span className='leftbarListItemText'> Chats</span>
            </li>
            <li className="leftbarListItem">
              <Videocam className='leftbarIcon'/>
              <span className='leftbarListItemText'> Videos</span>
            </li>
            <li className="leftbarListItem">
              <Group className='leftbarIcon'/>
              <span className='leftbarListItemText'> Groups</span>
            </li>
            <li className="leftbarListItem">
              <BookmarkBorder className='leftbarIcon'/>
              <span className='leftbarListItemText'> Bookmarks</span>
            </li>
            <li className="leftbarListItem">
              <HelpOutline className='leftbarIcon'/>
              <span className='leftbarListItemText'> Questions</span>
            </li>
            <li className="leftbarListItem">
              <WorkOutline className='leftbarIcon'/>
              <span className='leftbarListItemText'> Jobs</span>
            </li>
            <li className="leftbarListItem">
              <Event className='leftbarIcon'/>
              <span className='leftbarListItemText'> Events</span>
            </li>
            <li className="leftbarListItem">
              <School className='leftbarIcon'/>
              <span className='leftbarListItemText'> Courses</span>
            </li>
            <button className='leftbarBtn'>Show more</button>
            <hr className='leftbarhr'/>
            <ul className='leftbarFriendList'>
              {
              user.map((u)=>{
                return(
                  <CloseFriend key={u.id} users={u}/>
                )
              })
              }
            </ul>
          </ul>
        </div>
    </div>
  );
}
