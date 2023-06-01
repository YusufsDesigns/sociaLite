import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from "react"
import { db } from "../firebase"
import { AuthContext } from "../context/AuthContext";


export const FollowBtn = ({ profile }) => {
    const {currentUser} = useContext(AuthContext)
    const [follows, setFollows] = useState(null)
    const followsRef = collection(db, "follows")
    const followsDoc = profile.id && query(followsRef, where("profileId", "==", profile.id))
    // get Follows
    const getFollows = async() => {
        const data = await getDocs(followsDoc)
        setFollows(data.docs.map(doc => ({userId: doc.data().userId, followId: doc.id})));
    }

    // Follow profile
    const followProfile = async () => {
        try {
            const newDoc = await addDoc(followsRef, {
                userId: currentUser.uid,
                profileId: profile.id
            })
            if(currentUser){
                setFollows(prev => prev ? [...prev, {userId: currentUser.uid, followId: newDoc.id}] : [{userId: currentUser.uid, followId: newDoc.id}])
            }}
        catch(error){
            console.log(error);
        }
    }

    // Unfollow Profile
    const unFollowProfile = async () => {
        try {
            const unFollowDoc = query(
                followsRef, 
                where("profileId", "==", profile.id), 
                where("userId", "==", currentUser.uid)
            )

            const unFollowData = await getDocs(unFollowDoc)
            const unfollow = doc(db, "follows", unFollowData.docs[0].id)

            await deleteDoc(unfollow)
            if(currentUser){
                setFollows(prev => prev && prev.filter(follow => follow.followId !== unFollowData.docs[0].id))}
            }
        catch(error){
            console.log(error.message);
        }
    }
    // Check if a user has followed a profile already
    const hasUserFollowed = follows?.find(follow => follow.userId === currentUser.uid)

    useEffect(() => {
        getFollows()
    }, [])
    
    return (
        <button className='px-5 py-2 border-2 border-gray-300 rounded-full' onClick={hasUserFollowed ? unFollowProfile : followProfile}>
            {hasUserFollowed ?
                'Following'
                :
                'Follow'}
        </button>
    )
}

FollowBtn.propTypes = {
    profile: PropTypes.object.isRequired
}
