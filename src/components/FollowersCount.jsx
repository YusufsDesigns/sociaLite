import PropTypes from 'prop-types';
import { db } from "../firebase"
import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"



export const FollowersCount = ({profile}) => {
    const [followers, setFollowers] = useState()
    const [followings, setFollowings] = useState()
    
    const followsRef = collection(db, "follows")
    const followsDoc = profile.id && query(followsRef, where("profileId", "==", profile.id))
    const followingsDoc = profile.uid && query(followsRef, where("userId", "==", profile.uid))

    // get Followers
    const getFollowers = async() => {
        const data = await getDocs(followsDoc)
        setFollowers(data.docs.map(doc => ({userId: doc.data().userId, followId: doc.id})));
    }
    
    // get Following
    const getFollowings = async() => {
        const data = await getDocs(followingsDoc)
        setFollowings(data.docs.map(doc => ({userId: doc.data().userId, followId: doc.id})));
    }

    useEffect(() => {
        getFollowers()
        getFollowings()
    }, [followers])
    return (
        <div className="flex items-center gap-5 mt-3">
            <div className="flex items-center gap-2">
                <span>{followings?.length}</span>
                <span>Following</span>
            </div>
            <div className="flex items-center gap-2">
                <span>{followers?.length}</span>
                <span>Followers</span>
            </div>
        </div>
    )
}

FollowersCount.propTypes = {
    profile: PropTypes.object.isRequired
}
