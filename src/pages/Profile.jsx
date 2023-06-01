import { SlLocationPin, AiOutlineLink } from "react-icons/all"
import { db } from "../firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import PostCard from "../components/PostCard"
import ProfileEditForm from "../components/ProfileEditForm"
import { ThemeContext } from "../context/Theme"
import { ChannelContext } from "../context/ChannelContext"
import { Link, useLoaderData, useParams } from "react-router-dom"
import { FollowBtn } from "../components/FollowBtn"
import { FollowersCount } from "../components/FollowersCount"
import { AuthContext } from "../context/AuthContext"


export default function Profile() {
    // User Authentication details
    const {currentUser} = useContext(AuthContext)


    // State
    const [modal, setModal] = useState(false)
    const [profilePosts, setProfilePosts] = useState([])
    const [profile, setProfile] = useState([])
    

    // Context
    const theme = useContext(ThemeContext)
    const channels = useContext(ChannelContext)
    
    // Collection
    const postsRef = collection(db, "posts")
    

    // Refrence to profile post and follows specific to a profile
    const profilePostsRef = profile[0]?.uid && query(
        postsRef, where("userId", "==", profile[0]?.uid)
    )

    // Get posts on load
        profile[0]?.uid && 
                getDocs(profilePostsRef)
                    .then(data => {
                        setProfilePosts(data.docs.map(doc => ({...doc.data(), id: doc.id}))); 
                    })

    

    const { id } = useParams()
    const data = useLoaderData()

    // Get posts on load
    const getProfileDetails = async () => {
        setProfile(data.map(doc => ({...doc.data(), id: doc.id})));
    }

    const displayModal = () => {
        setModal(true)
    }


    const followBtn = profile.map((profile) => (
        <FollowBtn key={profile.id} profile={profile} />
    ))

    const followersCount = profile.map((profile) => (
        <FollowersCount key={profile.id} profile={profile} />
    ))

    // Display posts on load
    useEffect(() => {
        // getPosts()
        getProfileDetails()
    }, [id])
    
    return (
        <div className="flex w-full">
            <div className="w-2/3 h-screen overflow-y-scroll home">
                <div className={`sticky top-0 left-0 p-5 bg-${theme.theme}`}>
                    <div className="text-2xl font-bold">{profile[0]?.displayName}</div>
                    <div className='text-gray-500'>{profilePosts?.length} Posts</div>
                </div>
                <div className="profile-details">
                    <div className="p-5">
                        <div className="flex items-center justify-between">
                            <img src={profile[0]?.photoURL || currentUser.photoURL} className='object-cover w-32 h-32 rounded-full' alt="Coming soon" />
                            {profile[0]?.uid == currentUser.uid
                                ?
                                <button className='px-5 py-2 border-2 border-gray-300 rounded-full' onClick={displayModal}>Edit Profile</button>
                                :
                                followBtn
                            }
                        </div>
                        <div className="flex flex-col gap-1 py-5">
                            <span className='text-gray-500'>@{profile[0]?.displayName}</span>
                        </div>
                        <p>{profile[0]?.bio}</p>
                        {<div className="flex items-center gap-5 text-gray-500">
                            <div className="flex items-center gap-2">
                                <SlLocationPin />
                                <span>{profile[0]?.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <AiOutlineLink />
                                <a href={profile[0]?.website} target="blank" className={`${theme.color}`}>{profile[0]?.website}</a>
                            </div>
                        </div>}
                        {followersCount}
                    </div>
                </div>
                {profilePosts?.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
            <div className='sticky bottom-0 w-1/3 p-5 channels'>
                <h1 className='mb-5 text-3xl font-bold'>Popular Channels</h1>
                <div className="flex flex-col gap-5">
                    {channels.channel?.map(channel => (
                        <Link to={`/channels/${channel.title}`} key={channel.title} className="flex flex-col">
                            <span className="text-xs text-gray-500">{channel.category}</span>
                            <span className="text-xl font-semibold">{channel.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
                {modal && <ProfileEditForm setModal={setModal} profile={profile} setProfile={setProfile} />}
        </div>
    )
}

export const ProfileLoader = async ({ params }) => {
    const { id } = params

    const profileRef = collection(db, "profiles")

    const specificProfileRef = query(
        profileRef, where("displayName", "==", id)
    )
    const data = await getDocs(specificProfileRef)

    return data.docs
}
