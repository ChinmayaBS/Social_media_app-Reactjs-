import React,{useState,useEffect} from 'react';
import "./rightbar.css"
import Online from '../online/Online';
import axios from 'axios';
import { Add, Remove } from '@material-ui/icons';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router';

export default function Rightbar({userInfo}) {
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

  const uid=useParams().uid

  const handleFollowClick=async()=>{
      const ufriend= await axios.get(`http://localhost:1234/users/${uid}`)
      axios.post("http://localhost:1234/friends",ufriend.data)
  };

  // const handleUnFollowClick=(id)=>{
  //   let url="http://localhost:1234/friends/"+id;
  //   axios.delete(url)
  //   .then(reponse=>{
  //     handleFollowClick();
  // })
  // }

  const[friends,setFriends]=useState([]);
  useEffect(()=>{
    const getFriends=async()=>{
      try {
        const friendList= await axios.get("http://localhost:1234/friends")
        setFriends(friendList.data);
      } catch (error) {
        //error
      }
    };
    getFriends();
  },[]);

  // // const uid=useParams().uid
  // const [freindFollow,setFollowFreind]=useState([]);

  // const getFriendFollow=async()=>{
  //   try {
  //     const friendList= await axios.get("http://localhost:1234/friends/"+uid)
  //     setFollowFreind(friendList.data); 
  //   } catch (error) {
  //     //error
  //   }
  // };
  // console.log(freindFollow);
  // useEffect(()=>{
  //   getFriendFollow();
  // },[true]);

  const HomeRightBar=()=>{
    return(
      <>
        <div className='birthdayContainer'>
            <img src='/assets/gift.png' alt='' className='birthdayImg'/>
            <span className='birthdayText'>
              <b>Vikyath</b> and<b> 3 other friends</b> have a birthday today
            </span>
          </div>
          <img src='/assets/ad.png' alt='' className='rightbarAd'/>
          <h4 className='rightbarTitle'>Online Friends</h4>
          <ul className='rightbarFriendList'>
              {
              user.map((u)=>{
                return(
                  <Online key={u.id} users={u}/>
                )
              })
              }
          </ul>
      </>
    )
  }

  const ProfileRightBar=()=>{
    return(
      <>  
        {userInfo.id!=1 && (
         <>
            <button className='rightbarFollowButton' onClick={handleFollowClick}>Follow <Add/></button>
            <button className='rightbarUnFollowButton'>UnFollow <Remove/></button>
        </>
      )}
        <h4 className='rightbarTitle'>User Information</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City:</span>
            <span className='rightbarInfoValue'>{userInfo.city}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>From:</span>
            <span className='rightbarInfoValue'>{userInfo.from}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Relationship:</span>
            <span className='rightbarInfoValue'>{userInfo.relationship}</span>
          </div>
        </div>
        {userInfo.id==1 && <h4 className='rightbarTitle'>User Friends</h4>}
       {userInfo.id==1 && <div className='rightbarFollowings'>
          {friends.map((friend)=>(
            <Link to={`/Profile/${friend.username}/${friend.id+1}`} style={{textDecoration:"none"}} key={friend.id}>
            <div className='rightbarFollowing'>
              <img src={friend.profilePicture || "assets/eprofile/1.png"} alt='' className='rightbarFollowingImg'/>
              <span className='rightbarFollowingName'>{friend.username}</span>
            </div>
            </Link>
          ))}
        </div>}
      </>
    )
  }
  return(
    <div className='rightbar'>
        <div className='rightbarWrapper'>
          {userInfo?<ProfileRightBar/>:<HomeRightBar/>}
        </div>
    </div>
  );
}
