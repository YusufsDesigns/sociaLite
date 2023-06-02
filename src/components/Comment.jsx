import { useContext, useEffect, useRef, useState } from "react"
import { db } from "../firebase"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import PropTypes from 'prop-types';
import { ThemeContext } from "../context/Theme";
import CommentCard from "./CommentCard";
import { AuthContext } from "../context/AuthContext";


export default function Comment({ post }) {
        // State
        const [text, setText] = useState('')
        const [comments, setComments] = useState()
        // User data
        const {currentUser} = useContext(AuthContext)
        // Ref
        const textRef = useRef(null)
        // Collection
        const commentRef = collection(db, "comments")
        // Context
        const theme = useContext(ThemeContext)
        
        // Ref to comments of a particular post
        const commentDoc = query(commentRef, where("postId", "==", post.id))

        // Get comments
        const getComments = async() => {
            const data = await getDocs(commentDoc)
            setComments(data.docs.map(doc => ({...doc.data(), id: doc.id})))
        }

        // Create a new comment
        const createComment = async (e) => {
            e.preventDefault()
            const newDoc = await addDoc(commentRef, {
                comment: text,
                username: currentUser.displayName,
                userId: currentUser.uid,
                postId: post.id,
                img: currentUser.photoURL
            })
            setComments(prev => prev ? [{comment: text, username: post.username, userId: currentUser.uid, postId: post.id, img: currentUser.photoURL, id: newDoc.id}, ...prev] : [{comment: text, username: post.username, userId: currentUser.uid, postId: post.id, img: currentUser.photoURL, id: newDoc.id}])
            setText('')
        }

        // Display comments on load
        useEffect(() => {
            getComments()
        }, [])

    return (
        <div>
            <form onSubmit={createComment} className="flex items-center justify-between w-full p-5" >
                <div className="flex items-start w-full">
                    <img className="w-12 h-12 rounded-full" src={currentUser.photoURL} alt="" />
                    <textarea  value={text} onChange={(e) => {setText(e.target.value)}} className="w-full p-5 outline-none text-area" ref={textRef} placeholder="Post your reply!"></textarea>
                </div>
                <input type='submit' value='Post' className={`px-5 py-2 text-white cursor-pointer bg-${theme.color} rounded-3xl`}/>
            </form>
            {comments?.map(comment => (
                <CommentCard key={comment.id} comment={comment} />
            ))}
        </div>
    )
}

Comment.propTypes = {
    post: PropTypes.object.isRequired
}
