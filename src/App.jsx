import { useEffect, useState } from "react"
import Chat from "./components/chat/Chat"
import Detail from "./components/detail/Detail"
import List from "./components/list/List"
import Login from "./components/login/Login"
import Notification from "./components/notification/Notification"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore"
import { useChatStore } from "./lib/chatStore"

// Responsive helper
const isMobile = () => window.innerWidth <= 600;

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();
  const [showDetail, setShowDetail] = useState(false); // for mobile detail toggle

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
    })
    return () => {
      unSub();
    }
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>

  // Responsive rendering
  const mobile = typeof window !== 'undefined' && isMobile();

  return (
    <div className='container'>
      {currentUser ? (
        <>
          {/* Desktop: show all, Mobile: show only one at a time */}
          {/* List: show on desktop, or on mobile if no chat selected */}
          <div className={mobile ? (chatId ? 'hide-mobile' : '') : ''} style={{flex: 1}}>
            <List />
          </div>
          {/* Chat: show on desktop if chatId, or on mobile if chatId selected */}
          {chatId && (
            <div className={mobile ? (chatId ? '' : 'hide-mobile') : ''} style={{flex: 2, position: 'relative'}}>
              <Chat onShowDetail={() => setShowDetail(true)} />
              {/* Show Detail as overlay/modal on mobile */}
              {mobile && showDetail && (
                <div className="detail-modal">
                  <button className="close-detail-btn" onClick={() => setShowDetail(false)}>&#10005;</button>
                  <Detail />
                </div>
              )}
            </div>
          )}
          {/* Desktop: show Detail as usual */}
          {chatId && !mobile && (
            <div style={{flex: 1}}>
              <Detail />
            </div>
          )}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  )
}

export default App