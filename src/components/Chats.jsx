import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"
import { ChatContext } from "../context/ChatContext"
import PropTypes from 'prop-types';


export default function Chats({ setChatOpened }) {
    const [chats, setChats] = useState([])

    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    const handleSelect = (user) => {
        dispatch({type: "CHANGE_USER", payload: user})
        setChatOpened(true)
    }

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())
            })

            return () => {
                unsub()
            }
        }

        currentUser.uid && getChats()

    }, [currentUser.uid])
    return (
        <div className="chats">
            {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map(chat => (
                <div className="user-chat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                    <img src={chat[1].userInfo.photoURL} alt="" />
                    <div className="user-chat-info">
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{chat[1].lastMessage?.text}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

Chats.propTypes = {
    setChatOpened: PropTypes.func.isRequired
}

