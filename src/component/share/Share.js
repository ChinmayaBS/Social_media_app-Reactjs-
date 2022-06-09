import React,{useState,useEffect} from 'react';
import "./share.css"
import{PermMedia,Label,Room,EmojiEmotions,Cancel} from '@material-ui/icons';
import axios from 'axios';
import { useRef } from 'react';

export default function Share() {
    const[user,setUser]=useState([]);
    let userid=localStorage.getItem("userid");
    useEffect(()=>{
        const fetchUser=async()=>{
        const res=await axios.get(`http://localhost:1234/users/${userid}`);
        setUser(res.data)
        };
        fetchUser();
    },[userid]);
    
    const desc=useRef();
    const[file,setFile]=useState(null);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const date=new Date().toGMTString();
      
        var data=new FormData();
        const fileName=file.name;//5.png
        data.append("file",file);
        data.append("name",fileName);
            
        console.log(file);

        const newPost={
            userId:userid,
            desc:desc.current.value,
            photo:"assets/post/"+fileName,
            date:date,
            like:"",
            comment:""
        }
        try{    
            await axios.post("http://localhost:1234/posts",newPost);
            window.location.reload();
        }catch(err){
            //error
        }
    }
    
  return(
    <div className='share'>
        <div className="shareWrapper">
            <div className='shareTop'>
                <img src={user.profilePicture||"/assets/eprofile/1.png"} alt='' className='shareProfileImg'/>
                <input placeholder={`Whats in your mind ${user.username}?`} className='shareInput' ref={desc}/>
            </div>
            <hr className='shareHr'/>
            {file && (
                <div className='shareImgContainer'>
                    <img className='shareImg' src={URL.createObjectURL(file)} alt=''/>
                    <Cancel className='shareCancel'onClick={()=>setFile(null)}/>
                </div>
            )}
            <form className='shareBottom' onSubmit={handleSubmit}>
                <div className="shareOptions">
                    <label htmlFor='file' className="shareoption">
                        <PermMedia htmlColor="green" className='shareIcon'/>
                        <span className='shareOptionText'>Photo or Video</span>
                        <input style={{display:"none"}} type="file" id="file" accept='.png,.jpeg,jpg' onChange={(e)=>setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareoption">
                        <Label htmlColor="blue" className='shareIcon'/>
                        <span className='shareOptionText'>Tag</span>
                    </div>
                    <div className="shareoption">
                        <Room htmlColor="red" className='shareIcon'/>
                        <span className='shareOptionText'>Location</span>
                    </div>
                    <div className="shareoption">
                        <EmojiEmotions htmlColor="orange" className='shareIcon'/>
                        <span className='shareOptionText'>Feelings</span>
                    </div>
                </div>
                <button className='shareBtn' type='submit'>Share</button>
            </form>
        </div>
    </div>
  );
}
