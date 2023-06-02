import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { useContext, useState } from "react"
import { db } from "../firebase"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"
import PropTypes from 'prop-types';

export default function Search({ setChatOpened }) {
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)

    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    const handleSearch = async () => {
        const q = query(
            collection(db, "profiles"),
            where("displayName", "==", username)
        )
        
        try {
            const querySnapshot =  await getDocs(q)
            querySnapshot.forEach(doc => {
                console.log(doc.data());
                setUser(doc.data())
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch()
    }

    const handleSelect = async () => {

        // check wether the group(chats in firestore) exists, if not create a new one
        const combineId = 
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid

        try {
            const res = await getDoc(doc(db, "chats", combineId))
            dispatch({type: "CHANGE_USER", payload: user})
            setChatOpened(true)

            if(!res.exists()){
                await setDoc(doc(db, "chats", combineId), {messages: []})

                // Create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combineId+".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combineId+".date"]: serverTimestamp()
                })

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combineId+".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combineId+".date"]: serverTimestamp()
                })
            }
        } catch (error) {
            setErr(true)
        }

        setUser(null)
        setUsername("")
    }

    return (
        <div className="search">
            <div className="search-form">
                <input type="text" placeholder="Find a user" value={username} onKeyDown={handleKey} onChange={e => setUsername(e.target.value)} />
            </div>
            {err && <span>User not found</span>}
            {user && 
                <div className="user-chat" onClick={() => handleSelect(user)}>
                    <img src={user.photoURL} alt="" />
                    <div className="user-chat-info">
                        <span>{user.displayName}</span>
                    </div>
                </div>
            }
        </div>
    )
}

Search.propTypes = {
    setChatOpened: PropTypes.func.isRequired
}

