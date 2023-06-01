import { AiOutlineHeart, AiFillHeart, BiComment } from "react-icons/all"
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/Theme";
import ImageGallery from "./ImageGallery"
import { db } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function PostCard({ post }) {
    // context
    const theme = useContext(ThemeContext)

    // State
    const [likes, setLikes] = useState(null)
    const [comments, setComments] = useState()

    // User data
    const {currentUser} = useContext(AuthContext)

    // Collection
    const likesRef = collection(db, "likes")
    const commentRef = collection(db, "comments")

    // Refrence to likes and comments specific to a post
    const likesDoc = query(likesRef, where("postId", "==", post.id))
    const commentDoc = query(commentRef, where("postId", "==", post.id))

    // get Likes
    const getLikes = async() => {
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map(doc => ({userId: doc.data().userId, likeId: doc.id})));
    }

    // Get comments
    const getComments = async() => {
        const data = await getDocs(commentDoc)
        setComments(data.docs.map(doc => ({...doc.data(), id: doc.id})))
    }

    // Like post
    const likePost = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: currentUser.uid,
                postId: post.id
            })
            if(currentUser){
                setLikes(prev => prev ? [...prev, {userId: currentUser.uid, likeId: newDoc.id}] : [{userId: currentUser.uid, likeId: newDoc.id}])
            }}
        catch(error){
            console.log(error);
        }
    }

    // Unlike post
    const unLikePost = async () => {
        try {
            const unlikeDoc = query(
                likesRef, 
                where("postId", "==", post.id), 
                where("userId", "==", currentUser.uid)
            )

            const unLikeData = await getDocs(unlikeDoc)
            const unlike = doc(db, "likes", unLikeData.docs[0].id)

            await deleteDoc(unlike)
            if(currentUser){
                setLikes(prev => prev && prev.filter(like => like.likeId !== unLikeData.docs[0].id))}
            }
        catch(error){
            console.log(error.message);
        }
    }

    // Image style
    let style = post.postImg.length === 1 ? "w-full" : "grid grid-cols-2 gap-2"

    // Check if a user has liked a post already
    const hasUserLiked = likes?.find(like => like.userId === currentUser.uid)
    // Display the post on load
    useEffect(() => {
        getLikes()
        getComments()
    }, [])
    return (
        <div className='flex items-start gap-5 post-card'>
            <Link to={post.username}><img className="w-12 h-12 rounded-full" src={post.img} alt="" /></Link>
            <div className="w-full">
                <Link to={post.username} className='text-sm italic font-semibold text-black'>@{post.username}</Link>
                <p className='mb-5 text-gray-700'>{post.post}</p>
                <div className={style}>
                    <ImageGallery imgUrls={post.postImg} />
                </div>
                <div className={`flex items-center gap-10 mt-5 ${theme.color}`}>
                    <div className='flex items-center gap-1 text-xl' onClick={hasUserLiked ? unLikePost : likePost}>
                        {hasUserLiked ?
                            <AiFillHeart />
                            :
                            <AiOutlineHeart />}
                        {likes?.length == 0 ? '' : <span className="text-sm">{likes?.length}</span>}
                    </div>
                    <Link to={`/status/${post.id}`} className="flex items-center gap-1 text-xl">
                        <BiComment />
                        {comments?.length == 0 ? '' : <span className="text-sm">{comments?.length}</span>}
                    </Link>
                </div>
            </div>
        </div>
    )
}

PostCard.propTypes = {
    post: PropTypes.object.isRequired
}
