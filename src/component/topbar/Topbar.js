import React,{useState,useEffect} from 'react';
import "./topbar.css";
import {Search,Person,Chat,Notifications} from '@material-ui/icons';
import {Link} from 'react-router-dom'
import axios from 'axios';

export default function Topbar() {
    const[user,setUser]=useState([]);
    useEffect(()=>{
        const fetchUser=async()=>{
        const res=await axios.get("http://localhost:1234/users");
        setUser(res.data[0])
        };
        fetchUser();
    },[]);
  return (
    <div className="topbarContainer">
        <div className='topbarLeft'>
            <Link to="/" style={{textDecoration:"none"}}>
                <span className="logo">SocialSnap</span>
            </Link>
        </div>
        <div className='topbarCenter'>
            <div className="searchBar">
                <Search className='searchIcon'/>
                <input type="text" placeholder='Search for friend, post or video' className='seachInput'/>
            </div>
        </div>
        <div className='topbarRight'>
            <div className="topbarLinks">
                <span className="topbarLink">Home Page</span>
                <span className="topbarLink">Timeline</span>
            </div>
            <div className="topbarIcons">
                <div className='topbarIconItem'>
                    <Person/>
                    <span className='topbarIconBadge'>1</span>
                </div>
                <div className='topbarIconItem'>
                    <Chat/>
                    <span className='topbarIconBadge'>2</span>
                </div>
                <div className='topbarIconItem'>
                    <Notifications/>
                    <span className='topbarIconBadge'>1</span>
                </div>
            </div>
            <Link to={`/Profile/${user.username}/${user.id}`}><img src={user.profilePicture||"/assets/eprofile/1.png"} alt='' className='topbarImg'/></Link>
        </div>
    </div>
  )
}
