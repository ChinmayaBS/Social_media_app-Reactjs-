import React,{useEffect,useState} from 'react';
import "./post.css";
import{ MoreVert } from '@material-ui/icons';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { format } from 'timeago.js';

export default function Post({post}) {
  const[user,setUser]=useState({});
  
  useEffect(()=>{
     const fetchUser=async()=>{
       const res=await axios.get(`http://localhost:1234/users/${post.userId}`)
       setUser(res.data)
     };
     fetchUser();
    },[post.userId]);

  const[like,setLike]=useState(post.like);
  const[isLiked,setisLiked]=useState(false);

  const handlelike=()=>{
    setLike(isLiked?like-1:like+1)
    setisLiked(!isLiked);
  }
  return(
    <div className='post'>
        <div className='postWrapper'>
            <div className='postTop'>
                <div className='postTopLeft'>
                <Link to={`/Profile/${user.username}/${user.id}`}><img src={user.profilePicture||"/assets/eprofile/1.png"} alt='' className='postProfileImg'/></Link> 
                    <span className='postUserName'>{user.username}</span>
                    <span className='postTime'>{format((post.date))}</span>
                </div>
                <div className='postTopRight'>
                    <MoreVert/>
                </div>
            </div>
            <div className='postCenter'>
                <span className='postText'>{post?.desc}</span>
                <img src={post.photo} alt='' className='postImg'/>
            </div>
            <div className='postBottom'>
                <div className="postBottomLeft">
                    <img src='/assets/like.png' alt='' className='likeIcon' onClick={handlelike}/>
                    <img src='/assets/heart.png' alt='' className='likeIcon' onClick={handlelike}/>
                    <span className='postLikeComment'>{like} people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className='postCommentText'>{post.comment} Comments</span>
                </div>
            </div>
        </div>
    </div>
  );
}
