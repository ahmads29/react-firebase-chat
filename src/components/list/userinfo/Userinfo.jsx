import React from 'react'
import "./userInfo.css";
import { useUserStore } from '../../../lib/userStore';


const Userinfo = () => {


  const{currentUser } = useUserStore();

  return (
    <div className='userInfo'>
        <div className="user">
            <img src={currentUser.avatar || "./avatar.png"} alt="" />
            <h2>{currentUser.username}</h2>
        </div>
        <div className="icons">
            <img src="./more.png" />
            <img src="./video.png" />
            <img src="./edit.png"  />
        </div>
    </div>
  )
}

export default Userinfo