import { useState, useContext, useRef } from "react";
import { AiOutlineArrowLeft } from "react-icons/all"
import { collection, addDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import { db } from "../firebase";
import { ThemeContext } from "../context/Theme";
import { ChannelContext } from "../context/ChannelContext";
import { AuthContext } from "../context/AuthContext";

export default function ChannelCard({ setModal }) {
    const {currentUser} = useContext(AuthContext)
    // Context
    const theme = useContext(ThemeContext);
    const context = useContext(ChannelContext)


    const channelRef = collection(db, "channels");

    const [formData, setFormData] = useState({
        category: '',
        title: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        }));
    };

    const createChannel = async (e) => {
        e.preventDefault();
        console.log(formData);
        const newDoc = await addDoc(channelRef, {
            ...formData,
            userId: currentUser.uid
        })
        context.setChannel(prev => prev ? [{category: formData.category, title: formData.title, id: newDoc.id}, ...prev] : [{category: formData.category, title: formData.title, id: newDoc.id}])
        setModal(false)
    }

    const hideModal = () => {
        setModal(false);
    };

    const categoryRef = useRef(null);
    const titleRef = useRef(null);

    const handleCategory = () => {
        categoryRef.current.focus();
    };

    const handleTitle = () => {
        titleRef.current.focus();
    }

    return (
    <div className="px-5 module">
        <form onSubmit={createChannel}>
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-5">
                    <AiOutlineArrowLeft onClick={hideModal} className={`text-xl ${theme.color} cursor-pointer`} />
                    <span>Create Channel</span>
                </div>
                <input
                    type="submit"
                    value="Create"
                    className={`px-5 py-2 text-white cursor-pointer bg-${theme.color} rounded-3xl self-center`}
                />
            </div>
            <div className="form">
                <div onClick={handleCategory}>
                    <span className="text-sm">Category</span>
                    <input
                        type="text"
                        value={formData.category}
                        onChange={handleChange}
                        name="category"
                        ref={categoryRef}
                    />
                </div>
                <div onClick={handleTitle}>
                    <span className="text-sm">Title</span>
                    <textarea
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        name="title"
                        ref={titleRef}
                    />
                </div>
            </div>
        </form>
    </div>
    );
}

ChannelCard.propTypes = {
setModal: PropTypes.func.isRequired,
};
