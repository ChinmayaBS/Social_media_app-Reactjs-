import React from 'react';
import Topbar from "../../component/topbar/Topbar";
import Leftbar from '../../component/leftbar/Leftbar';
import Middle from '../../component/middlebar/Middlebar';
import Rightbar from '../../component/rightbar/Rightbar';
import "./home.css";

export default function Home() {
  return(
    <>
        <Topbar/>
        <div className='homeContainer'>
          <Leftbar/>
          <Middle/>
          <Rightbar/>
        </div>
    </>
  )
}
