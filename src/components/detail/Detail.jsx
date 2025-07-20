import React from 'react'
import "./detail.css";
import { auth, db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import { arrayRemove, arrayUnion, updateDoc, doc } from 'firebase/firestore';


const Detail = () => {

    const {chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock} = useChatStore();
    const {currentUser} = useUserStore();
    const handleBlock = async () =>{
        if(!user) return;

        const userDocRef = doc(db, "users", currentUser.id)

        try{
            await updateDoc(userDocRef,{
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            });
            changeBlock();
        }catch(err){
            console.log(err)
        }
    };

  return (
    <div className='detail'>
        <div className="user">
            <img src={user?.avatar || "./avatar.png"}/>
            <h2>{user?.username}</h2>
            <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="info">
            <div className="option">
                <div className="title">
                    <span>Chat Settings</span>
                    <img src="./arrowUp.png" />
                </div>
            </div>
            <div className="option">
                <div className="title">
                    <span>Privacy & help</span>
                    <img src="./arrowUp.png" />
                </div>
            </div>
            <div className="option">
                <div className="title">
                    <span>Shared Photos</span>
                    <img src="./arrowDown.png" />
                </div>
                <div className="photos">
                    <div className="photoItem">
                        <div className="photoDetail">
                        <img src="https://defenzo.tech/wp-content/uploads/2025/06/devenzo-logo1-scaled.png" alt="" />
                        <span>photo_2024_2.png</span>
                        </div>
                    <img src="./download.png" alt="" className='icon'/>
                    </div>
                </div>
            </div>
            <div className="option">
                <div className="title">
                    <span>Shared Files</span>
                    <img src="./arrowUp.png" />
                </div>
            </div>
            <button onClick={handleBlock}>
            {
                    isCurrentUserBlocked ? "You are blocked!" : isReceiverBlocked ? "User Blocked" : "Block User"
            }
            </button>
            <button onClick={() => auth.signOut()} className='logout'>Logout</button>
        </div>
    </div>
  )
}

export default Detail