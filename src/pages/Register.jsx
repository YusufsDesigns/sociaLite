import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import { FcAddImage } from "react-icons/fc"
import { auth, db, storage } from "../firebase"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"


export default function Register() {
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            navigate("/login");


            const storageRef = ref(storage, displayName);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                    //Update profile
                    await updateProfile(res.user, {
                    displayName,
                    photoURL: downloadURL,
                    });
                    //create user on firestore
                    const profileRef = collection(db, "profiles");
                    
                    try {
                        await addDoc(profileRef, {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        })
                        
                    } catch (error) {
                        console.log(error);
                    }
                    
                        
        
                    //create empty user chats on firestore
                    await setDoc(doc(db, "userChats", res.user.uid), {});
                    
                } catch (err) {
                    console.log(err);
                }
                });
            });
            
        } catch (error) {
            setError(true)
        }
        
        
    } 

    return (
        <div className='px-5 form-container'>
            <div className="form-wrapper">
                <Link className="inline-block mb-10 text-3xl font-medium text-center roboto">
                    socia<span className="blue">Lite</span>
                </Link>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input className="file" type="file" id="file" />
                    <label htmlFor="file" className="image-add">
                        <FcAddImage />
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign up</button>
                    <span>{error && 'Something went wrong'}</span>
                </form>
                <p>You do have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}
