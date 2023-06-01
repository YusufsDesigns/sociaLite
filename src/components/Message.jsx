import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { ThemeContext } from '../context/Theme';

export default function Message({ message }) {

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)
    const theme = useContext(ThemeContext)

    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"})
    }, [message])

    return (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
            <div className="message-info">
                <img src={
                    message.senderId === currentUser.uid
                        ? currentUser.photoURL
                        : data.user.photoURL
                } alt="" />
                <span>Just now</span>
            </div>
            <div className='message-content'>
                <p className={`${message.senderId === currentUser.uid ? `bg-${theme.color}` : 'bg-gray-500 text-white'}`}>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    )
}

Message.propTypes = {
    message: PropTypes.object.isRequired
}


