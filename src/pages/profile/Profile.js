import React, { useState, useEffect } from "react";
import "./profile.css";
import Topbar from "../../component/topbar/Topbar";
import Leftbar from "../../component/leftbar/Leftbar";
import Rightbar from "../../component/rightbar/Rightbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MoreVert } from "@material-ui/icons";
import { format } from "timeago.js";
import Share from '../../component/share/Share';

export default function Profile() {
  const [user, setUser] = useState([]);
  const [userPost, setuserPost] = useState([]);
  const username = useParams().username;
  const uid = useParams().uid;
  const userid=localStorage.getItem("userid");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:1234/users?username=${username}`
      );
      const res2 = await axios.get(`http://localhost:1234/posts?userId=${uid}`);
      setUser(res.data[0]);
      setuserPost(res2.data.reverse());
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={user.coverPic} alt="" />
              <img
                className="profileUserImg"
                src={user.profilePicture || "assets/eprofile/1.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="ProfileInfoName">{user.username}</h4>
              <span className="ProfileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Rightbar userInfo={user} />
          </div>
          <div className="profileShare">
            {uid==userid && <Share/>}
          </div>
            {userPost.map((p, index) => {
              return (
                <div className="posts">
                  <div className="postWrapper">
                    <div className="postTop">
                      <div className="postTopLeft">
                        <img
                          src={user.profilePicture || "/assets/eprofile/1.png"}
                          alt=""
                          className="postProfileImg"
                        />
                        <span className="postUserName">{user.username}</span>
                        <span className="postTime">{format(p.date)}</span>
                      </div>
                      <div className="postTopRight">
                        <MoreVert />
                      </div>
                    </div>

                    <div className="postCenter">
                      <span className="postText">{p.desc}</span>
                      <img src={p.photo} alt="" className="postImg" />
                    </div>

                    <div className="postBottom">
                      <div className="postBottomLeft">
                        <img
                          src="/assets/like.png"
                          alt=""
                          className="likeIcon"
                        />
                        <img
                          src="/assets/heart.png"
                          alt=""
                          className="likeIcon"
                        />
                        <span className="postLikeComment">
                          {p.like} people like it
                        </span>
                      </div>
                      <div className="postBottomRight">
                        <span className="postCommentText">
                          {p.comment} Comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
