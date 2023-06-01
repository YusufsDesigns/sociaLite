import { db } from '../firebase'
import { useContext, useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import { Postcontext } from '../context/PostContext'
import { collection, getDocs, query, where } from 'firebase/firestore'
import Post from '../components/Post'
import { ThemeContext } from '../context/Theme'
import { ChannelContext } from '../context/ChannelContext'
import { Link } from 'react-router-dom'
import { BsFillPencilFill } from 'react-icons/bs'
import FloatPost from '../components/FloatPost'

export default function Home(){
    const [postCard, setPostCard] = useState(false)
    // Context
    const context = useContext(Postcontext)
    const theme = useContext(ThemeContext)
    const channels = useContext(ChannelContext)

    // Post Collection
    const postsRef = collection(db, "posts")
    const specificPostsRef = query(postsRef, where("channelId", "==", ''))

    // Get posts on load
    const getPosts = async () => {
        const data = await getDocs(specificPostsRef)
        context.setPostsList(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    }
    
    // Channel Collection
    const channelRef = collection(db, "channels")

    // Get channels on load
    const getChannels = async () => {
        const data = await getDocs(channelRef)
        channels.setChannel(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    }

    // Display channels on load
    useEffect(() => {
        getPosts()
        getChannels()
    }, [])

    return (
            <div className="relative flex w-full">
                <div className='w-2/3 h-screen overflow-y-scroll home'>
                    <div className={`sticky top-0 left-0 p-2 text-2xl font-semibold bg-${theme.theme} card-top`}>
                        <div className='mobile-remove'>Home</div>
                        <div className="hidden text-3xl font-medium text-center roboto mobile">
                            socia<span className="blue">Lite</span>
                        </div>
                    </div>
                    <div className="card">
                        <Post channelId='' />
                    </div>
                    {context.postsList?.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
                <div className='w-1/3 h-screen p-5 overflow-y-scroll channels'>
                    <h1 className='mb-5 text-3xl font-bold'>Trending Channels</h1>
                    <div className="flex flex-col gap-5">
                        {channels.channel?.map(channel => (
                            <Link to={`/search/${channel.title}`} key={channel.title} className="flex flex-col">
                                <span className="text-xs text-gray-500">{channel.category}</span>
                                <span className="text-xl font-semibold">{channel.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
                <button onClick={() => {setPostCard(true)}} className={`hidden h-14 w-14 absolute right-5 bottom-28 items-center justify-center rounded-full self-center gap-3 text-2xl cursor-pointer link bg-${theme.color} float-post-btn`}><BsFillPencilFill /></button>
                {postCard && <FloatPost setPostCard={setPostCard} />}
            </div>
    )
}
