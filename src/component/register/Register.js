import axios from 'axios';
import React,{useRef} from 'react';
import './register.css';
import {useNavigate} from 'react-router-dom';

export default function Register() {
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const cpassword=useRef();
    const navigate = useNavigate();

    const handleClick=(e)=>{
        e.preventDefault();
        if(cpassword.current.value !== password.current.value){
            cpassword.current.setCustomValidity("Invalid Password");
        }else{
            const user={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value,
                cpassword:cpassword.current.value
            }
            console.log(user)
            try{
                axios.post("http://localhost:1234/register",user);
                localStorage.setItem("useremail",user.email);
                navigate("/Login");
            }catch(err){
                console.log(err);
            }
        }
    };

  return (
        <div className='login'>
            <div className="loginWrapper">
                <div className='loginLeft'>
                    <h3 className='loginLogo'>SocialSnap</h3>
                    <span className='loginDesc'>
                        Connect with friends and the world around you on SocialSnap.
                    </span>
                </div>
                <div className='loginRight'>
                    <form className='loginBox' onSubmit={handleClick}>
                        <input type='text' placeholder='User name' className='loginInput' ref={username} required/>
                        <input type='email' placeholder='Email' className='loginInput' ref={email} required/>
                        <input type='password' placeholder='Password' className='loginInput' ref={password} required minLength="7"/>
                        <input type='password' placeholder='Confirm Password' className='loginInput' ref={cpassword} required/>
                        <button className='loginButton' type='submit'>Sign Up</button>
                        <button className='loginRegisterButton'>Login to Account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
