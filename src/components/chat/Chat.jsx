import React, { useEffect, useState, useRef } from 'react';
import EmojiPicker from "emoji-picker-react";
import "./chat.css";
import { arrayUnion, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from "../../lib/userStore";
import upload from '../../lib/upload';

const Chat = ({ onShowDetail }) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [chat, setChat] = useState(null);
    const [img, setImg] = useState({
        file:null,
        url: "",
    });

    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeChat } = useChatStore();
    const { currentUser } = useUserStore();

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat?.messages]);

    useEffect(() => {
        if (!chatId) return;

        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
            setChat(res.data());
        });

        return () => unSub();
    }, [chatId]);

    const handleEmoji = e => {
        setText(prev => prev + e.emoji);
        setOpen(false);
    };


    const handleImg = (e) =>{
        if(e.target.files[0]){        
    setImg({
            file:e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        })}
    };


    const handleSend = async () => {
        if (text.trim() === "") return;

        let imgUrl = null

        try {

            if(img.file){
                imgUrl = await upload(img.file);
            }


            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createdAt: new Date(),
                    ...(imgUrl ? { img: imgUrl } : {})
                }),
            });

            const userIDs = [currentUser.id, user.id];
            userIDs.forEach(async (id) => {
                const userChatRef = doc(db, "userchats", id);
                const userChatsSnapshot = await getDoc(userChatRef);

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();
                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);

                    if (chatIndex !== -1) {
                        userChatsData.chats[chatIndex].lastMessage = text;
                        userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
                        userChatsData.chats[chatIndex].updatedAt = Date.now();

                        await updateDoc(userChatRef, {
                            chats: userChatsData.chats,
                        });
                    }
                }
            });

            setText(""); // Clear input after send

        } catch (err) {
            console.log(err);
        }
        setImg({
            file:null,
            url:"",
        })

        setText("");
    };

    // Responsive helper
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;

    const handleBack = () => {
      // On mobile, return to chat list by clearing chatId and user
      changeChat(null, null);
    };

    return (
        <div className='chat'>
            <div className="top">
                {isMobile && (
                  <>
                    <button className="back-btn" onClick={handleBack} style={{marginRight: 8}}>
                      &#8592;
                    </button>
                    <button className="open-detail-btn" onClick={onShowDetail} style={{marginRight: 8}}>
                      &#9776;
                    </button>
                  </>
                )}
                <div className="user">
                    <img src={user?.avatar || "./avatar.png"} />
                    <div className="texts">
                        <span>{user?.username || "User"}</span>
                        <p>{user?.email || "No email"}</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="phone" />
                    <img src="./video.png" alt="video" />
                    <img src="./info.png" alt="info" />
                </div>
            </div>

            <div className="center">
                {chat?.messages?.map((message, index) => (
                    <div className={`message ${message.senderId === currentUser.id ? 'own' : ''}`} key={index}>
                        <div className="texts">
                            {message.img && <img src={message.img} alt="msg" />}
                            <p>{message.text}</p>
                            <span>{new Date(message.createdAt?.seconds * 1000).toLocaleTimeString()}</span>
                        </div>
                    </div>
                ))}
                {img.url && (<div className="message own">
                    <div className="texts">
                        <img src={img.url} alt="" />
                    </div>
                </div>)}
                <div ref={endRef}></div>
            </div>

            {/* Hide .bottom on mobile if not in a chat */}
            {(!isMobile || (chatId && user)) && (
              <div className="bottom">
                <div className="icons">
                    <label htmlFor="file">
                        <img src="./img.png" alt="img" />
                    </label>
                    <input type="file" id='file' style={{display:"none"}} onChange={handleImg}/>
                    <img src="./camera.png" alt="camera" />
                    <img src="./mic.png" alt="mic" />
                </div>
                <input
                    type='text'
                    placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "You cannot send a message" : "Type a message..."}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    disabled={isCurrentUserBlocked || isReceiverBlocked}
                />
                <div className="emoji">
                    <img src="./emoji.png" alt="emoji" onClick={() => setOpen(prev => !prev)} />
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button className='sendButton' onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>
              </div>
            )}
        </div>
    );
};

export default Chat;
