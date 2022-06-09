import React,{useRef} from 'react';
import './login.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const email=useRef();
    const password=useRef();
    const navigate = useNavigate();

    const handleClick=(e)=>{
        e.preventDefault();
        try {
            axios.get("http://localhost:1234/register")
		    .then(response=>{
			for(var i=0;i<response.data.length;i++){
				var RegisteredUser=response.data[i];
				if(email.current.value==RegisteredUser.email && password.current.value==RegisteredUser.password){
                    const userCredentials={
                        "email":email.current.value,
                        "password":password.current.value
                    }
                    axios.post("http://localhost:1234/login",userCredentials);
                    localStorage.setItem("userid",RegisteredUser.id);
                    navigate("/");
                    window.location.reload();
					break;
				}
            }
		})
        } catch (error) {
            console.log(error);
        }
}
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
                        <input type='email' placeholder='Email' className='loginInput' ref={email} required />
                        <input type='password' placeholder='Password' className='loginInput' ref={password} required minLength="7"/>
                        <button className='loginButton'>Log In</button>
                        <span className='loginForgot'>Forgot Password?</span>
                        <button className='loginRegisterButton'>Create a New Account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
