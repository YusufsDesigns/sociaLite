import { useState, useContext, useRef } from "react";
import { AiOutlineArrowLeft } from "react-icons/all"
import { doc, updateDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import { db } from "../firebase";
import { ThemeContext } from "../context/Theme"
import { AuthContext } from "../context/AuthContext";

export default function ProfileEditForm({ setModal, profile, setProfile }) {
    const {currentUser} = useContext(AuthContext)
    // Context
    const theme = useContext(ThemeContext)
    

    const [formData, setFormData] = useState({
        bio: profile[0].bio,
        location: profile[0].location,
        website: profile[0].website
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        }));
    };
    

    const docRef = doc(db, "profiles", profile[0]?.id)

    const updateProfile = async (e) => {
        try {
            e.preventDefault();
            const newDoc = await updateDoc(docRef, {
            ...formData,
            userId: currentUser.uid,
            });
            setProfile([{displayName: profile[0].displayName, bio: formData.bio, location: formData.location, website: formData.website, userId: currentUser.uid, id: newDoc?.id}])
            hideModal();
        } catch (error) {
            console.log(error);
        }
        
    };

    const hideModal = () => {
        setModal(false);
    };

    const bioRef = useRef(null);
    const locationRef = useRef(null);
    const websiteRef = useRef(null);


    const handleBio = () => {
        bioRef.current.focus();
    };

    const handleLocation = () => {
        locationRef.current.focus();
    };

    const handleWebsite = () => {
        websiteRef.current.focus();
    };

    return (
    <div className="px-2 module">
        <form onSubmit={updateProfile}>
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-5">
                    <AiOutlineArrowLeft onClick={hideModal} className={`text-xl ${theme.color} cursor-pointer`} />
                    <span>Edit Profile</span>
                </div>
                <input
                    type="submit"
                    value="Save"
                    className={`px-5 py-2 text-white cursor-pointer bg-${theme.color} rounded-3xl self-center`}
                />
            </div>
            <div className="form">
                <div onClick={handleBio}>
                    <span className="text-sm">Bio</span>
                    <textarea
                        type="text"
                        value={formData.bio}
                        onChange={handleChange}
                        name="bio"
                        ref={bioRef}
                    />
                </div>
                <div onClick={handleLocation}>
                    <span className="text-sm">Location</span>
                    <input
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        name="location"
                        ref={locationRef}
                    />
                </div>
                <div onClick={handleWebsite}>
                    <span className="text-sm">Website</span>
                    <input
                        type="text"
                        value={formData.website}
                        onChange={handleChange}
                        name="website"
                        ref={websiteRef}
                    />
                </div>
            </div>
        </form>
    </div>
    );
}

ProfileEditForm.propTypes = {
setModal: PropTypes.func.isRequired,
};

ProfileEditForm.propTypes = {
profile: PropTypes.array.isRequired,
};

ProfileEditForm.propTypes = {
setProfile: PropTypes.func.isRequired,
};