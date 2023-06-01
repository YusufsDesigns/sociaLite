import { Link, useLoaderData, useParams } from "react-router-dom"
import Post from "./Post"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"
import { useContext, useEffect } from "react"
import { Postcontext } from "../context/PostContext"
import PostCard from "./PostCard"
import { ThemeContext } from "../context/Theme"
import { ChannelContext } from '../context/ChannelContext'


export const ChannelDetails = () => {
    // Context
    const context = useContext(Postcontext)
    const theme = useContext(ThemeContext)
    const channels = useContext(ChannelContext)

    const { id } = useParams()
    const data = useLoaderData()

    const getPosts = async () => {
        context.setPostsList(data.map(doc => ({...doc.data(), id: doc.id})));
    }

    // Channel Collection
    const channelRef = collection(db, "channels")

    // Get channels on load
    const getChannels = async () => {
        const data = await getDocs(channelRef)
        channels.setChannel(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    }

    useEffect(() => {
        getPosts()
        getChannels()
    }, [id])
    
    return (
        <div className="flex w-full">
            <div className='w-2/3 h-screen overflow-y-scroll home'>
                <h1 className={`sticky top-0 left-0 p-5 text-2xl font-semibold bg-${theme.theme}`}>{id}</h1>
                <div className="card">
                    <Post channelId={id} />
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
        </div>
    )
}

export const ChannelDetailsLoader = async ({ params }) => {
    const { id } = params

    // Post Collection
    const postsRef = collection(db, "posts")
    const channelRef = query(postsRef, where("channelId", "==", id))
    const data = await getDocs(channelRef)
    return data.docs
}
