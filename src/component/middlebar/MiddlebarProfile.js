import React, { useEffect, useState } from 'react';
import Share from '../share/Share';
import "./middlebar.css";
import Post from '../post/Post';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function MiddleProfile() {
  const[userPost,updateUserPost]=useState([]);
  const uid=useParams().uid;
  const userid=localStorage.getItem("userid");
  
  useEffect(()=>{
    const getUserPost=async()=>{
      const res=await axios.get(`http://localhost:1234/posts/${userid}`)
      updateUserPost(res.data)
    }
  getUserPost();
  },[userid]);
  return(
    <div className='middlebar'>
      <div className='middleWrapper'>
        {uid==userid && <Share/>}
        <Post post={userPost}/>
      </div>
    </div>
  );
}

