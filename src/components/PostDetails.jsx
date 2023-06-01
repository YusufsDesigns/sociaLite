import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useLoaderData } from "react-router-dom"
import ImageGallery from "./ImageGallery"
import Comment from "./Comment"


export default function PostDetails() {
    // Get post details
    const post = useLoaderData()
    return (
        <div className="w-full h-screen overflow-y-scroll">
            <div className='flex items-start w-full gap-5 post-card' to={`status/${post.id}`}>
                <img className="w-12 h-12 rounded-full" src={post.img} alt="" />
                <div className="w-full">
                    <span className='text-sm italic font-semibold text-black'>@{post.username}</span>
                    <p className='mb-5 text-gray-700'>{post.post}</p>
                    <div className="grid grid-cols-2 gap-2">
                        <ImageGallery imgUrls={post.postImg} />
                    </div>
                </div>
            </div>
            <Comment post={post} />
        </div>
    )
}


export const PostDetailsLoader = async ({ params }) => {
    const { id } = params

    const getPost = doc(db, "posts", id)
    const postSnap = await getDoc(getPost)
    return {...postSnap.data(), id}
}
