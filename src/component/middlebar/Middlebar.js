import React, { useEffect, useState } from 'react';
import Share from '../share/Share';
import "./middlebar.css";
import Post from '../post/Post';
import axios from 'axios';

export default function Middle() {
  const[userPost,updateUserPost]=useState([]);
  
  useEffect(()=>{
    const getUserPost=async()=>{
      const res=await axios.get("http://localhost:1234/posts")
      updateUserPost(res.data.reverse())
    }
  getUserPost();
  },[]);
  return(
    <div className='middlebar'>
      <div className='middleWrapper'>
        <Share/>
        {
          userPost.map((p)=>{
            return(
              <Post key={p.id} post={p}/>
            )
          })
        }
      </div>
    </div>
  );
}

