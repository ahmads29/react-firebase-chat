import React, { useEffect, useState } from 'react'
import AddUser from './addUser/addUser'
import './chatList.css'
import { useUserStore } from '../../../lib/userStore'
import { doc, onSnapshot, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { useChatStore } from '../../../lib/chatStore';

const ChatList = () => {
  const [addMode, setAddMode] = useState(false)
  const [chats, setChats] = useState([])

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  console.log(chatId)

  useEffect(() => {
    if (!currentUser?.id) return

    const unSub = onSnapshot(doc(db, 'userchats', currentUser.id), async (res) => {
      const items = res.data()?.chats || []

      const promises = items.map(async (item) => {
        const userDocRef = doc(db, 'users', item.receiverId)
        const userDocSnap = await getDoc(userDocRef)
        const user = userDocSnap.exists() ? userDocSnap.data() : null

        return { ...item, user }
      })

      const chatData = await Promise.all(promises)
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
    })

    return () => {
      unSub()
    }
  }, [currentUser?.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map(item => {
        const{user, ...rest} = item;
        return rest;
    });

    const chatIndex = userChats.findIndex(item=>item.chatId === chat.chatId)

    userChats[chatIndex].isSeen = true;
    const userChatsRef = doc(db, "userchats", currentUser.id);
    try{
        await updateDoc(userChatsRef, {
            chats:userChats,
        });
        changeChat(chat.chatId, chat.user)

    }catch(err){
        console.log(err)
    }

  }

  return (
    <div className='chatList'>
      <div className='search'>
        <div className='searchBar'>
          <img src='./search.png' alt='search icon' />
          <input type='text' placeholder='Search...' />
        </div>
        <img
          src={addMode ? './minus.png' : './plus.png'}
          className='add'
          onClick={() => setAddMode((prev) => !prev)}
          alt='add/remove icon'
        />
      </div>

      {chats.map((chat) => (
        <div className='item' key={chat.chatId} onClick={()=>handleSelect(chat)}
            style={{
                backgroundColor: chat.isSeen ? "transparent" : "#5183fe"
            }}
        >
          <img src={chat.user?.avatar || './avatar.png'} alt='User Avatar' />
          <div className='texts'>
            <span>{chat.user?.username || 'Unknown User'}</span>
            <p>{chat.lastMessage || 'No messages yet'}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  )
}

export default ChatList
