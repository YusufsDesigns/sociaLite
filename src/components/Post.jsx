import PropTypes from 'prop-types';
import { db, storage } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'
import { useContext, useRef, useState } from 'react'
import { Postcontext } from '../context/PostContext'
import { ThemeContext } from '../context/Theme'
import { BsImage } from "react-icons/all"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { AuthContext } from '../context/AuthContext';

export default function Post({ channelId, setPostCard }) {
    // User Auth
    const {currentUser} = useContext(AuthContext)

    // Context
    const theme = useContext(ThemeContext)
    const context = useContext(Postcontext)

    // State
    const [imageList, setImageList] = useState([])
    const [count, setCount] = useState(0)
    const [text, setText] = useState('')

    // Ref
    const inputRef = useRef(null)

    // Collection
    const postRef = collection(db, 'posts')

    // Function to open files
    const handleClick = () => {
        inputRef.current.click()
    }

    // Function to display image before posting
    const handleChange = event => {
        const fileUpload = event.target.files[0];
        const imageRef = ref(storage, `images${count.toString()}/${fileUpload.name + v4()}`)
        uploadBytes(imageRef, fileUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList(prev => [...prev, url])
            })
        })
        const userImageRef = ref(storage, `images${currentUser.uid}/${fileUpload.name + v4()}`)
        uploadBytes(userImageRef, fileUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                context.setUserImageList(prev => [url, ...prev])
            })
        })
    };

    // Create a new post
    const createPosts = async (e) => {
            e.preventDefault()
            const newDoc = await addDoc(postRef, {
                post: text,
                username: currentUser?.displayName,
                img: currentUser.photoURL,
                userId: currentUser.uid,
                postImg: imageList,
                channelId: channelId || ''
            })
            
            context.setPostsList(prev => prev ? [{post: text, username: currentUser?.displayName, img: currentUser?.photoURL, userId: currentUser.uid, postImg: imageList, id: newDoc.id}, ...prev] : [{post: text, username: currentUser?.displayName, img: currentUser?.photoURL, userId: currentUser.uid, postImg: imageList, id: newDoc.id}])
            setCount(count + 1) 
            setImageList([])
            setText('')
            setPostCard(false)
    }

    // Image style
    let style = imageList.length === 1 ? "w-full" : "grid grid-cols-2 gap-5"


    return (
        <div className="card-body">
            <div className='body'>
                <img className='w-12 h-12 rounded-full' src={currentUser.photoURL} alt="" />
                <div className='w-full'>
                    <form onSubmit={createPosts}>
                        <textarea className='text-area' value={text} onChange={(e) => {setText(e.target.value)}} placeholder="What's happening?!"/>
                        <div className={style}>
                            {[...new Set(imageList)].map(url => {
                                    return(
                                        <div key={url} className='h-64 overflow-hidden'>
                                            <img className="rounded-lg" src={url} />
                                        </div>
                                    )
                            })}
                        </div>
                        <div className='flex items-center justify-between w-full p-5'>
                            <div onClick={handleClick} className='cursor-pointer'>
                                <BsImage className={`${theme.color} text-xl`} />
                                <input type="file" className="hidden" onChange={handleChange} ref={inputRef} />
                            </div>
                            <input type='submit' value='Post' className={`px-5 py-2 text-white cursor-pointer bg-${theme.color} rounded-3xl`} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

Post.propTypes = {
    channelId: PropTypes.string.isRequired
}

Post.propTypes = {
    setPostCard: PropTypes.func.isRequired
}
